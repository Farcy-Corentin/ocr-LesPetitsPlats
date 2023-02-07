import {recipes} from '../../../data/recipes.js'

const COST = 0.5
export const getAll = () => recipes

const containsAllSearchWords = (recipe, searchWords) => {
  for (let i = 0; i < searchWords.length; i += 1) {
    let found = false
    let recipeWords = recipe.split(' ')
    
    for (let j = 0; j < recipeWords.length; j += 1) {
      let distance = levenshteinDistance(recipeWords[j], searchWords[i])
      
      if (distance <= COST) {
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

  let matrix = []
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
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // modification
          Math.min(matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1)) // suppression
      }
    }
  }

  return matrix[searchWord.length][recipe.length]
}

export const searchWithQuery = (searchQuery) => {
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
    
    if (containsAllSearchWords(recipeLower, searchWords)) {
      filteredRecipes.push(recipe)
    }
  }

  return filteredRecipes
}

export const searchByIngredient = (ingredients) => {
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

      if (containsAllSearchWords(ingredientLower, ingredientsSearch)) {
        filteredRecipes.push(recipe)
      }
    }
  }

  return filteredRecipes
}
