import Header from './src/views/components/Header.js'
import Searchbar from './src/views/components/Searchbar.js'
import { getAll } from './src/domain/recipes/RecipeRepository.js'
import createRecipeFromData from './src/domain/recipes/recipeFactory.js'

const recipeList = document.createElement('ul')

const recipes = createRecipeFromData(getAll())

recipes.map((recipe) => {
  const recipeListItem = document.createElement('li')
  recipeListItem.textContent = recipe.name
  recipeList.appendChild(recipeListItem)
})

document.querySelector('#app').appendChild(Header())
document.querySelector('#app').appendChild(Searchbar())
document.querySelector('#app').appendChild(recipeList)
