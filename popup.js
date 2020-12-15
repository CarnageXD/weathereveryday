"use strict"

let popupOpen = document.querySelector('.about-us')
let popupOpenBurger = document.querySelector('.about-us-burger')
let popupClose = document.querySelector('.popup-close')
let popupBody = document.querySelector('.popup')



popupOpenBurger.addEventListener('click', (e) => {
    e.preventDefault()
    popupBody.classList.add('show')
})

popupOpen.addEventListener('click', (e) => {
    e.preventDefault()
    popupBody.classList.add('show')
})

document.addEventListener('click', (e) => {
    let click = e.target.classList.value
    if (click === 'popup-body') {
        popupBody.classList.remove('show')
    }
})

popupClose.addEventListener('click', () => {
    popupBody.classList.remove('show')
})


