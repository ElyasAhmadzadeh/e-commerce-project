import { headerNavbarBtnEventApplier, FAQEventApplier, homepageCardsScrollBtnEventApplier, timer, overlayDisplayCheck, homePageFeaturedProducts, homePageSpecialOffer, priceRangeInputEventApplier } from "./modules/ui.js";
import { getDataFromAPI } from "./modules/api.js";
import { searchSuggestionEventApplier } from "./modules/search.js"
import { renderProductCard, renderPagination } from "./modules/renderElements.js";
import { state } from "./modules/state.js";
import { ITEMS_PER_PAGE } from "./modules/common.js";
import { paginationBtnEventApplier } from "./modules/pagination.js"
import { productToolbarSortEventApplier, productsPageFilterFormEventApplier } from "./modules/filterData.js"

const page = document.body.dataset.page;

async function APIDataRelatedInit() {
    await getDataFromAPI();
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
    }
}

function UIInit() {
    headerNavbarBtnEventApplier();
    overlayDisplayCheck();
    if (page === "homepage") {
        homepageCardsScrollBtnEventApplier();
        FAQEventApplier();
        timer();
    }
    if (page === "products") {
        priceRangeInputEventApplier();
    }
}

async function init() {
    UIInit();
    await APIDataRelatedInit();
    productsPageInit();
}
init();
