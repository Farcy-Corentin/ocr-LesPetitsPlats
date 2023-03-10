import {
  getAll,
  searchByAppliance,
  searchByIngredient,
  searchByUstensil,
  searchWithQuery,
} from '../../domain/recipes/repositories/RecipeRepository.js'
import createRecipeFromData from '../../domain/recipes/factories/RecipeFactory.js'
import RecipeCard from './RecipeCard.js'

const RecipeList = () => {
  const urlParams = new URLSearchParams(window.location.search)
  let recipes = getAll()

  const searchParam = urlParams.get('search')
  const ingredientParam = urlParams.get('ingredients')
  const applianceParam = urlParams.get('appliances')
  const ustensilParam = urlParams.get('ustensils')

  for (const key of urlParams.keys()) {
    if (key === 'search') {
      recipes = searchWithQuery(searchParam, recipes)
    }
    if (key === 'ingredients') {
      recipes = searchByIngredient(ingredientParam, recipes)
    }
    if (key === 'appliances') {
      recipes = searchByAppliance(applianceParam, recipes)
    }
    if (key === 'ustensils') {
      recipes = searchByUstensil(ustensilParam, recipes)
    }
  }

  recipes = createRecipeFromData(recipes)

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

  recipes.map((recipe) => {
    return recipesList.appendChild(RecipeCard(recipe))
  })

  recipesContainer.appendChild(recipesList)

  return recipesContainer
}

export default RecipeList
