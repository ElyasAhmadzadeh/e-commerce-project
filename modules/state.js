export const state = {
    allProducts: [],
    cartProducts: [],
    StagedProducts: [],
    hasFilter: false,
    filteredProducts:[],
    currentPageNumber: 1
}

export function clearStagedProducts() {
    state.StagedProducts.length = 0;
    state.StagedProducts = state.allProducts.map(item => {
        return item;
    });
}