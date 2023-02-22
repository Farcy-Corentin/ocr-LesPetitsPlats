import {
  getAll as getAllRecipes,
  searchByAppliance,
  searchByIngredient,
  searchByUstensil,
  searchWithQuery,
} from '../../recipes/repositories/RecipeRepository.js'
import Appliance from '../entities/Appliance.js'

const createUniqueApplianceList = (recipes, applianceParam) => {
  applianceParam = applianceParam.split(',')

  const appliances = Array.from(
    new Set(recipes.map((recipe) => recipe.appliance.toLowerCase()))
  )

  applianceParam.map((appliance) => {
    const index = appliances.indexOf(appliance)
    if (index !== -1) {
      return appliances.splice(index, 1)
    }

    return appliance
  })

  return appliances
}

export const searchApplianceByName = (applianceName) => {
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

  const uniqueAppliance = createUniqueApplianceList(recipes, applianceParam)

  return uniqueAppliance
    .filter(
      (appliance) =>
        appliance
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(applianceName.toLowerCase()) ||
        appliance.includes(applianceName.toLowerCase())
    )
    .map((name) => Appliance(name.toLowerCase()))
}
