const checkUnit = (ingredient) => {
  if (!ingredient.quantity) {
    return
  }

  if (!ingredient.unit) {
    return `${ingredient.quantity}`
  }

  if (ingredient.unit === 'grammes') {
    return `${ingredient.quantity}g`
  }

  if (ingredient.unit === 'cl' || ingredient.unit === 'ml') {
    return `${ingredient.quantity}${ingredient.unit}`
  }

  return `${ingredient.quantity} ${ingredient.unit}`
}

const createIngredient = (ingredient) => {
  return {
    name: ingredient.ingredient,
    quantity: checkUnit(ingredient),
    recipes: recipesByIngredient(),
  }
}

export default createIngredient
