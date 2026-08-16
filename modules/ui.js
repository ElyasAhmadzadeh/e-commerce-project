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