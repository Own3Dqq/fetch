let count = 10;
const btnReload = document.querySelector('.card__reload');
const cardList = document.querySelector('.card__list');
const loader = document.querySelector('.loader');

function cardTemplate(key, value) {
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

function createCardItem({ id, title, images, price }) {
    const card = document.createElement('div');
    card.classList.add('card__item');
    card.id = `card__${id}`;
    card.innerHTML = `
        <div class="card__item"'>
            <div class="card__image">
                <img src="${images[0]}" alt="card photo" />
            </div>
            <div class="card__info">
                <div class="card__comment">
                    <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                    <span><a href="#">${id} відгуків</a></span>
                </div>
                <div class="card__title">
                    <p>
                        ${title}
                    </p>
                </div>
                <div class="card__price">
                    <span class="card__price__current-price"> ${price} ₴</span
                    >
                </div>
                <div class="card__button">
                    <button class="card__button__add">
                        Add to basket
                    </button>
                </div>
            </div>
        </div>`;

    return card;
}

function showCardItem(product) {
    if (product) {
        for (let [key, value] of product.entries()) {
            cardList.insertAdjacentHTML('beforeend', cardTemplate(key, value));
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.display = 'none';
    }, 2000);

    let product = await getProductData();

    showCardItem(product);
});

btnReload.addEventListener('click', async (event) => {
    event.preventDefault();

    count += 10;

    let product = await getProductData(count);
    showCardItem(product);
});
