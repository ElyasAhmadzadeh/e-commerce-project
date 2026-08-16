export function headerNavbarBtnEventApplier() {
    const btn = document.querySelector(".header-nav-btn");
    btn.addEventListener("click", navbarActivator)
}
function navbarActivator() {
    const headerContainer = document.querySelector(".header > div");
    const overlayBox = document.querySelector(".overlay-box");
    const overlay = document.querySelector(".overlay");
    headerContainer.classList.add("p-0");
    overlayBox.classList.add("overlay--active");
    const navbar = document.querySelector(".navbar-container");
    navbar.classList.add("navbar--active");

    overlay.addEventListener("click", function () {
        headerContainer.classList.remove("p-0");
        overlayBox.classList.remove("overlay--active");
        navbar.classList.remove("navbar--active");
    })

}

export function FAQEventApplier() {
    const accordionTitles = document.querySelectorAll(".accordion-title-box");
    accordionTitles.forEach(item => {
        item.addEventListener("click", function (event) {
            const clickedEL = event.target.closest(".accordion-item-box");
            clickedEL.querySelector(".accordion-icon").classList.toggle("accordion-icon--active");
            clickedEL.querySelector(".accordion-description").classList.toggle("accordion--active");
        })
    })
}

export function homepageCardsScrollBtnEventApplier() {
    const nextBtn = document.querySelectorAll(".next-btn");
    const prevBtn = document.querySelectorAll(".prev-btn");

    nextBtn[0].addEventListener("click", scrollNext);
    nextBtn[1].addEventListener("click", scrollNext);
    prevBtn[0].addEventListener("click", scrollPrev);
    prevBtn[1].addEventListener("click", scrollPrev);
}

function scrollNext(event) {
    const direction = getComputedStyle(document.documentElement).direction;
    const container = event.target.closest(".featured-products-list-container") || event.target.closest(".special-offer-box");
    const list = container.querySelector(".scrolled-list");
    if (direction == "ltr")
        list.scrollLeft += 300;
    else
        list.scrollLeft -= 300;
}
function scrollPrev(event) {
    const direction = getComputedStyle(document.documentElement).direction;
    const container = event.target.closest(".featured-products-list-container") || event.target.closest(".special-offer-box");
    const list = container.querySelector(".scrolled-list");
    if (direction == "ltr")
        list.scrollLeft -= 300;
    else
        list.scrollLeft += 300;




}