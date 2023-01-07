const container = document.createElement('div')
container.classList.add('container')

const title = document.createElement('h1')
title.textContent = 'Les petits plats'

container.appendChild(title)

document.querySelector('#app').appendChild(container)
