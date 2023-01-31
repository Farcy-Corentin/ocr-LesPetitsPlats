import Header from './src/views/components/Header.js'
import Searchbar from './src/views/components/Searchbar.js'
import RecipeList from './src/views/components/RecipeList.js'
import FilterList from './src/views/components/FilterList.js'

const filters = [
  {
    name: 'ingredient',
    color: 'danger',
    placeholder: 'Ingredients',
    onClickPlaceholder: 'Rechercher un ingredient',
  },
  {
    name: 'appliance',
    color: 'success',
    placeholder: 'Appareils',
    onClickPlaceholder: 'Rechercher un appareil',
  },
  {
    name: 'ustencils',
    color: 'primary',
    placeholder: 'Ustencils',
    onClickPlaceholder: 'Rechercher un ustencil',
  },
]

document.querySelector('#app').appendChild(Header())
document.querySelector('#app').appendChild(Searchbar())
document.querySelector('#app').appendChild(FilterList(filters))

document.querySelector('#app').appendChild(RecipeList())
