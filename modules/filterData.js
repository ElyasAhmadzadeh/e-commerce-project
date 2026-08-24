import { state } from "./state.js";

export function filterByRating() {
    const copyAllProducts = state.allProducts.map(item => { return item });
    if (state.StagedProducts.length == 0) {
        state.StagedProducts = copyAllProducts.sort(function (a, b) { return b.rating - a.rating });
    }
    else {
        state.StagedProducts = state.StagedProducts.sort(function (a, b) { return b.rating - a.rating });
    }

    console.log(state.StagedProducts);

}
export function filterByDiscount() {
    const copyAllProducts = state.allProducts.map(item => { return item });
    if (state.StagedProducts.length == 0) {
        state.StagedProducts = copyAllProducts.sort(function (a, b) { return b.discountPercentage - a.discountPercentage });
    }
    else {
        state.StagedProducts = state.StagedProducts.sort(function (a, b) { return b.discountPercentage - a.discountPercentage });
    }

}

function sortByHigherPrice() {
    const copyAllProducts = state.allProducts.map(item => { return item });
    if (state.StagedProducts.length == 0) {
        state.StagedProducts = copyAllProducts.sort(function (a, b) { return b.price - a.price });
    }
    else {
        state.StagedProducts = state.StagedProducts.sort(function (a, b) { return b.price - a.price })
    }
}
function sortByLowerPrice() {
    const copyAllProducts = state.allProducts.map(item => { return item });
    if (state.StagedProducts.length == 0) {
        state.StagedProducts = copyAllProducts.sort(function (a, b) { return a.price - b.price });
    }
    else {
        state.StagedProducts = state.StagedProducts.sort(function (a, b) { return a.price - b.price })
    }
}

export function productToolbarSortEventApplier() {
    const toolbarSelection = document.querySelector("#filterProductsSelection");
    toolbarSelection.addEventListener("change", function (event) {
        toolbarSelectionSortHandler(event.target);
    })
}

function toolbarSelectionSortHandler(selection) {
console.log(selection.value);

}

export async function filterByCategoryName(categoryName) {
}