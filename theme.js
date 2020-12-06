"use strict"
let btnTheme = document.querySelector('.search-by-button')
let searchMenu = document.querySelector('.search-menu-theme')
let geoButton = document.querySelector('.your-geolocation')
let closeSearch = document.querySelector('.close-search')

btnTheme.addEventListener('click', (e) => {
    e.preventDefault()
    searchMenu.classList.add('show')
    btnTheme.classList.add('hide')
    geoButton.classList.add('hide')
})

closeSearch.addEventListener('click', (e) => {
    e.preventDefault()
    searchMenu.classList.remove('show')
    btnTheme.classList.remove('hide')
    geoButton.classList.remove('hide')
})