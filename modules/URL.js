import { filtersFormHandler, sortByRating, sortByDiscount, toolbarSelectionSortHandler, findProductById } from "./filterData.js"
import { state } from "./state.js";
import { renderProductDetails } from "./renderElements.js";

function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category');
}

function getSortSubjectFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('sortBy');
}

export function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

export function productDetailsURLIdHandler() {
    const urlId = getProductIdFromURL();
    if (!urlId) return;
    const product = findProductById(urlId);
    renderProductDetails(product);

}

export function productPageURLCategoryHandler() {
    const urlInfo = getCategoryFromURL();
    if (!urlInfo) return;
    switch (urlInfo) {
        case "smartphones":
            URLFilterCategoryHandler("smartphones");
            break;
        case "laptops":
            URLFilterCategoryHandler("laptops");
            break;
        case "tablets":
            URLFilterCategoryHandler("tablets");
            break;
        case "mobile-accessories":
            URLFilterCategoryHandler("mobile-accessories");
            break;
    }
}

function URLFilterCategoryHandler(categoryName) {
    const filtersForm = document.querySelector(".filters-form");
    const checkboxes = Array.from(document.querySelectorAll(".category-checkbox"));
    const selectedCategoryCheckbox = checkboxes.find(item => {
        return item.value == categoryName;
    }
    );
    selectedCategoryCheckbox.checked = true;
    filtersFormHandler(filtersForm);
}

export function productPageURLSortHandler() {
    const urlSortSubject = getSortSubjectFromURL();
    if (!urlSortSubject) return;
    switch (urlSortSubject) {
        case "topRating":
            urlSortHandler("topRating")
            break;
        case "topDiscount":
            urlSortHandler("topDiscount")
            break;
    }
}
function urlSortHandler(sortSubject) {
    const sortSelection = document.querySelector("#filterProductsSelection");
    sortSelection.value = sortSubject;
    toolbarSelectionSortHandler(sortSelection);

}