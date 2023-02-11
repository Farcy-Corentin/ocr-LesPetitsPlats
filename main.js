import Header from './src/views/components/Header.js'
import Searchbar from './src/views/components/Searchbar.js'
import RecipeList from './src/views/components/RecipeList.js'
import FilterList from './src/views/components/FilterList.js'
import TagsList from './src/views/components/TagsList.js'
import { searchIngredientByName } from './src/domain/ingredients/repositories/IngredientRepository.js'
import { searchApplianceByName } from './src/domain/appliances/repositories/ApplianceRepository.js'
import {
  searchByAppliance,
  searchByIngredient,
} from './src/domain/recipes/repositories/RecipeRepository.js'

const filters = [
  {
    name: 'ingredients',
    color: 'bg-primary',
    placeholder: 'Ingredients',
    onClickPlaceholder: 'Rechercher un ingredient',
    onSearch: (search) => searchByIngredient(search),
    searchBy: (ingredients) => searchIngredientByName(ingredients),
  },
  {
    name: 'appliances',
    color: 'bg-success',
    placeholder: 'Appareils',
    onClickPlaceholder: 'Rechercher un appareil',
    onSearch: (seach) => searchByAppliance(seach),
    searchBy: (appliances) => searchApplianceByName(appliances),
  },
  {
    name: 'ustencils',
    color: 'bg-danger',
    placeholder: 'Ustencils',
    onClickPlaceholder: 'Rechercher un ustencil',
  },
]

document.querySelector('#app').appendChild(Header())
document.querySelector('#app').appendChild(Searchbar())
document.querySelector('#app').appendChild(TagsList())
document.querySelector('#app').appendChild(FilterList(filters))
document.querySelector('#app').appendChild(RecipeList())
