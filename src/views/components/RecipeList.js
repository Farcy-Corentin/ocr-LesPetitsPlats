import { getAll } from '../../domain/recipes/RecipeRepository.js'
import createRecipeFromData from '../../domain/recipes/recipeFactory.js'
import RecipeCard from './RecipeCard.js'

const RecipeList = () => {
  const recipes = createRecipeFromData(getAll())

  const recipesContainer = document.createElement('div')
  recipesContainer.classList.add('container')

  const recipesList = document.createElement('section')
  recipesList.classList.add(
    'row',
    'row-cols-1',
    'row-cols-md-2',
    'row-cols-lg-2',
    'row-cols-xl-3',
    'g-4',
    'my-4'
  )

  recipes.map((recipe) => {
    recipesList.appendChild(RecipeCard(recipe))
  })

  recipesContainer.appendChild(recipesList)

  return recipesContainer
}

export default RecipeList
