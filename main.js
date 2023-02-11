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
  searchByUstensil,
} from './src/domain/recipes/repositories/RecipeRepository.js'
import { searchUstensilByName } from './src/domain/ustensils/repositories/UstensilRepository.js'

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
    onSearch: (search) => searchByAppliance(search),
    searchBy: (appliances) => searchApplianceByName(appliances),
  },
  {
    name: 'ustensils',
    color: 'bg-danger',
    placeholder: 'Ustensils',
    onClickPlaceholder: 'Rechercher un ustencil',
    onSearch: (search) => searchByUstensil(search),
    searchBy: (ustensils) => searchUstensilByName(ustensils),
  },
]

document.querySelector('#app').appendChild(Header())
document.querySelector('#app').appendChild(Searchbar())
document.querySelector('#app').appendChild(TagsList())
document.querySelector('#app').appendChild(FilterList(filters))
document.querySelector('#app').appendChild(RecipeList())
