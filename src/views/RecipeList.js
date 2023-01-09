import { getAll } from '../domain/recipes/RecipeRepository.js'
import createRecipeFromData from '../domain/recipes/recipeFactory.js'

const RecipeList = () => {
  const recipes = createRecipeFromData(getAll())

  const recipesEl = document.createElement('div')
  recipesEl.classList.add('container')

  const recipesList = document.createElement('section')
  recipesList.classList.add(
    'row',
    'row-cols-1',
    'row-cols-md-2',
    'row-cols-lg-3',
    'g-4',
    'my-4'
  )
  recipes.map((recipe) => {
    const recipeWrapper = document.createElement('div')
    recipeWrapper.classList.add('m-2', 'p-2')
    const title = document.createElement('h1')
    title.textContent = recipe.name

    recipeWrapper.appendChild(title)
    recipesList.appendChild(recipeWrapper)
  })

  recipesEl.appendChild(recipesList)

  return recipesEl
}

export default RecipeList
