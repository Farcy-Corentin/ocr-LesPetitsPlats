const RecipeCard = (recipe) => {
  const cardContainer = document.createElement('div')
  cardContainer.classList.add('col')

  const card = document.createElement('div')
  card.classList.add('card', 'h-100')

  const recipeThumbnail = document.createElement('div')
  recipeThumbnail.style.height = '12rem'
  recipeThumbnail.style.background = '#c7bebe'
  recipeThumbnail.style.borderRadius = '0.5rem 0.5rem 0 0'
  recipeThumbnail.classList.add('card-img-top')

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')

  const cardHeader = document.createElement('header')
  cardHeader.classList.add('row', 'card-header')

  const title = document.createElement('h2')
  title.classList.add('col-7', 'card-title')
  title.textContent = recipe.name

  const timeWrapper = document.createElement('span')
  timeWrapper.classList.add('col-5', 'd-flex', 'justify-content-end', 'timing')

  const time = document.createElement('p')
  time.textContent = recipe.time

  const timingIcon = document.createElement('i')
  timingIcon.classList.add('fa-regular', 'fa-clock', 'me-2')
  timingIcon.ariaLabel = 'Recipe timing icon'

  timeWrapper.appendChild(timingIcon)
  timeWrapper.appendChild(time)

  cardHeader.appendChild(title)
  cardHeader.appendChild(timeWrapper)

  const cardContent = document.createElement('div')
  cardContent.classList.add('row', 'card-infos')

  const ingredientsList = document.createElement('ul')
  ingredientsList.classList.add('col-6', 'list-unstyled')

  recipe.ingredients.map((ingredient) => {
    const ingredientItem = document.createElement('li')

    const ingredientName = document.createElement('strong')
    ingredientName.textContent =
      ingredient.quantity !== undefined
        ? `${ingredient.name}: `
        : `${ingredient.name}`

    const ingredientQuantity =
      ingredient.quantity !== undefined ? `${ingredient.quantity}` : ''

    ingredientItem.append(ingredientName, ingredientQuantity)

    ingredientsList.appendChild(ingredientItem)
  })

  const description = document.createElement('div')
  description.classList.add('col-6', 'description')
  description.textContent = recipe.instructions

  cardContent.appendChild(ingredientsList)
  cardContent.appendChild(description)

  cardBody.appendChild(cardHeader)
  cardBody.appendChild(cardContent)

  card.appendChild(recipeThumbnail)
  card.appendChild(cardBody)

  cardContainer.appendChild(card)

  return cardContainer
}

export default RecipeCard
