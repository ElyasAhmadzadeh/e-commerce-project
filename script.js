import { headerNavbarBtnEventApplier, FAQEventApplier, homepageCardsScrollBtnEventApplier, timer, overlayDisplayCheck, homePageFeaturedProducts, homePageSpecialOffer } from "./modules/ui.js";
import { getDataFromAPI } from "./modules/api.js";
import { searchSuggestionEventApplier } from "./modules/search.js"
import { renderProductCard } from "./modules/renderElements.js";
import { state } from "./modules/state.js";


async function getDataFromAPIInit() {
    await getDataFromAPI();
    searchSuggestionEventApplier();
    homePageFeaturedProducts();
    homePageSpecialOffer();
    renderProductCard(state.allProducts , 1);
}
getDataFromAPIInit();

headerNavbarBtnEventApplier();
homepageCardsScrollBtnEventApplier();
FAQEventApplier();
timer();
overlayDisplayCheck();