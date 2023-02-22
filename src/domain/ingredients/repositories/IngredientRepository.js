import Ingredient from '../entities/Ingredient.js'
import {
  searchByIngredient,
  searchWithQuery,
  getAll as getAllRecipes,
  searchByAppliance,
  searchByUstensil,
} from '../../recipes/repositories/RecipeRepository.js'
import createRecipeFromData from '../../recipes/factories/RecipeFactory.js'

const createUniqueIngredientList = (recipes, ingredientParam) => {
  ingredientParam = ingredientParam.split(',')

  const ingredients = Array.from(
    new Set(
      recipes.flatMap((recipe) =>
        recipe.ingredients.map(({ name }) => name.toLowerCase())
      )
    )
  )

  ingredientParam.map((ingredient) => {
    const index = ingredients.indexOf(ingredient)
    if (index !== -1) {
      return ingredients.splice(index, 1)
    }
    return ingredient
  })

  return ingredients
}

export const searchIngredientByName = (ingredientName) => {
  const urlParams = new URLSearchParams(window.location.search)
  let recipes = getAllRecipes()

  const searchParam = urlParams.get('search') ?? ''
  const ingredientParam = urlParams.get('ingredients') ?? ''
  const applianceParam = urlParams.get('appliances') ?? ''
  const ustensilParam = urlParams.get('ustensils') ?? ''

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

  const uniqueIngredients = createUniqueIngredientList(recipes, ingredientParam)

  return uniqueIngredients
    .map((ingredient) => ingredient)
    .filter(
      (ingredient) =>
        ingredient
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(ingredientName.toLowerCase()) ||
        ingredient.includes(ingredientName.toLowerCase())
    )
    .map((name) => Ingredient(name.toLowerCase()))
}
