import RecipeList from './RecipeList.js'
import TagsList from './TagsList.js'

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
  filterInput.type = 'text'
  filterInput.classList.add(
    'form-control',
    'form-control-lg',
    'py-4',
    `${filter.color}`,
    'combobox-input'
  )
  filterInput.placeholder = filter.placeholder
  filterInput.id = filter.name

  const menuIconWrapper = document.createElement('div')
  menuIconWrapper.classList.add(
    'input-group-text',
    `${filter.color}`,
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

  const search = []
  let isOpen = false

  const onClick = (listItem) => {
    const url = new URL(document.location)
    const urlParams = new URLSearchParams(url.search)
    let param = urlParams.get(filter.name)

    param = param ? param + ',' + listItem.textContent : listItem.textContent

    urlParams.set(filter.name, param)

    search.push(listItem.textContent)

    const newUrl = `?${urlParams.toString().replace(/%2C/g, ',')}`

    close()
    window.history.replaceState({}, '', newUrl)
    document.querySelector('.tag-container').replaceWith(TagsList())
    document.querySelector('.recipes-section').replaceWith(RecipeList())
  }

  const open = () => {
    isOpen = true
    comboboxWrapper.classList.add('active')
    filterInput.style.borderRadius = '8px 0 0 0'
    filterInput.placeholder = filter.onClickPlaceholder
    menuIconWrapper.style.borderRadius = '0 8px 0 0'
    menuIconWrapper.firstChild.classList.add('fa-chevron-up')
    menuIconWrapper.firstChild.classList.remove('fa-chevron-down')

    const children = filter.searchBy(filterInput.value)

    const list = document.createElement('ul')
    list.classList.add(
      'content',
      'p-3',
      'list-unstyled',
      `${filter.color}`,
      'd-grid'
    )

    for (let i = 0; i < children.length; i += 1) {
      const listItem = document.createElement('li')
      listItem.dataset.option = `${i}`
      listItem.textContent = children[i].name

      listItem.addEventListener('click', () => onClick(listItem))

      list.appendChild(listItem)
    }
    listWrapper.appendChild(list)

    comboboxWrapper.appendChild(listWrapper)
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
    const children = filter.searchBy(event.target.value.trim())

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
          `${filter.color}`,
          'd-grid'
        )
      }
    }
    for (let i = 0; i < children.length; i += 1) {
      const listItem = document.createElement('li')
      listItem.dataset.option = `${i}`
      listItem.textContent = children[i].name
      list.appendChild(listItem)

      listItem.addEventListener('click', () => onClick(listItem))
    }
  })

  return comboboxWrapper
}

export default Filter
