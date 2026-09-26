export const state = {
    allProducts: [],
    cartProducts: [],
    StagedProducts: [],
    hasFilter: false,
    filteredProducts: [],
    currentPageNumber: 1,
    productPagePaginationMaxItems: 0,
    localData: [],
    bookmarkProducts: []
}

export function clearStagedProducts() {
    state.StagedProducts.length = 0;
    state.StagedProducts = state.allProducts.map(item => {
        return item;
    });
}

export function saveBookmarks() {
    localStorage.setItem('bookmarkProducts', JSON.stringify(state.bookmarkProducts));
}
export function loadBookmarks() {
    state.bookmarkProducts = JSON.parse(localStorage.getItem("bookmarkProducts"));
    if (!state.bookmarkProducts)
        state.bookmarkProducts = [];
}
export function saveCartProducts() {
    console.log("save cart called");
    
    localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
}
export function loadCartProducts() {
    state.cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    if (!state.cartProducts)
        state.cartProducts = [];
}