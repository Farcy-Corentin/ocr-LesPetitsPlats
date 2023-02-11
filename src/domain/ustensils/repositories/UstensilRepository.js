import {
  searchByIngredient,
  searchWithQuery,
  getAll as getAllRecipes,
  searchByAppliance,
  searchByUstensil,
} from '../../recipes/repositories/RecipeRepository.js'
import Ustensil from '../entities/Ustensil.js'
import Recipe from '../entities/Recipe.js'

const createUniqueUstensilList = (recipes, ustensilParam) => {
  const uniqueUstensil = {}

  for (let i = 0; i < recipes.length; i += 1) {
    const recipe = Recipe(recipes[i].ustensils)

    for (const recipeUstensil of recipe.ustencil) {
      const ustensil = recipeUstensil.toLowerCase()

      if (!uniqueUstensil[ustensil]) {
        uniqueUstensil[ustensil] = ustensil
      }
    }
  }

  const uniqueUstensilList = []
  for (const key in uniqueUstensil) {
    if (!ustensilParam.includes(key.toLowerCase())) {
      uniqueUstensilList.push(uniqueUstensil[key])
    }
  }

  return uniqueUstensilList
}

export const searchUstensilByName = (ustensilName) => {
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

  const filteredUstencil = []
  const uniqueUstencil = createUniqueUstensilList(recipes, ustensilParam)

  for (let i = 0; i < uniqueUstencil.length; i += 1) {
    if (
      uniqueUstencil[i]
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(ustensilName.toLowerCase()) ||
      uniqueUstencil[i].toLowerCase().includes(ustensilName.toLowerCase())
    ) {
      filteredUstencil.push(Ustensil(uniqueUstencil[i]))
    }
  }

  return filteredUstencil
}
