import { paginationItemsEventApplier } from "./pagination.js";
import { ITEMS_PER_PAGE } from "./common.js";
import { state } from "./state.js";
import { wishlistBtnToggler } from "./ui.js";
import { addToCart } from "./bookmarksAndCart.js";



export function renderFeaturedProduct(data) {
    const FPTemplate = document.querySelector("#featuredProductsTemplate");
    const FPList = document.querySelector(".featured-products-list");
    if (!FPList || !FPTemplate)
        return;

    const copyFilteredProducts = data.map(item => { return item });

    for (let i = 0; i < 8; i++) {
        const card = FPTemplate.content.cloneNode(true);
        card.querySelector(".featured-products-item").setAttribute("data-product-id", copyFilteredProducts[i].id);
        card.querySelector(".product-image > img").setAttribute("src", copyFilteredProducts[i].thumbnail);
        card.querySelector(".product-title").textContent = copyFilteredProducts[i].title;
        card.querySelector(".product-text").textContent = copyFilteredProducts[i].description;
        card.querySelector(".rating-value").textContent = copyFilteredProducts[i].rating;
        const goldStarWrappers = card.querySelectorAll(".gold-star-wrapper");
        goldStarsRender(goldStarWrappers, copyFilteredProducts[i].rating);
        card.querySelector(".discounted-price").textContent = copyFilteredProducts[i].price + "$";
        card.querySelector(".fp-view-btn").href = `./pages/product.html?id=${copyFilteredProducts[i].id}`;

        const addTOCartBtn = card.querySelector(".fp-addtocard-btn");
        addTOCartBtn.addEventListener("click", addToCart);

        FPList.append(card);


    }
}

export function renderSpecialOffer(data) {
    const SOTemplate = document.querySelector("#spacialOfferTemplate");
    const SOList = document.querySelector(".offered-products-container");
    if (!SOList || !SOTemplate)
        return;


    const copyFilteredProducts = data.map(item => { return item });

    for (let i = 0; i < 8; i++) {

        const card = SOTemplate.content.cloneNode(true);
        card.querySelector(".offered-product").setAttribute("data-product-id", copyFilteredProducts[i].id);
        card.querySelector(".product-image > img").setAttribute("src", copyFilteredProducts[i].thumbnail);
        card.querySelector(".offer-discount").textContent = Math.floor(copyFilteredProducts[i].discountPercentage) + "%";
        card.querySelector(".product-title").textContent = copyFilteredProducts[i].title;
        card.querySelector(".rating-value").textContent = copyFilteredProducts[i].rating;
        const goldStarWrappers = card.querySelectorAll(".gold-star-wrapper");
        goldStarsRender(goldStarWrappers, copyFilteredProducts[i].rating);
        card.querySelector(".discounted-price").textContent = copyFilteredProducts[i].price + "$";
        card.querySelector(".without-discount-price").textContent = Math.floor(copyFilteredProducts[i].price / (1 - (copyFilteredProducts[i].discountPercentage / 100))) + "$";
        card.querySelector(".special-offer-link").href = `./pages/product.html?id=${copyFilteredProducts[i].id}`;
        SOList.append(card);
    }
}


function goldStarsRender(starsEl, rating) {
    let fullStarCounter = 0;
    const ratingFullStars = Math.floor(rating);
    const ratingIncompleteStarPercentage = (rating - ratingFullStars) * 100;
    for (let i = 0; i < ratingFullStars; i++) {
        starsEl[i].classList.add("test-show-star");
        fullStarCounter++;
    }
    starsEl[fullStarCounter].classList.add("test-show-star");
    starsEl[fullStarCounter].style.width = Math.floor(ratingIncompleteStarPercentage).toString() + "%";

}

export function renderProductCard(data, pageNumber = 1) {
    const ProductsTemplate = document.querySelector("#productItemTemplate");
    const ProductList = document.querySelector(".product-card-list");
    const start = (pageNumber - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE


    if (!ProductsTemplate || !ProductList)
        return;

    const productNumber = document.querySelector(".products-number");
    productNumber.textContent = data.length;

    const copyFilteredProducts = data.map(item => { return item });
    for (const child of Array.from(ProductList.children)) {
        if (child.classList.contains("product-item"))
            child.remove();
    }

    copyFilteredProducts.slice(start, end).forEach(product => {
        const card = ProductsTemplate.content.cloneNode(true);
        card.querySelector(".article-container").setAttribute("data-product-id", product.id);
        card.querySelector(".product-image > img").setAttribute("src", product.thumbnail);
        // card.querySelector(".offer-discount").textContent = Math.floor(product.discountPercentage) + "%";
        card.querySelector(".product-title").textContent = product.title;
        card.querySelector(".rating-value").textContent = product.rating;
        const goldStarWrappers = card.querySelectorAll(".gold-star-wrapper");
        goldStarsRender(goldStarWrappers, product.rating);
        card.querySelector(".discounted-price").textContent = product.price + "$";
        card.querySelector(".product-view-link").href = `./product.html?id=${product.id}`;
        // card.querySelector(".without-discount-price").textContent = Math.floor(product.price / (1 - (product.discountPercentage / 100))) + "$";
        ProductList.appendChild(card);


    })


}

export function renderPagination(data, itemsPerPage) {

    const dataLength = data.length;
    const paginationItemCount = Math.ceil(dataLength / itemsPerPage);
    state.productPagePaginationMaxItems = paginationItemCount;
    const paginationList = document.querySelector(".pagination-list");
    if (!paginationList)
        return;

    paginationList.innerHTML = "";
    for (let i = 0; i < state.productPagePaginationMaxItems; i++) {
        const paginationEL = `<li class="m-0 p-1 text-center pagination-item ${i + 1 == state.currentPageNumber ? "active" : ""}"><a href="" class="pagination-link">${i + 1}</a></li>`;
        paginationList.insertAdjacentHTML("beforeend", paginationEL);
    }

    paginationItemsEventApplier();

}


export function renderProductDetails(product) {


    document.querySelector(".current-page").textContent = product.title;
    document.querySelector(".product-name").textContent = product.title;
    document.querySelector(".product-company").textContent = product.brand;
    document.querySelector(".ratring-value").textContent = product.rating;
    const goldStarWrappers = document.querySelectorAll(".gold-star-wrapper");
    goldStarsRender(goldStarWrappers, product.rating);
    const statusElement = document.querySelector(".status-badge")
    renderStockStatus(product, statusElement);
    document.querySelector(".about-product-text").textContent = product.description;
    renderSpecsList(product);

    document.querySelector(".overall-price").textContent = product.price + "$";

    const imageList = document.querySelector(".image-list");
    const imageDisplay = document.querySelector(".image-display");
    const productImages = product.images;
    imageDisplay.src = productImages[0];
    productImages.forEach(image => {
        const imageEl = `      <li class="image-list-item"><a href="" class="w-100"><img
                                src=${image}
                                class="product-image-thumbnail" alt=""></a></li>`;
        imageList.insertAdjacentHTML("beforeend", imageEl);
    });


    if (state.bookmarkProducts && state.bookmarkProducts.some(bookmarkProduct => { return bookmarkProduct.id === product.id })) {
        const bookmarkBtn = document.querySelector(".add-to-wishlist-btn");
        wishlistBtnToggler(bookmarkBtn);
    }

    const cartBtn = document.querySelector(".add-to-cart-btn");
    if (product.availabilityStatus === "Out of Stock") {
        cartBtn.disabled = true;
        cartBtn.classList.add("disabled");
    }
    else {
        cartBtn.disabled = false;
        cartBtn.classList.remove("disabled");

    }

}

function renderSpecsList(product) {
    const productSpecs = state.localData.find(item => {
        return item.id == product.id;
    });
    const specsList = document.querySelector(".specs-list");
    const keyValues = Object.entries(productSpecs);
    keyValues.forEach(keyValue => {
        if (keyValue[0] != "id" && keyValue[0] != "category" && keyValue[0] != "title") {

            const specEl = `                   <li class="specs-list-item mb-2">
                                <h6 class="spec-name m-0">${keyValue[0].charAt(0).toUpperCase() + keyValue[0].slice(1)}</h6><span class="spec-info">${keyValue[1]}</span>
                            </li>`;
            specsList.insertAdjacentHTML("beforeend", specEl);

        }

    })

}

function renderStockStatus(product, statusElement) {
    switch (product.availabilityStatus) {
        case "In Stock":
            statusElement.classList.add("in-stock");
            break;
        case "Low Stock":
            statusElement.classList.add("low-stock");
            break;
        case "Out of Stock":
            statusElement.classList.add("out-stock");
            break;
    }
    statusElement.textContent = product.availabilityStatus;

}