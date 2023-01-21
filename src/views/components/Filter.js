import { searchIngredientByName } from '../../domain/ingredients/repositories/IngredientRepository.js'

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
  let isOpen = false

  const toggle = () => {
    isOpen = !isOpen

    comboboxWrapper.classList.toggle('active')
    filterInput.style.borderRadius = isOpen ? '8px 0 0 0' : '8px 0 0 8px'
    !isOpen
      ? (filterInput.placeholder = filter.placeholder)
      : (filterInput.placeholder = filter.onClickPlaceholder)

    menuIconWrapper.style.borderRadius = isOpen ? '0 8px 0 0' : '0 8px 8px 0'
    menuIconWrapper.firstChild.classList.toggle('fa-chevron-down')
    menuIconWrapper.firstChild.classList.toggle('fa-chevron-up')

    if (!isOpen && comboboxWrapper.contains(listWrapper)) {
      listWrapper.removeChild(listWrapper.firstChild)
      comboboxWrapper.removeChild(listWrapper)
    } else {
      if (filter.name === 'ingredient') {
        ingredients = searchIngredientByName(filterInput.value)

        console.log(ingredients)

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

          listItem.addEventListener('click', (event) => {
            const searchParam = new URL(document.location).searchParams.get(
              'search'
            )

            searchParam
              ? window.history.pushState(
                  {},
                  '',
                  `?search=${searchParam}&ingredients=${listItem.textContent.replace(
                    / /g,
                    '+'
                  )}`
                )
              : window.history.pushState(
                  {},
                  '',
                  `?ingredients=${listItem.textContent.replace(/ /g, '+')}`
                )
          })

          list.appendChild(listItem)
        }

        listWrapper.appendChild(list)
        comboboxWrapper.appendChild(listWrapper)

        filterInput.addEventListener('input', (event) => {
          const filteredIngredient = searchIngredientByName(event.target.value)

          if (isOpen) {
            listWrapper.removeChild(listWrapper.firstChild)
          }

          const list = document.createElement('ul')
          list.classList.add(
            'content',
            'p-3',
            'list-unstyled',
            `bg-${filter.color}`,
            'd-grid'
          )

          const ingredientsParams = []

          for (let i = 0; i < filteredIngredient.length; i += 1) {
            const listItem = document.createElement('li')
            listItem.dataset.option = `${i}`
            listItem.textContent = filteredIngredient[i].name

            listItem.addEventListener('click', (event) => {
              const url = new URL(document.location)

              const urlParams = new URLSearchParams(window.location.search)
              const searchParam = urlParams.get('search')

              ingredientsParams.push(listItem.textContent)
              console.log(ingredientsParams)

              for (let i = 0; i < ingredientsParams.length; i += 1) {
                searchParam
                  ? window.history.pushState(
                      {},
                      '',
                      `${url.href}&ingredients=${ingredientsParams[i].replace(
                        / /g,
                        '+'
                      )}`
                    )
                  : window.history.pushState(
                      {},
                      '',
                      `?ingredients=${ingredientsParams[i].replace(/ /g, '+')}`
                    )
              }
            })

            list.appendChild(listItem)
          }
          listWrapper.appendChild(list)
        })

        comboboxWrapper.appendChild(listWrapper)
      }
    }
  }

  document.body.addEventListener('click', (event) => {
    if (isOpen && !comboboxWrapper.contains(event.target)) {
      toggle()
    }
  })

  menuIconWrapper.addEventListener('click', toggle)
  filterInput.addEventListener('click', toggle)

  return comboboxWrapper
}

export default Filter
