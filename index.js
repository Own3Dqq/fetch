let count = 10;
const btnReload = document.querySelector('.card__reload');
const cardList = document.querySelector('.card__list');
const loader = document.querySelector('.loader');
const sidebarInfo = document.querySelector('.sidebar');
const templateProductInfo = `
        <div class="info__item">
        <button class="info__item__close">X</button>
            <div class="info__item__category">
                <span>Clothes</span>
            </div>
            <div class="info__item__title">
                <p>Монітор 31.5" Samsung LU32J590UQIXCI -- 4K UHD VA</p>
            </div>
            <div class="info__item__image">
                <img
                    src="https://plus.unsplash.com/premium_photo-1664701475272-953393050754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                    alt=""
                />
            </div>

            <div class="info__item__commment">
                <div>
                    <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                    <span>10 відгуків</span>
                </div>

                <div class="info__item__id">Код товара: 2220002</div>
            </div>

            <div class="info__item__price">
                <span class="info__item__price-current"> 890 ₴</span>
            </div>
            <div class="info__item__characteristics">
                <button>About</button>
                <button>Characteristics</button>
                <button>Reviews</button>
            </div>
            <div class="info__item__about">
                <h4>Мультимедійні можливості</h4>
                <br />
                <ul>
                    <li>
                        FreeSync: технологія Freesync дає нагоду
                        позбутися від розривів зображення під час
                        динамічної зміни кадрів
                    </li>
                    <li>
                        Режим Game Mode: ігровий режим Game Mode миттєво
                        оптимізує настройки кольору та контрастності
                        залежно від гри для максимального задоволення
                        від ігрового процесу
                    </li>
                </ul>
            </div>
            <div class="info__item__buttons">
                <button class="button__add">Add to basket</button>
            </div>
        </div>
`;

function createProductTemplate(key, value) {
    const template = `
    <div class="card__item" id="card__${key}">
        <div class="card__image">
            <img src="${value.images[0]}" alt="card photo" />
        </div>
        <div class="card__info">
            <div class="card__comment">
                <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                <span><a href="#">${value.id} відгуків</a></span>
            </div>
            <div class="card__title">
                <p>
                    ${value.title}
                </p>
            </div>
            <div class="card__price">
                <span class="card__price__current-price"> ${value.price} ₴</span
                >
            </div>
            <div class="card__button">
                <button class="card__button__add">
                    Add to basket
                </button>
            </div>
         </div>
    </div>`;

    return template;
}

async function getProductData(value = 10) {
    let data = null;

    try {
        let responce = await fetch(
            `https://api.escuelajs.co/api/v1/products?offset=${value}&limit=10`
        );
        data = await responce.json();

        if (responce.status != 200) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}

function renderProductCard(product) {
    if (product) {
        for (let [key, value] of product.entries()) {
            cardList.insertAdjacentHTML(
                'beforeend',
                createProductTemplate(key, value)
            );
        }

        Array.from(cardList.children).forEach((element) => {
            element.addEventListener('click', (event) => {
                if (sidebarInfo.classList.contains('hidden')) {
                    sidebarInfo.classList.remove('hidden');
                } else {
                    sidebarInfo.classList.add('hidden');
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.display = 'none';
    }, 2000);

    let product = await getProductData();
    renderProductCard(product);
});

btnReload.addEventListener('click', async (event) => {
    event.preventDefault();

    count += 10;

    let product = await getProductData(count);
    renderProductCard(product);
});
