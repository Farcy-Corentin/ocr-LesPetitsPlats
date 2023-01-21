import { recipes } from '../../../data/recipes.js'

export const getAll = () => recipes

export const searchWithQuery = (searchQuery) => {
  const searchWords = searchQuery.toLowerCase().split(' ')

  const filteredRecipes = []

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i]

    const recipeText = recipe.name + ' ' + recipe.description
    let ingredientsText = ''

    for (let j = 0; j < recipe.ingredients.length; j += 1) {
      ingredientsText += recipe.ingredients[j].ingredient
    }

    const recipeLower = (
      recipeText +
      ' ' +
      ingredientsText +
      ' ' +
      recipe.ustensils.join(' ') +
      ' '
    )
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()

    let matchCount = 0

    for (let j = 0; j < searchWords.length; j++) {
      const searchWord = searchWords[j]

      const recipeWords = recipeLower.split(' ')
      for (let k = 0; k < recipeWords.length; k++) {
        const recipeWord = recipeWords[k]

        if (recipeWord.startsWith(searchWord)) {
          matchCount++
          break
        }
      }
    }

    if (matchCount === searchWords.length) {
      filteredRecipes.push(recipe)
    }
  }

  return filteredRecipes
}

export const searchByIngredient = (ingredients) => {
  const ingredientsSearch = ingredients.toLowerCase().split(' ')
  const filteredRecipes = []

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i]

    let ingredientsText = ''

    for (let j = 0; j < recipe.ingredients.length; j += 1) {
      ingredientsText += recipe.ingredients[j].ingredient + ' '
    }

    const ingredientLower = ingredientsText
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()

    let matchCount = 0

    for (let j = 0; j < ingredientsSearch.length; j++) {
      const ingredientSearch = ingredientsSearch[j]

      const ingredientsWords = ingredientLower.split(' ')
      for (let k = 0; k < ingredientsWords.length; k++) {
        const ingredientsWord = ingredientsWords[k]

        if (ingredientsWord.startsWith(ingredientSearch)) {
          matchCount++
          break
        }
      }
    }

    if (matchCount === ingredientsSearch.length) {
      filteredRecipes.push(recipe)
    }
  }

  return filteredRecipes
}
