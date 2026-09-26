import { headerNavbarBtnEventApplier, FAQEventApplier, homepageCardsScrollBtnEventApplier, timer, overlayDisplayCheck, homePageFeaturedProducts, homePageSpecialOffer, priceRangeInputEventApplier, productImageSelectionEventApplier, quantityBtnsEventApplier, cartCountShow } from "./modules/ui.js";
import { getDataFromAPI, getLocalData } from "./modules/api.js";
import { searchSuggestionEventApplier } from "./modules/search.js"
import { renderProductCard, renderPagination } from "./modules/renderElements.js";
import { loadBookmarks, loadCartProducts, state } from "./modules/state.js";
import { ITEMS_PER_PAGE , page } from "./modules/common.js";
import { paginationBtnEventApplier } from "./modules/pagination.js"
import { productToolbarSortEventApplier, productsPageFilterFormEventApplier } from "./modules/filterData.js"
import { productPageURLCategoryHandler, productPageURLSortHandler, productDetailsURLIdHandler } from "./modules/URL.js"
import { addToBookmarkEventApplier, addToCartEventApplier } from "./modules/bookmarksAndCart.js";


async function APIDataRelatedInit() {
    await getDataFromAPI();
    await getLocalData();
    searchSuggestionEventApplier();
    if (page === "homepage") {
        homePageFeaturedProducts();
        homePageSpecialOffer();
    }
    if (page === "products") {
        renderProductCard(state.StagedProducts, 1);
        renderPagination(state.StagedProducts, ITEMS_PER_PAGE);
        paginationBtnEventApplier();
    }
}

function productsPageInit() {
    if (page === "products") {
        productToolbarSortEventApplier();
        productsPageFilterFormEventApplier();
        productPageURLCategoryHandler();
        productPageURLSortHandler();
    }
}

function productDetailsPageInit() {
    if (page === "product-detail") {
        productDetailsURLIdHandler();
    }
}

function UIInit() {
    headerNavbarBtnEventApplier();
    overlayDisplayCheck();
    cartCountShow();
    if (page === "homepage") {
        homepageCardsScrollBtnEventApplier();
        FAQEventApplier();
        timer();
    }
    if (page === "products") {
        priceRangeInputEventApplier();
    }
    if (page === "product-detail") {
        productImageSelectionEventApplier();
        quantityBtnsEventApplier();
        addToBookmarkEventApplier();
        addToCartEventApplier();

    }
}

async function init() {
    loadCartProducts();
    loadBookmarks();
    UIInit();
    await APIDataRelatedInit();
    productsPageInit();
    productDetailsPageInit();
    console.log(state.allProducts);


}
init();
