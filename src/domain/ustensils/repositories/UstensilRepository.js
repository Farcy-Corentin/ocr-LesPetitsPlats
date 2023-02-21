import {
  searchByIngredient,
  searchWithQuery,
  getAll as getAllRecipes,
  searchByAppliance,
  searchByUstensil,
} from '../../recipes/repositories/RecipeRepository.js'
import Ustensil from '../entities/Ustensil.js'

const createUniqueUstensilList = (recipes, ustensilParam) => {
  ustensilParam = ustensilParam.split(',')

  const ustensils = Array.from(
    new Set(
      recipes.flatMap((recipe) =>
        recipe.ustensils.map((name) => name.toLowerCase())
      )
    )
  )

  ustensilParam.map((ustensil) => {
    const index = ustensils.indexOf(ustensil)
    return ustensils.splice(index, 1)
  })

  return ustensils
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

  const uniqueUstencil = createUniqueUstensilList(recipes, ustensilParam)

  return uniqueUstencil
    .map((ustensil) => ustensil)
    .filter(
      (ustensil) =>
        ustensil
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(ustensilName.toLowerCase()) ||
        ustensil.includes(ustensilName.toLowerCase())
    )
    .map((name) => Ustensil(name.toLowerCase()))
}
