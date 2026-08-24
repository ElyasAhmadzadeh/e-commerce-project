import { headerNavbarBtnEventApplier, FAQEventApplier, homepageCardsScrollBtnEventApplier, timer, overlayDisplayCheck, homePageFeaturedProducts, homePageSpecialOffer } from "./modules/ui.js";
import { getDataFromAPI } from "./modules/api.js";
import { searchSuggestionEventApplier } from "./modules/search.js"
import { renderProductCard, renderPagination } from "./modules/renderElements.js";
import { state } from "./modules/state.js";
import { ITEMS_PER_PAGE } from "./modules/common.js";
import { paginationBtnEventApplier } from "./modules/pagination.js"
import { productToolbarSortEventApplier } from "./modules/filterData.js"

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
    if (page === "products")
        productToolbarSortEventApplier();
}


function UIInit() {
    headerNavbarBtnEventApplier();
    overlayDisplayCheck();
    if (page === "homepage") {
        homepageCardsScrollBtnEventApplier();
        FAQEventApplier();
        timer();
    }
}

async function init() {
    UIInit();
    await APIDataRelatedInit();
    productsPageInit();
}
init();
