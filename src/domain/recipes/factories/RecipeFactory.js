import Recipe from '../entities/Recipe.js'
import createIngredient from './IngredientFactory.js'

const time = (time) => `${time} min`
const createRecipeFromData = (data) => {
  let recipe = []
  for (let i = 0; i < data.length; i += 1) {
    recipe[i] = Recipe(
      data[i].id,
      data[i].name,
      data[i].ingredients.map((ingredient) => createIngredient(ingredient)),
      time(data[i].time),
      data[i].description
    )
  }

  return recipe
}

export default createRecipeFromData
