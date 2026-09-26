import { state, saveBookmarks, saveCartProducts } from "./state.js";
import { getProductIdFromURL } from "./URL.js";
import { findProductById } from "./filterData.js";
import { wishlistBtnToggler, cartCountShow } from "./ui.js";

export function addToBookmarkEventApplier() {
    const bookmarkBtn = document.querySelector(".add-to-wishlist-btn");
    bookmarkBtn.addEventListener("click", addToBookmark);
}
function addToBookmark(event) {
    wishlistBtnToggler(event.target);
    const productId = getProductIdFromURL();
    const product = findProductById(productId);
    const repeatCheck = state.bookmarkProducts.some(bookmarkedProduct => {
        return bookmarkedProduct.id === product.id;
    });
    if (repeatCheck) {
        state.bookmarkProducts = state.bookmarkProducts.filter(bookmarkedProduct => {
            return bookmarkedProduct.id != product.id;
        });
    }
    else {
        state.bookmarkProducts.push(product);
    }
    saveBookmarks();


}

export function addToCartEventApplier() {
    const addToCartBtn = document.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", addToCart);
}
export function addToCart(event) {

    const productId = getProductIdFromURL() || event.target.closest(".featured-products-item").getAttribute("data-product-id");
    console.log(productId);
    const product = findProductById(productId);
    const quantity = document.querySelector(".quantity-number-input");
    const quantityValue = quantity ? quantity.value : 1;
    const repeatCheck = state.cartProducts.some(cartProduct => {
        return cartProduct.product.id === product.id;
    });

    if (repeatCheck) {
        state.cartProducts.forEach(cartProduct => {
            if (cartProduct.product.id === product.id) {
                cartProduct.quantity+=quantityValue;
            }
        })
    }
    else {
        state.cartProducts.push({
            product: product,
            quantity: quantityValue
        });
    }

    saveCartProducts();
    cartCountShow();
}