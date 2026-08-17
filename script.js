import { headerNavbarBtnEventApplier , FAQEventApplier , homepageCardsScrollBtnEventApplier , timer , overlayDisplayCheck } from "./modules/ui.js";
import { getDataFromAPI } from "./modules/api.js";
import { filterByDiscount, filterByRating } from "./modules/filterData.js";
import { renderFeaturedProduct, renderSpecialOffer } from "./modules/renderElements.js";
import { state, clearAllFilters } from "./modules/state.js";
import {searchSuggestionEventApplier} from "./modules/search.js"


async function getDataFromAPIInit() {
    await getDataFromAPI();
    filterByRating();
    renderFeaturedProduct();
    clearAllFilters();
    filterByDiscount();
    renderSpecialOffer();
    clearAllFilters();
    console.log(state);
    
}
searchSuggestionEventApplier();
getDataFromAPIInit();
headerNavbarBtnEventApplier();
homepageCardsScrollBtnEventApplier();
FAQEventApplier();
timer();
overlayDisplayCheck();