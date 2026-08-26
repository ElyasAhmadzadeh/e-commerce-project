import { renderProductCard } from "./renderElements.js";
import { state } from "./state.js";

export function paginationItemsEventApplier() {
    const paginationList = document.querySelector(".pagination-list");
    paginationList.addEventListener("click", function (event) {
        event.preventDefault();
        const targetEL = event.target;
        if (targetEL.classList.contains("pagination-item") || targetEL.closest(".pagination-item"))
            paginationHandler(targetEL, paginationList);
    })
}

function paginationHandler(targetEl, paginationList) {

    for (const paginationEL of Array.from(paginationList.children)) {
        if (paginationEL.classList.contains("pagination-item"))
            paginationEL.classList.remove("active");
    }
    const targetPageEL = targetEl.closest(".pagination-item");

    targetPageEL.classList.add("active");

    const targetPage = targetPageEL.querySelector(".pagination-link").textContent;
    state.currentPageNumber = targetPage;

    if (state.hasFilter)
        renderProductCard(state.filteredProducts, state.currentPageNumber);
    else
        renderProductCard(state.StagedProducts, state.currentPageNumber);



}

export function paginationBtnEventApplier() {
    const prevBtn = document.querySelector(".pagination-prev-btn");
    const nextBtn = document.querySelector(".pagination-next-btn");
    const paginationList = document.querySelector(".pagination-list");



    prevBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const paginationItems = Array.from(document.querySelectorAll(".pagination-item"));
        if (state.currentPageNumber > 1) {
            state.currentPageNumber--;
            const targetEL = paginationItems.find(item => {
                return item.textContent == state.currentPageNumber;
            });
            paginationHandler(targetEL, paginationList);
        }

    })
    nextBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const paginationItems = Array.from(document.querySelectorAll(".pagination-item"));
        if (state.currentPageNumber < state.productPagePaginationMaxItems) {
            state.currentPageNumber++;
            const targetEL = paginationItems.find(item => {
                return item.textContent == state.currentPageNumber;
            });
            paginationHandler(targetEL, paginationList);
        }

    })

}