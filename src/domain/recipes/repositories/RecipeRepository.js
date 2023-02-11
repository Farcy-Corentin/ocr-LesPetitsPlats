import { recipes, recipes as recipesData } from '../../../data/recipes.js'

const GLOBALSEARCHCOST = 1
const FILTERCOST = 0.5
export const getAll = () => recipesData

const containsAllSearchWords = (recipe, searchWords, cost) => {
  for (let i = 0; i < searchWords.length; i += 1) {
    let found = false
    const recipeWords = recipe.split(' ')

    for (let j = 0; j < recipeWords.length; j += 1) {
      const distance = levenshteinDistance(recipeWords[j], searchWords[i])

      if (distance <= cost) {
        found = true
        break
      }
    }
    if (!found) {
      return false
    }
  }
  return true
}

const levenshteinDistance = (recipe, searchWord) => {
  if (!recipe.length) return searchWord.length
  if (!searchWord.length) return recipe.length

  const matrix = []
  for (let i = 0; i <= searchWord.length; i += 1) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= recipe.length; j += 1) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= searchWord.length; i += 1) {
    for (let j = 1; j <= recipe.length; j += 1) {
      if (searchWord.charAt(i - 1) === recipe.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // modification
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ) // suppression
      }
    }
  }

  return matrix[searchWord.length][recipe.length]
}

export const searchWithQuery = (searchQuery, recipes) => {
  const searchWords = searchQuery.toLowerCase().split(' ')

  const filteredRecipes = []

  for (let i = 0; i < recipes.length; i += 1) {
    const recipe = recipes[i]

    const recipeText = recipe.name + ' ' + recipe.description
    let ingredientsText = ''

    for (let j = 0; j < recipe.ingredients.length; j += 1) {
      ingredientsText += recipe.ingredients[j].ingredient + ' '
    }

    const recipeLower = (
      recipeText +
      ' ' +
      ingredientsText +
      ' ' +
      recipe.ustensils.join(' ') +
      ' '
    ).toLowerCase()

    if (containsAllSearchWords(recipeLower, searchWords, GLOBALSEARCHCOST)) {
      filteredRecipes.push(recipe)
    }
  }

  return filteredRecipes
}

export const searchByIngredient = (ingredients, recipes) => {
  ingredients = [ingredients.replace('+', ' ').replaceAll(',', ' ')]

  const filteredRecipes = []

  for (let i = 0; i < ingredients.length; i += 1) {
    const ingredientsSearch = ingredients[i].toLowerCase().split(' ')

    for (let j = 0; j < recipes.length; j += 1) {
      const recipe = recipes[j]

      let ingredientsText = ''

      for (let j = 0; j < recipe.ingredients.length; j += 1) {
        ingredientsText += recipe.ingredients[j].ingredient + ' '
      }

      const ingredientLower = ingredientsText.toLowerCase()

      if (
        containsAllSearchWords(ingredientLower, ingredientsSearch, FILTERCOST)
      ) {
        filteredRecipes.push(recipe)
      }
    }
  }

  return filteredRecipes
}

export const searchByAppliance = (appliances, recipes) => {
  appliances = [appliances.replace('+', ' ').replaceAll(',', ' ')]

  const filteredRecipes = []

  for (let i = 0; i < appliances.length; i += 1) {
    const appliancesSearch = appliances[i].toLowerCase().split(' ')

    for (let j = 0; j < recipes.length; j += 1) {
      const recipe = recipes[j]

      let appliancesText = ''

      appliancesText += recipe.appliance + ' '

      const applianceLower = appliancesText.toLowerCase()

      if (
        containsAllSearchWords(applianceLower, appliancesSearch, FILTERCOST)
      ) {
        filteredRecipes.push(recipe)
      }
    }
  }

  return filteredRecipes
}

export const searchByUstensil = (ustensils, recipes) => {
  ustensils = [ustensils.replace('+', ' ').replaceAll(',', ' ')]

  const filteredRecipes = []

  for (let i = 0; i < ustensils.length; i += 1) {
    const ustensilsSearch = ustensils[i].toLowerCase().split(' ')

    for (let j = 0; j < recipes.length; j += 1) {
      const recipe = recipes[j]

      let ustensilsText = ''

      for (let j = 0; j < recipe.ustensils.length; j += 1) {
        ustensilsText += recipe.ustensils[j] + ' '
      }

      const ingredientLower = ustensilsText.toLowerCase()

      if (
        containsAllSearchWords(ingredientLower, ustensilsSearch, FILTERCOST)
      ) {
        filteredRecipes.push(recipe)
      }
    }
  }

  return filteredRecipes
}
