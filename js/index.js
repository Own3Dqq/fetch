let count = 0;
const LIMIT_PAGE_ITEM = 10;

const cardList = document.querySelector('.card__list');
const btnReload = document.querySelector('.card__reload');
const sidebar = document.querySelector('.sidebar');
const sidebarCloseBtn = document.querySelector('.btn__close');
const sidebarInfo = document.querySelector('.sidebar__info');

function createProductTemplate(key, value) {
    const template = `
        <div class="card__item" data-id="${value.id}"">
            <div class="card__image">
                <img src="${value.images ? value.images[0] : '/img/no-image.png'}" alt="card photo" />
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
                    <button class="card__button__add button__add">
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
                <div class="info__item__category">
                    <span>${product.category.name}</span>
                </div>
                <div class="info__item__title">
                    <h3>${product.title}</h3>
                </div>
                <div class="info__item__image">
    
                    <img
                        src="${product.images ? product.images[0] : './img/no-image.png'}"
                        alt=""
                    />
                </div>
    
                <div class="info__item__commment">
                    <div>
                        <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                        <span>${product.id} ratings</span>
                    </div>
    
                    <div class="info__item__id">Code: 2220${product.id}</div>
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

async function getProductData(offset, limit) {
    let data = null;

    try {
        let responce = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
        data = await responce.json();

        if (responce.status != 200) {
            throw new Error(data.message);
        }

        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getCurrentProduct(id) {
    let selectedProduct = null;

    try {
        let responce = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);

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
            cardList.insertAdjacentHTML('beforeend', createProductTemplate(key, value));
        }
        showModalWindow();
    }
}

function showModalWindow() {
    const listElements = Array.from(cardList.children);

    listElements.forEach((element) => {
        element.addEventListener('click', async (event) => {
            const { currentTarget } = event;
            const currentProduct = await getCurrentProduct(currentTarget.dataset.id);

            function showModal() {
                sidebarInfo.innerHTML = '';
                sidebarInfo.insertAdjacentHTML('beforeend', createProductInformation(currentProduct));
                if (sidebar.classList.contains('hide')) {
                    sidebar.classList.remove('hide');
                }
            }

            showModal();
        });
    });
}

function closeModalWindow() {
    sidebar.classList.add('hide');
    sidebar.classList.remove('show');
}

sidebarCloseBtn.addEventListener('click', (event) => {
    if (!sidebar.classList.contains('hide')) {
        sidebar.classList.add('hide');
        sidebarInfo.innerHTML = '';
    }
});

btnReload.addEventListener('click', async (event) => {
    event.preventDefault();

    count += 10;

    let product = await getProductData(count, LIMIT_PAGE_ITEM);
    console.log(product);

    renderProductCard(product);
});

document.addEventListener('click', (event) => {
    event.target !== sidebar ? closeModalWindow() : undefined;
});

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('hide');
    let product = await getProductData(0, LIMIT_PAGE_ITEM);
    renderProductCard(product);
});
