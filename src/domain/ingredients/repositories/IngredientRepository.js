import { recipes } from '../../../data/recipes.js'
import Ingredient from '../entities/Ingredient.js'
import {
  searchByIngredient,
  searchWithQuery,
  getAll as getAllRecipes,
  searchByAppliance,
} from '../../recipes/repositories/RecipeRepository.js'
import createRecipeFromData from '../../recipes/factories/RecipeFactory.js'

const createUniqueIngredientList = (recipes, ingredientParam) => {
  const uniqueIngredients = {}
  ingredientParam = ingredientParam.split(',')

  for (let i = 0; i < recipes.length; i += 1) {
    const recipe = recipes[i]

    for (let j = 0; j < recipe.ingredients.length; j += 1) {
      const ingredient = recipe.ingredients[j].name.toLowerCase()

      if (!uniqueIngredients[ingredient]) {
        uniqueIngredients[ingredient] = ingredient
      }
    }
  }

  const uniqueIngredientList = []
  for (const key in uniqueIngredients) {
    if (!ingredientParam.includes(key.toLowerCase())) {
      uniqueIngredientList.push(uniqueIngredients[key])
    }
  }

  return uniqueIngredientList
}

export const getAll = () => {
  const uniqueIngredients = {}

  for (let i = 0; i < recipes.length; i += 1) {
    const recipe = recipes[i]

    for (let j = 0; j < recipe.ingredients.length; j += 1) {
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
  const urlParams = new URLSearchParams(window.location.search)
  let recipes = getAllRecipes()

  const searchParam = urlParams.get('search') ?? ''
  const ingredientParam = urlParams.get('ingredients') ?? ''
  const applianceParam = urlParams.get('appliances') ?? ''

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
  }

  recipes = createRecipeFromData(recipes)

  const filteredIngredients = []
  const uniqueIngredients = createUniqueIngredientList(recipes, ingredientParam)

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
