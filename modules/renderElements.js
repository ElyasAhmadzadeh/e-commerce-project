import { state } from "./state.js";


export function renderFeaturedProduct() {
    const FPTemplate = document.querySelector("#featuredProductsTemplate");
    const FPList = document.querySelector(".featured-products-list");
    if (!FPList || !FPTemplate)
        return;

    const copyFilteredProducts = state.filteredProducts.map(item => { return item });
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

export function renderSpecialOffer() {
    const SOTemplate = document.querySelector("#spacialOfferTemplate");
    const SOList = document.querySelector(".offered-products-container");
    if (!SOList || !SOTemplate)
        return;


    const copyFilteredProducts = state.filteredProducts.map(item => { return item });

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