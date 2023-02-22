import Recipe from '../entities/Recipe.js'
import createIngredient from './IngredientFactory.js'

const recipeTime = (time) => `${time} min`

const createRecipeFromData = (data) => {
  return data.map(({ id, name, ingredients, time, description }) =>
    Recipe(
      id,
      name,
      ingredients.map((ingredient) => createIngredient(ingredient)),
      recipeTime(time),
      description
    )
  )
}

export default createRecipeFromData
