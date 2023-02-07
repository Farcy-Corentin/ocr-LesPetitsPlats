import Header from './src/views/components/Header.js'
import Searchbar from './src/views/components/Searchbar.js'
import RecipeList from './src/views/components/RecipeList.js'
import FilterList from './src/views/components/FilterList.js'
import TagsList from "./src/views/components/TagsList.js";

const filters = [
  {
    name: 'ingredient',
    color: 'primary',
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
    color: 'danger',
    placeholder: 'Ustencils',
    onClickPlaceholder: 'Rechercher un ustencil',
  },
]

document.querySelector('#app').appendChild(Header())
document.querySelector('#app').appendChild(Searchbar())
document.querySelector('#app').appendChild(TagsList())
document.querySelector('#app').appendChild(FilterList(filters))
document.querySelector('#app').appendChild(RecipeList())
