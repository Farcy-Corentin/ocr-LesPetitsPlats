import { recipes as recipesData } from '../../../data/recipes.js'

export const getAll = () => recipesData

const containsAllSearchWords = (recipe, searchWords) => {
  return searchWords.every((searchWord) => {
    return recipe.split(' ').some((recipeWord) => {
      return (
        recipeWord === searchWord ||
        recipeWord.normalize('NFD').replace(/[\u0300-\u036f]/g, '') ===
          searchWord
      )
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

  return ingredients
    .map((ingredient) => ingredient.toLowerCase().split(' '))
    .flatMap((ingredientsSearch) => {
      return recipes.filter((recipe) => {
        const ingredientsText = recipe.ingredients
          .map((ingredient) => ingredient.ingredient)
          .join(' ')
        const ingredientLower = ingredientsText.toLowerCase()

        return containsAllSearchWords(ingredientLower, ingredientsSearch)
      })
    })
}

export const searchByAppliance = (appliances, recipes) => {
  appliances = [appliances.replace('+', ' ').replaceAll(',', ' ')]

  return appliances
    .map((appliance) => appliance.toLowerCase().split(' '))
    .flatMap((appliancesSearch) => {
      return recipes.filter((recipe) => {
        const appliancesText = recipe.appliance
        const applianceLower = appliancesText.toLowerCase()

        return containsAllSearchWords(applianceLower, appliancesSearch)
      })
    })
}

export const searchByUstensil = (ustensils, recipes) => {
  ustensils = [ustensils.replace('+', ' ').replaceAll(',', ' ')]

  return ustensils
    .map((ustensils) => ustensils.toLowerCase().split(' '))
    .flatMap((ustensilsSearch) => {
      return recipes.filter((recipe) => {
        const ustensilsText = recipe.ustensils
          .map((ustensil) => ustensil)
          .join(' ')
        const ingredientLower = ustensilsText.toLowerCase()

        return containsAllSearchWords(ingredientLower, ustensilsSearch)
      })
    })
}
