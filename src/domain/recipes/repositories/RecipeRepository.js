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
  if (!ingredients) {
    return getAll()
  }

  const searchIngredients = ingredients.toLowerCase().split(',')

  return recipes.filter((recipe) => {
    const recipeIngredients = recipe.ingredients.map(({ ingredient }) =>
      ingredient.toLowerCase()
    )

    return searchIngredients.every((searchIngredient) =>
      recipeIngredients.includes(searchIngredient)
    )
  })
}

export const searchByAppliance = (appliances, recipes) => {
  if (!appliances) {
    return getAll()
  }

  const searchAppliances = appliances.toLowerCase().split(',')

  return recipes.filter((recipe) => {
    const recipeAppliance = recipe.appliance.toLowerCase()

    return searchAppliances.every((searchAppliance) =>
      recipeAppliance.includes(searchAppliance)
    )
  })
}

export const searchByUstensil = (ustensils, recipes) => {
  if (!ustensils) {
    return getAll()
  }

  const searchUstensils = ustensils.toLowerCase().split(',')

  return recipes.filter((recipe) => {
    const recipeUstensils = recipe.ustensils.map((ustensil) =>
      ustensil.toLowerCase()
    )

    return searchUstensils.every((searchUstensil) =>
      recipeUstensils.includes(searchUstensil)
    )
  })
}
