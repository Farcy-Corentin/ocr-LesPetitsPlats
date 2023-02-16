import { recipes as recipesData } from '../../../data/recipes.js'
export const getAll = () => recipesData

const containsAllSearchWords = (recipe, searchWords) => {
  return searchWords.every((searchWord) => {
    return recipe.split(' ').some((recipeWord) => {
      return recipeWord === searchWord
    })
  })
}

export const searchWithQuery = (searchQuery, recipes) => {
  const searchWords = searchQuery.toLowerCase().split(' ')

  return recipes.filter((recipe) => {
    const recipeText = recipe.name + ' ' + recipe.description
    const ingredientsText = recipe.ingredients
      .map((ingredient) => ingredient.ingredient)
      .join(' ')
    const recipeLower =
      `${recipeText} ${ingredientsText} ${recipe.ustensils.join(
        ' '
      )} `.toLowerCase()

    return containsAllSearchWords(recipeLower, searchWords)
  })
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
