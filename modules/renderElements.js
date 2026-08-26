import { paginationItemsEventApplier } from "./pagination.js";
import { ITEMS_PER_PAGE } from "./common.js";
import { state } from "./state.js";


export function renderFeaturedProduct(data) {
    const FPTemplate = document.querySelector("#featuredProductsTemplate");
    const FPList = document.querySelector(".featured-products-list");
    if (!FPList || !FPTemplate)
        return;

    const copyFilteredProducts = data.map(item => { return item });
    console.log(copyFilteredProducts);

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
        // card.querySelector(".without-discount-price").textContent = Math.floor(product.price / (1 - (product.discountPercentage / 100))) + "$";
        ProductList.appendChild(card);


    })


}

export function renderPagination(data, itemsPerPage) {
    console.log("render pagination called");
    
    const dataLength = data.length;
    const paginationItemCount = Math.ceil(dataLength / itemsPerPage);
    state.productPagePaginationMaxItems = paginationItemCount;
    const paginationList = document.querySelector(".pagination-list");
    if (!paginationList)
        return;

    paginationList.innerHTML = "";
    for (let i = 0; i < state.productPagePaginationMaxItems; i++) {
        const paginationEL = `<li class="m-0 p-1 text-center pagination-item ${i+1 == state.currentPageNumber ? "active" : ""}"><a href="" class="pagination-link">${i + 1}</a></li>`;
        paginationList.insertAdjacentHTML("beforeend", paginationEL);
    }
    
    paginationItemsEventApplier();

}