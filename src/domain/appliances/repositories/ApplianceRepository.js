import {
  getAll as getAllRecipes,
  searchByAppliance,
  searchByIngredient,
  searchWithQuery,
} from '../../recipes/repositories/RecipeRepository.js'
import Appliance from '../entities/Appliance.js'
import Recipe from '../entities/Recipe.js'

const createUniqueApplianceList = (recipes, applianceParam) => {
  const uniqueAppliance = {}

  for (let i = 0; i < recipes.length; i += 1) {
    const recipe = Recipe(recipes[i].appliance)

    const appliance = recipe.appliance.toLowerCase()

    if (!uniqueAppliance[appliance]) {
      uniqueAppliance[appliance] = appliance
    }
  }

  const uniqueIngredientList = []
  for (const key in uniqueAppliance) {
    if (!applianceParam.includes(key.toLowerCase())) {
      uniqueIngredientList.push(uniqueAppliance[key])
    }
  }

  return uniqueIngredientList
}

export const searchApplianceByName = (applianceName) => {
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

  const filteredAppliance = []
  const uniqueAppliance = createUniqueApplianceList(recipes, applianceParam)

  for (let i = 0; i < uniqueAppliance.length; i += 1) {
    if (
      uniqueAppliance[i]
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(applianceName.toLowerCase()) ||
      uniqueAppliance[i].toLowerCase().includes(applianceName.toLowerCase())
    ) {
      filteredAppliance.push(Appliance(uniqueAppliance[i]))
    }
  }

  return filteredAppliance
}
