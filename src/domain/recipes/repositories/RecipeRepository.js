import { recipes } from '../../../data/recipes.js'

export const getAll = () => recipes

const containsAllSearchWords = (recipe, searchWords) => {
  for (let i = 0; i < searchWords.length; i += 1) {
    if (!recipe.split(' ').includes(searchWords[i])) {
      return false
    }
  }
  return true
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
  ingredients = [ingredients.replace(',', ' ')]

  console.log(ingredients)
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

      let matchCount = 0

      for (let k = 0; k < ingredientsSearch.length; k += 1) {
        const ingredientSearch = ingredientsSearch[k]

        const ingredientsWords = ingredientLower.split(' ')
        for (let l = 0; l < ingredientsWords.length; l += 1) {
          const ingredientsWord = ingredientsWords[l]

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
  }

  return filteredRecipes
}
