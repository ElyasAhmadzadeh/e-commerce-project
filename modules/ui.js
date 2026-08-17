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

export function renderSuggestionList(results) {
    const container = document.querySelector(".search-suggestion");
    const list = container.querySelector(".search-suggestion-list");
    console.log(results);



    list.innerHTML = "";
    results.forEach(result => {
        const suggestEL = `             <li class="search-suggestion-item" data-product-id = ${result.id}><span
                                            class="suggestion-title">${result.title}</span><span class="stock-status">${result.availabilityStatus}</span>
                                    </li>`;
        list.insertAdjacentHTML("beforeend", suggestEL);

    });
    if (results.length == 0)
        container.classList.remove("search-suggestion--active");
    else
        container.classList.add("search-suggestion--active");
}

export function timer() {
    const now = new Date();
    const targetDate = new Date();
    targetDate.setHours(now.getHours() + 5);
    targetDate.setMinutes(now.getMinutes() + 30);
    setInterval(function () {
        const nowCounter = new Date();
        if (nowCounter.getTime() === targetDate.getTime())
            return;

        const displayedDate = targetDate.getTime() - nowCounter.getTime();

        displayTime(displayedDate);

    }, 1000)
}

function displayTime(displayDate) {
    const hours = Math.floor(displayDate / 1000 / 3600);
    const minutes = Math.floor((displayDate / 1000 / 60) % 60);
    const seconds = Math.floor((displayDate / 1000) % 60);


    document.querySelector(".hours").textContent = hours.toString().padStart(2, "0");
    document.querySelector(".minutes").textContent = minutes.toString().padStart(2, "0");
    document.querySelector(".seconds").textContent = seconds.toString().padStart(2, "0");
}
