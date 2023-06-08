let count = 0;
const API_URL = 'https://api.escuelajs.co/api/v1/products';
const LIMIT_PAGE_ITEM = 10;

function init() {
    const cardList = document.querySelector('.card__list');
    const btnReload = document.querySelector('.card__reload');
    const sidebar = document.querySelector('.sidebar');
    const sidebarCloseBtn = document.querySelector('.btn__close');
    const sidebarInfo = document.querySelector('.sidebar__info');

    const showLoader = () => {
        const loader = document.querySelector('.loader');

        if (loader.classList.contains('hide')) {
            loader.classList.remove('hide');
            loader.classList.add('show');
        }
    };

    const hideLoader = () => {
        const loader = document.querySelector('.loader');

        if (loader.classList.contains('show')) {
            loader.classList.remove('show');
            loader.classList.add('hide');
        }
    };

    const templateProductCard = (product) => {
        const template = `
        <div class="card__item" data-id="${product.id}"">
            <div class="card__image">
                <img src='${product.images[0]}' />
            </div>
            <div class="card__info">
                <div class="card__comment">
                    <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                    <span><a href="#">${product.id} reviews</a></span>
                </div>
                <div class="card__title">
                    <p>
                        ${product.title}
                    </p>
                </div>
                <div class="card__price">
                    <span class="card__price__current-price"> ${product.price} ₴</span
                    >
                </div>
             </div>
        </div>`;

        return template;
    };

    const templateProductInformation = (product) => {
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
    };

    const getProductsData = async (offset = 0, limit) => {
        let data = null;

        try {
            let responce = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`);
            data = await responce.json();

            if (responce.status !== 200) {
                throw new Error(data.message);
            }

            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const getTargetProductById = async (id) => {
        let selectedProduct = null;

        try {
            let responce = await fetch(`${API_URL}/${id}`);

            if (responce.status !== 200) {
                throw new Error(selectedProduct.message);
            }

            selectedProduct = await responce.json();
            return selectedProduct;
        } catch (error) {
            console.log(error);
        }
    };

    const closeProductInformation = () => {
        if (!sidebar.classList.contains('hide')) {
            sidebar.classList.add('hide');
            sidebarInfo.innerHTML = '';
        }
    };

    const openProductInformation = () => {
        if (sidebar.classList.contains('hide')) {
            sidebar.classList.remove('hide');
        }
    };

    const renderProductCard = (product) => {
        for (let [key, value] of product.entries()) {
            cardList.insertAdjacentHTML('beforeend', createProductCard(value));
        }
        const items = [...cardList.children];

        items.forEach((element) => {
            element.addEventListener('click', async (event) => {
                const { currentTarget } = event;

                const currentProduct = await getTargetProductById(currentTarget.dataset.id);

                renderProductInformation(currentProduct);
            });
        });
    };

    const renderProductInformation = (product) => {
        sidebarInfo.innerHTML = '';
        sidebarInfo.insertAdjacentHTML('beforeend', createProductInformation(product));
        openProductInformation();
    };

    const createProductCard = (product) => {
        return templateProductCard(product);
    };

    const createProductInformation = (product) => {
        return templateProductInformation(product);
    };

    sidebarCloseBtn.addEventListener('click', closeProductInformation);

    btnReload.addEventListener('click', async (event) => {
        event.preventDefault();

        showLoader();
        let product = await getProductsData((count += 10), LIMIT_PAGE_ITEM);

        renderProductCard(product);
        hideLoader();
    });

    document.addEventListener('click', (event) => {
        const { target } = event;
        !sidebar.contains(target) ? closeProductInformation() : undefined;
    });

    document.addEventListener('DOMContentLoaded', async () => {
        renderProductCard(await getProductsData(count, LIMIT_PAGE_ITEM));
        hideLoader();
    });
}

init();
