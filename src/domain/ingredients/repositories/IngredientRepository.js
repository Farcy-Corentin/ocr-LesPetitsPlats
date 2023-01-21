import { recipes } from '../../../data/recipes.js'
import Ingredient from '../entities/Ingredient.js'
import { searchWithQuery } from '../../recipes/repositories/RecipeRepository.js'

function createUniqueIngredientList() {
  const uniqueIngredients = {}
  const urlParams = new URLSearchParams(window.location.search)

  if (urlParams.get('search')) {
    const searchString = urlParams.get('search')
    const searchRecipes = searchWithQuery(searchString)

    for (let i = 0; i < searchRecipes.length; i++) {
      const recipe = searchRecipes[i]

      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j].ingredient.toLowerCase()

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

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i]

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient.toLowerCase()

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
  const urlParams = new URLSearchParams(window.location.search)
  const uniqueIngredients = createUniqueIngredientList(recipes)

  let filteredUniqueIngredients = []
  if (urlParams.get('search')) {
    const searchString = urlParams.get('search').toLowerCase().split(' ')
    for (let i = 0; i < uniqueIngredients.length; i += 1) {
      let match = false
      for (let j = 0; j < searchString.length; j += 1) {
        if (uniqueIngredients[i] !== searchString[j]) {
          match = true
          break
        }
      }
      if (match) {
        filteredUniqueIngredients.push(Ingredient(uniqueIngredients[i]))
      }
    }
    return filteredUniqueIngredients
  }

  for (let i = 0; i < uniqueIngredients.length; i += 1) {
    filteredUniqueIngredients.push(Ingredient(uniqueIngredients[i]))
  }
  return filteredUniqueIngredients
}

export const searchIngredientByName = (name) => {
  const uniqueIngredients = createUniqueIngredientList(recipes)
  let filteredUniqueIngredients = []

  const searchString = name.toLowerCase().split(' ')

  for (let i = 0; i < uniqueIngredients.length; i += 1) {
    let match = false
    for (let j = 0; j < searchString.length; j += 1) {
      if (
        uniqueIngredients[i].includes(searchString[j]) ||
        uniqueIngredients[i]
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(searchString[j])
      ) {
        match = true
        break
      }
    }
    if (match) {
      filteredUniqueIngredients.push(Ingredient(uniqueIngredients[i]))
    }
  }
  return filteredUniqueIngredients
}
