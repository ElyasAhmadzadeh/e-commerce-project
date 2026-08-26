import { state } from "./state.js";
import { renderProductCard, renderPagination } from "./renderElements.js";
import { ITEMS_PER_PAGE, MAXIMUM_PRODUCT_PRICE } from "./common.js";

export function sortByRating() {
    const copyAllProducts = state.allProducts.map(item => { return item });
    if (state.hasFilter) {
        state.filteredProducts = state.filteredProducts.sort(function (a, b) { return b.rating - a.rating });
    }
    else if (state.StagedProducts.length == 0) {
        state.StagedProducts = copyAllProducts.sort(function (a, b) { return b.rating - a.rating });
    }
    else {
        state.StagedProducts = state.StagedProducts.sort(function (a, b) { return b.rating - a.rating });
    }

}
export function sortByDiscount() {
    const copyAllProducts = state.allProducts.map(item => { return item });
    if (state.hasFilter) {
        state.filteredProducts = state.filteredProducts.sort(function (a, b) { return b.discountPercentage - a.discountPercentage });
    }
    else if (state.StagedProducts.length == 0) {
        state.StagedProducts = copyAllProducts.sort(function (a, b) { return b.discountPercentage - a.discountPercentage });
    }
    else {
        state.StagedProducts = state.StagedProducts.sort(function (a, b) { return b.discountPercentage - a.discountPercentage });
    }

}

function sortByHigherPrice() {
    const copyAllProducts = state.allProducts.map(item => { return item });
    if (state.hasFilter) {
        state.filteredProducts = state.filteredProducts.sort(function (a, b) { return b.price - a.price });
    }
    else if (state.StagedProducts.length == 0) {
        state.StagedProducts = copyAllProducts.sort(function (a, b) { return b.price - a.price });
    }
    else {
        state.StagedProducts = state.StagedProducts.sort(function (a, b) { return b.price - a.price });
    }
}
function sortByLowerPrice() {
    const copyAllProducts = state.allProducts.map(item => { return item });
    if (state.hasFilter) {
        state.filteredProducts = state.filteredProducts.sort(function (a, b) { return a.price - b.price });
    }
    else if (state.StagedProducts.length == 0) {
        state.StagedProducts = copyAllProducts.sort(function (a, b) { return a.price - b.price });
    }
    else {
        state.StagedProducts = state.StagedProducts.sort(function (a, b) { return a.price - b.price });
    }
}

export function productToolbarSortEventApplier() {
    const toolbarSelection = document.querySelector("#filterProductsSelection");
    toolbarSelection.addEventListener("change", function (event) {
        toolbarSelectionSortHandler(event.target);
    })
}

export function toolbarSelectionSortHandler(selection) {
    state.currentPageNumber = 1;
    switch (selection.value) {
        case "all":
            state.StagedProducts = state.allProducts.map(item => {
                return item;
            });
            break;
        case "expensive":
            sortByHigherPrice();
            break;
        case "cheap":
            sortByLowerPrice();
            break;
        case "topRating":
            sortByRating();
            break;
        case "topDiscount":
            sortByDiscount();
            break;
    }
    if (state.hasFilter)
        renderProductCard(state.filteredProducts, state.currentPageNumber);
    else
        renderProductCard(state.StagedProducts, state.currentPageNumber);
}

export function productsPageFilterFormEventApplier() {
    const form = document.querySelector(".filters-form");
    form.addEventListener("submit", function (event) {
        filtersFormHandler(event.target);
    });
}
export function filtersFormHandler(form) {
    state.hasFilter = false;
    categoryCheckboxes(form);
    priceRangeFilter(form);
    if (state.hasFilter) {
        renderPagination(state.filteredProducts, ITEMS_PER_PAGE);
        renderProductCard(state.filteredProducts, state.currentPageNumber);
    }
    else {
        renderPagination(state.StagedProducts, ITEMS_PER_PAGE);
        renderProductCard(state.StagedProducts, state.currentPageNumber);
    }



}

function categoryCheckboxes(form) {
    const categoryCheckboxes = Array.from(form.querySelectorAll(".category-checkbox"));
    const checkedCheckboxes = categoryCheckboxes.filter(item => {
        return item.checked;
    });
    if (checkedCheckboxes.length == 0) {
        return;
    }
    const checkedValues = checkedCheckboxes.map(item => { return item.value });
    state.filteredProducts = state.StagedProducts.filter(item => {
        return checkedValues.includes(item.category);
    });
    state.currentPageNumber = 1;
    state.hasFilter = true;
}

function priceRangeFilter(form) {
    const priceRangeInput = document.querySelector(".form-price-range");
    const inputValue = Math.floor(priceRangeInput.value);
    if (inputValue == 0)
        return;

    if (state.hasFilter) {
        state.filteredProducts = state.filteredProducts.filter(item => {
            return item.price > inputValue && item.price < MAXIMUM_PRODUCT_PRICE;
        });
    }
    else {
        state.filteredProducts = state.StagedProducts.filter(item => {
            return item.price > inputValue && item.price < MAXIMUM_PRODUCT_PRICE;
        });
    }
    state.currentPageNumber = 1;
    state.hasFilter = true;
}