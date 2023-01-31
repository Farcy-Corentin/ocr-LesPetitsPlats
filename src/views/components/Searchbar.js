import { searchRecipes } from '../../domain/recipes/services/searchRecipes.js'

const Searchbar = () => {
  const searchContainer = document.createElement('div')
  searchContainer.classList.add('container', 'mb-5')

  const searchForm = document.createElement('form')

  const searchFormGroup = document.createElement('div')
  searchFormGroup.classList.add('input-group', 'flex-nowrap')

  const searchIconContainer = document.createElement('span')
  searchIconContainer.classList.add(
    'input-group-text',
    'search-group',
    'align-items-center'
  )

  const searchIcon = document.createElement('i')
  searchIcon.classList.add('fa-solid', 'fa-magnifying-glass')

  searchIconContainer.appendChild(searchIcon)

  const searchInput = document.createElement('input')
  searchInput.type = 'search'
  searchInput.classList.add('form-control', 'search-input')
  searchInput.ariaLabel = 'Rechercher'
  searchInput.placeholder = 'Rechercher'

  searchFormGroup.appendChild(searchInput)
  searchFormGroup.appendChild(searchIconContainer)

  searchForm.appendChild(searchFormGroup)

  searchContainer.appendChild(searchForm)

  searchInput.addEventListener('input', searchRecipes)

  return searchContainer
}

export default Searchbar
