import { headerNavbarBtnEventApplier , FAQEventApplier } from "./modules/ui.js";
import { getDataFromAPI } from "./modules/api.js";
import { filterByDiscount, filterByRating } from "./modules/filterData.js";
import { renderFeaturedProduct, renderSpecialOffer } from "./modules/renderElements.js";
import { state, clearAllFilters } from "./modules/state.js";


async function getDataFromAPIInit() {
    await getDataFromAPI();
    filterByRating();
    renderFeaturedProduct();
    clearAllFilters();
    filterByDiscount();
    renderSpecialOffer();
}
getDataFromAPIInit();
headerNavbarBtnEventApplier();
FAQEventApplier();