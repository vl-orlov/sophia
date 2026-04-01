const burgerRevealer = document.getElementById("burgerRevealer")
const burgerMenu = document.getElementById("burgerMenu")
const burgerRevealerImg = document.getElementById("burgerRevealerImg")
const burgerMenuBackdrop = document.getElementById("burgerMenuBackdrop")

addEventListener("DOMContentLoaded", () => {
    burgerRevealer.addEventListener('click', () => {
        let isExpanded = burgerRevealer.getAttribute("aria-expanded") === "true" 
        
        if (isExpanded) {
            burgerMenu.classList.add("hidden")
            burgerMenuBackdrop.classList.add("hidden")
            burgerRevealerImg.src = "img/ico/burger-closed.svg"
        } else {
            burgerMenu.classList.remove("hidden")
            burgerMenuBackdrop.classList.remove("hidden")
            burgerRevealerImg.src = "img/ico/burger-opened.svg"
        }

        burgerRevealer.setAttribute("aria-expanded", String(!isExpanded))
    })
})