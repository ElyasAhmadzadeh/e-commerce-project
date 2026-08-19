import { state } from "./state.js";
import { getDataFromAPI } from "./api.js";

export async function filterByRating() {
    const copyAllProducts = state.allProducts.map(item => { return item });
    if (state.StagedProducts.length == 0) {
        state.StagedProducts = copyAllProducts.sort(function (a, b) { return b.rating - a.rating });
    }
    else {
        state.StagedProducts = state.StagedProducts.sort(function (a, b) { return b.rating - a.rating });
    }

console.log(state.StagedProducts);

}
export async function filterByDiscount() {
    const copyAllProducts = state.allProducts.map(item => { return item });
    if (state.StagedProducts.length == 0) {
        state.StagedProducts = copyAllProducts.sort(function (a, b) { return b.discountPercentage - a.discountPercentage });
    }
    else {
        state.StagedProducts = state.StagedProducts.sort(function (a, b) { return b.discountPercentage - a.discountPercentage });
    }

}

export async function filterByCategoryName(categoryName) {
}