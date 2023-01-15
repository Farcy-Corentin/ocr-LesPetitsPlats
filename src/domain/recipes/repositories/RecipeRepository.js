import { recipes } from '../../../data/recipes.js'

export const getAll = () => recipes

export const searchAll = (search) => {
  const searchWords = search.toLowerCase().split(' ')

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
