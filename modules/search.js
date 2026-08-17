import { state } from "./state.js";
import { renderSuggestionList } from "./ui.js";

export function searchSuggestionEventApplier() {
    const searchInput = document.querySelector("#headerSearchInput");
    searchInput.addEventListener("input", () => {
        searchSuggestionHandler(searchInput.value);
    });
}

function searchSuggestionHandler(searchValue) {
    let results = [];
    if (searchValue.trim() != "") {
        state.allProducts.forEach(item => {
            if (item.title.toLowerCase().includes(searchValue.toLowerCase()))
                results.push(item);
        })
    }
    renderSuggestionList(results);
}