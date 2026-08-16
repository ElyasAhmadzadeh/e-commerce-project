export const state = {
    allProducts:[] ,
    cartProducts:[] ,
    filteredProducts: []
}

export function clearAllFilters(){
    state.filteredProducts.length = 0;
}