export const state = {
    allProducts:[] ,
    cartProducts:[] ,
    StagedProducts: [] ,
    currentPageNumber: 1
}

export function clearStagedProducts(){
    state.StagedProducts.length = 0;
}