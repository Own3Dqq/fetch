let count = 10;
const btnReload = document.querySelector('.card__reload');
const cardList = document.querySelector('.card__list');
const loader = document.querySelector('.loader');
const sidebarInfo = document.querySelector('.sidebar');

function createProductTemplate(key, value) {
    const template = `
    <div class="card__item" data-id="${value.id}"">
        <div class="card__image">
            <img src="${value.images[0]}" alt="card photo" />
        </div>
        <div class="card__info">
            <div class="card__comment">
                <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                <span><a href="#">${value.id} reviews</a></span>
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

function createProductInformation(product) {
    const templateProductInfo = `
        <div class="info__item" data-id = ${product.id}>
        <!-- <button class="info__item__close">X</button> -->
            <div class="info__item__category">
                <span>${product.category.name}</span>
            </div>
            <div class="info__item__title">
                <h3>${product.title}</h3>
            </div>
            <div class="info__item__image">

                <img
                    src="${product.images[0]}"
                    alt=""
                />
            </div>

            <div class="info__item__commment">
                <div>
                    <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                    <span>${product.id} ratings</span>
                </div>

                <div class="info__item__id">Код товара: 2220${product.id}</div>
            </div>

            <div class="info__item__price">
                <span class="info__item__price-current">${product.price} ₴</span>
            </div>
            <div class="info__item__characteristics">
                <button>About</button>
                <button>Characteristics</button>
                <button>Reviews</button>
            </div>
            <div class="info__item__about">
                <p>
                    ${product.description}
                </p>
            </div>
            <div class="info__item__buttons">
                <button class="button__add">Add to basket</button>
            </div>
        </div>
    `;

    return templateProductInfo;
}

async function getProductData(value = 0) {
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

async function getCurrentProduct(id) {
    let selectedProduct = null;

    try {
        let responce = await fetch(
            `https://api.escuelajs.co/api/v1/products/${id}`
        );

        if (responce.status != 200) {
            throw new Error(selectedProduct.message);
        }

        selectedProduct = await responce.json();
        return selectedProduct;
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
            element.addEventListener('click', async (event) => {
                const { currentTarget } = event;

                const currentProduct = await getCurrentProduct(
                    currentTarget.dataset.id
                );

                if (sidebarInfo.classList.contains('hidden')) {
                    sidebarInfo.innerHTML = '';
                    sidebarInfo.insertAdjacentHTML(
                        'beforeend',
                        createProductInformation(currentProduct)
                    );
                    sidebarInfo.classList.remove('hidden');
                } else if (
                    sidebarInfo.firstElementChild.dataset.id ===
                    currentTarget.dataset.id
                ) {
                    console.log(this);
                    sidebarInfo.classList.add('hidden');
                } else {
                    sidebarInfo.innerHTML = '';
                    sidebarInfo.insertAdjacentHTML(
                        'beforeend',
                        createProductInformation(currentProduct)
                    );
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
