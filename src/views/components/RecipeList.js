import {
  getAll,
  searchWithQuery,
} from '../../domain/recipes/repositories/RecipeRepository.js'
import createRecipeFromData from '../../domain/recipes/factories/RecipeFactory.js'
import RecipeCard from './RecipeCard.js'

const RecipeList = () => {
  const urlParams = new URLSearchParams(window.location.search)

  const searchString = urlParams.get('search')

  const recipes = createRecipeFromData(
    searchString ? searchWithQuery(searchString) : getAll()
  )

  const recipesContainer = document.createElement('div')
  recipesContainer.classList.add('container', 'recipes-section')

  const recipesList = document.createElement('section')
  recipesList.classList.add(
    'row',
    'row-cols-1',
    'row-cols-md-2',
    'row-cols-lg-2',
    'row-cols-xl-3',
    'g-4',
    'my-4'
  )

  for (let i = 0; i < recipes.length; i += 1) {
    let recipe = []

    recipe = recipes[i]
    recipesList.appendChild(RecipeCard(recipe))
  }

  recipesContainer.appendChild(recipesList)

  return recipesContainer
}

export default RecipeList
