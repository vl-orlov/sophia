const burgerRevealer = document.getElementById("burgerRevealer")
const burgerMenu = document.getElementById("burgerMenu")
const burgerRevealerImg = document.getElementById("burgerRevealerImg")
const burgerMenuBackdrop = document.getElementById("burgerMenuBackdrop")

addEventListener("DOMContentLoaded", () => {
    burgerRevealer.addEventListener('click', () => {
        let isExpanded = burgerRevealer.getAttribute("aria-expanded") === "true"

        if (isExpanded) {
            burgerMenu.classList.add("site_hidden")
            burgerMenuBackdrop.classList.add("site_hidden")
            burgerRevealerImg.src = "img/ico/burger-closed.svg"
        } else {
            burgerMenu.classList.remove("site_hidden")
            burgerMenuBackdrop.classList.remove("site_hidden")
            burgerRevealerImg.src = "img/ico/burger-opened.svg"
        }

        burgerRevealer.setAttribute("aria-expanded", String(!isExpanded))
    })
})
