import { state } from "./state.js";
import { getDataFromAPI } from "./api.js";

export async function filterByRating(data = []) {
    const copyAllProducts = state.allProducts.map(item => { return item });
    if (state.filteredProducts.length == 0) {
        state.filteredProducts = copyAllProducts.sort(function (a, b) { return b.rating - a.rating });
    }
    else {
        state.filteredProducts = state.filteredProducts.sort(function (a, b) { return b.rating - a.rating });
    }

console.log(state.filteredProducts);

}
export async function filterByDiscount(data = []) {
    const copyAllProducts = state.allProducts.map(item => { return item });
    if (state.filteredProducts.length == 0) {
        state.filteredProducts = copyAllProducts.sort(function (a, b) { return b.discountPercentage - a.discountPercentage });
    }
    else {
        state.filteredProducts = state.filteredProducts.sort(function (a, b) { return b.discountPercentage - a.discountPercentage });
    }

}

export async function filterByCategoryName(categoryName) {
}