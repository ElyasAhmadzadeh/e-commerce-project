export const state = {
    allProducts:[] ,
    cartProducts:[] ,
    StagedProducts: []
}

export function clearStagedProducts(){
    state.StagedProducts.length = 0;
}