const burgerRevealer = document.getElementById("burgerRevealer")
const burgerMenu = document.getElementById("burgerMenu")
const burgerMenuBackdrop = document.getElementById("burgerMenuBackdrop")

addEventListener("DOMContentLoaded", () => {
    burgerRevealer.addEventListener("click", () => {
        const isExpanded = burgerRevealer.getAttribute("aria-expanded") === "true"

        if (isExpanded) {
            burgerMenu.classList.add("site_hidden")
            burgerMenuBackdrop.classList.add("site_hidden")
            burgerRevealer.classList.remove("site_header_burger_open")
            burgerRevealer.setAttribute("aria-label", "Abrir menú")
        } else {
            burgerMenu.classList.remove("site_hidden")
            burgerMenuBackdrop.classList.remove("site_hidden")
            burgerRevealer.classList.add("site_header_burger_open")
            burgerRevealer.setAttribute("aria-label", "Cerrar menú")
        }

        burgerRevealer.setAttribute("aria-expanded", String(!isExpanded))
    })
})
