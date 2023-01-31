import { recipes } from '../../../data/recipes.js'
import Ingredient from '../entities/Ingredient.js'
import {
  searchByIngredient,
  searchWithQuery,
  getAll as getAllRecipes,
} from '../../recipes/repositories/RecipeRepository.js'
import createRecipeFromData from '../../recipes/factories/RecipeFactory.js'

function createUniqueIngredientList() {
  const uniqueIngredients = {}
  const urlParams = new URLSearchParams(window.location.search)
  const searchParam = urlParams.get('search')
  const ingredientParam = urlParams.get('ingredient')
  let search = searchParam || ingredientParam || ''

  if (searchParam && ingredientParam) {
    search += ' ' + ingredientParam.toLowerCase().replace(',', ' ')
  }

  const recipes = createRecipeFromData(
    searchParam
      ? searchWithQuery(search)
      : searchParam && ingredientParam
      ? searchWithQuery(search)
      : ingredientParam
      ? searchByIngredient(search)
      : getAllRecipes()
  )

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i]

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].name.toLowerCase()

      if (!uniqueIngredients[ingredient]) {
        uniqueIngredients[ingredient] = ingredient
      }
    }
  }

  const uniqueIngredientList = []
  for (const key in uniqueIngredients) {
    uniqueIngredientList.push(uniqueIngredients[key])
  }

  return uniqueIngredientList
}
export const getAll = () => {
  const uniqueIngredients = {}

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i]

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient

      if (!uniqueIngredients[ingredient]) {
        uniqueIngredients[ingredient] = ingredient
      }
    }
  }

  const uniqueIngredientList = []
  for (const key in uniqueIngredients) {
    uniqueIngredientList.push(uniqueIngredients[key])
  }

  return uniqueIngredientList
}

export const searchIngredientByName = (ingredientName) => {
  let filteredIngredients = []
  const uniqueIngredients = createUniqueIngredientList(recipes)
  for (let i = 0; i < uniqueIngredients.length; i += 1) {
    if (
      uniqueIngredients[i]
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(ingredientName.toLowerCase()) ||
      uniqueIngredients[i].toLowerCase().includes(ingredientName.toLowerCase())
    ) {
      filteredIngredients.push(Ingredient(uniqueIngredients[i]))
    }
  }
  return filteredIngredients
}
