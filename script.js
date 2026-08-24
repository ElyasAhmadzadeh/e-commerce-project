import { headerNavbarBtnEventApplier, FAQEventApplier, homepageCardsScrollBtnEventApplier, timer, overlayDisplayCheck, homePageFeaturedProducts, homePageSpecialOffer } from "./modules/ui.js";
import { getDataFromAPI } from "./modules/api.js";
import { searchSuggestionEventApplier } from "./modules/search.js"
import { renderProductCard , renderPagination} from "./modules/renderElements.js";
import { state } from "./modules/state.js";
import { ITEMS_PER_PAGE } from "./modules/common.js";
import {paginationBtnEventApplier} from "./modules/pagination.js"

async function getDataFromAPIInit() {
    await getDataFromAPI();
    searchSuggestionEventApplier();
    homePageFeaturedProducts();
    homePageSpecialOffer();
    renderProductCard(state.StagedProducts , 1);
    renderPagination(state.StagedProducts, ITEMS_PER_PAGE);
    paginationBtnEventApplier();
}
getDataFromAPIInit();

headerNavbarBtnEventApplier();
homepageCardsScrollBtnEventApplier();
FAQEventApplier();
timer();
overlayDisplayCheck();