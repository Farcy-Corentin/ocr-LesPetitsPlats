import Recipe from './Recipe'
import createIngredient from './IngredientFactory.js'

const time = (time) => `${time} min`
const createRecipeFromData = (data) =>
  data.map((recipe) =>
    Recipe(
      recipe.id,
      recipe.name,
      recipe.ingredients.map((ingredient) => createIngredient(ingredient)),
      time(recipe.time),
      recipe.description
    )
  )

export default createRecipeFromData
