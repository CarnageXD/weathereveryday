"use strict"

let popupOpen = document.getElementById('open-pop')
let popupClose = document.getElementById('popup-close')
let popupBody = document.getElementById('popup')



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


