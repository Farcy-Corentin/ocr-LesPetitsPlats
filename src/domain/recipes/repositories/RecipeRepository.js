import { recipes } from '../../../data/recipes.js'

export const getAll = () => recipes

export const searchAll = (search) => {
  const searchWords = search.toLowerCase().split(' ')

  const filteredRecipes = []

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i]

    const recipeText = recipe.name + ' ' + recipe.description
    let ingredientsText = ''
    recipe.ingredients.forEach((ingredient) => {
      ingredientsText += ingredient.ingredient + ' '
    })
    const recipeLower = (
      recipeText +
      ' ' +
      ingredientsText +
      ' ' +
      recipe.ustensils.join(' ') +
      ' '
    ).toLowerCase()

    for (let j = 0; j < searchWords.length; j++) {
      const searchWord = searchWords[j]

      if (recipeLower.includes(searchWord)) {
        filteredRecipes.push(recipe)
      }
    }
  }
  return filteredRecipes
}
