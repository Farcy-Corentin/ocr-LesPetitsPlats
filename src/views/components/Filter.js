import { searchIngredientByName } from '../../domain/ingredients/repositories/IngredientRepository.js'
import { searchByIngredient } from '../../domain/recipes/repositories/RecipeRepository.js'
import RecipeList from './RecipeList.js'

const Filter = (filter) => {
  const comboboxWrapper = document.createElement('div')
  comboboxWrapper.classList.add(
    'combobox-wrapper',
    'col-12',
    'col-md-4',
    'col-lg-3',
    'mb-2'
  )

  const label = document.createElement('label')
  label.classList.add('visually-hidden')
  label.textContent = filter.placeholder
  label.htmlFor = filter.name

  const inputGroup = document.createElement('div')
  inputGroup.classList.add('input-group')

  const filterInput = document.createElement('input')
  filterInput.classList.add(
    'form-control',
    'form-control-lg',
    'py-4',
    `bg-${filter.color}`,
    'combobox-input'
  )
  filterInput.placeholder = filter.placeholder
  filterInput.id = filter.name

  const menuIconWrapper = document.createElement('div')
  menuIconWrapper.classList.add(
    'input-group-text',
    `bg-${filter.color}`,
    'text-white'
  )

  const menuIcon = document.createElement('i')
  menuIcon.classList.add('fa-solid', 'fa-chevron-down')

  menuIconWrapper.appendChild(menuIcon)
  inputGroup.appendChild(filterInput)
  inputGroup.appendChild(menuIconWrapper)

  comboboxWrapper.appendChild(label)
  comboboxWrapper.appendChild(inputGroup)

  const listWrapper = document.createElement('div')
  listWrapper.classList.add('list-wrapper')

  let ingredients = []
  const searchIngredients = []
  let isOpen = false

  const open = () => {
    isOpen = true
    comboboxWrapper.classList.add('active')
    filterInput.style.borderRadius = '8px 0 0 0'
    filterInput.placeholder = filter.onClickPlaceholder
    menuIconWrapper.style.borderRadius = '0 8px 0 0'
    menuIconWrapper.firstChild.classList.add('fa-chevron-up')
    menuIconWrapper.firstChild.classList.remove('fa-chevron-down')

    if (filter.name === 'ingredient') {
      ingredients = searchIngredientByName(filterInput.value)

      if (!listWrapper.firstChild) {
        const list = document.createElement('ul')
        list.classList.add(
          'content',
          'p-3',
          'list-unstyled',
          `bg-${filter.color}`,
          'd-grid'
        )

        for (let i = 0; i < ingredients.length; i += 1) {
          const listItem = document.createElement('li')
          listItem.dataset.option = `${i}`
          listItem.textContent = ingredients[i].name

          listItem.addEventListener('click', () => {
            const url = new URL(document.location)
            const urlParams = new URLSearchParams(window.location.search)
            let ingredient = urlParams.get('ingredient')
            ingredient = ingredient
              ? ingredient + '+' + listItem.textContent
              : listItem.textContent
            urlParams.set('ingredient', ingredient)

            searchIngredients.push(ingredients[i].name)

            console.log('searchIngredient', searchIngredients)
            close()
            window.history.pushState(
              {},
              '',
              `${url.pathname}?${urlParams.toString().replace(/%2B/g, '+')}`
            )
            document
              .querySelector('.recipes-section')
              .replaceWith(
                RecipeList(searchByIngredient(searchIngredients.toString()))
              )
          })

          list.appendChild(listItem)
        }
        listWrapper.appendChild(list)
      }
      comboboxWrapper.appendChild(listWrapper)
    }
  }

  const close = () => {
    isOpen = false
    comboboxWrapper.classList.remove('active')
    filterInput.style.borderRadius = '8px 0 0 8px'
    filterInput.placeholder = filter.placeholder
    menuIconWrapper.style.borderRadius = '0 8px 8px 0'
    menuIconWrapper.firstChild.classList.remove('fa-chevron-up')
    menuIconWrapper.firstChild.classList.add('fa-chevron-down')
    if (comboboxWrapper.contains(listWrapper)) {
      listWrapper.removeChild(listWrapper.firstChild)
      comboboxWrapper.removeChild(listWrapper)
    }
  }

  document.body.addEventListener('click', (event) => {
    if (isOpen && !comboboxWrapper.contains(event.target)) {
      close()
    }
  })

  menuIconWrapper.addEventListener('click', () => (!isOpen ? open() : close()))
  filterInput.addEventListener('click', open)
  filterInput.addEventListener('input', (event) => {
    const filteredIngredient = searchIngredientByName(event.target.value.trim())
    let list
    if (isOpen) {
      if (listWrapper.firstChild) {
        list = listWrapper.firstChild
        list.innerHTML = ''
      } else {
        list = document.createElement('ul')
        list.classList.add(
          'content',
          'p-3',
          'list-unstyled',
          `bg-${filter.color}`,
          'd-grid'
        )
      }
    }
    for (let i = 0; i < filteredIngredient.length; i += 1) {
      const listItem = document.createElement('li')
      listItem.dataset.option = `${i}`
      listItem.textContent = filteredIngredient[i].name
      list.appendChild(listItem)

      listItem.addEventListener('click', () => {
        const url = new URL(document.location)
        const urlParams = new URLSearchParams(window.location.search)
        let ingredient = urlParams.get('ingredient')
        ingredient = ingredient
          ? ingredient + '+' + listItem.textContent
          : listItem.textContent
        urlParams.set('ingredient', ingredient)

        searchIngredients.push(ingredients[i].name)

        console.log('searchIngredient', searchIngredients)
        close()
        window.history.pushState(
          {},
          '',
          `${url.pathname}?${urlParams.toString().replace(/%2B/g, '+')}`
        )
        document
          .querySelector('.recipes-section')
          .replaceWith(
            RecipeList(searchByIngredient(searchIngredients.toString()))
          )
      })
    }
    if (!listWrapper.firstChild) {
      listWrapper.appendChild(list)
    }
  })

  filterInput.addEventListener('focus', open)

  return comboboxWrapper
}

export default Filter
