import Tag from './Tag.js'
import ingredient from '../../domain/ingredients/entities/Ingredient.js'
import RecipeList from "./RecipeList.js";
import {searchByIngredient} from "../../domain/recipes/repositories/RecipeRepository.js";

const TagsList = () => {
  const url = new URL(window.location)
  const urlSearchParams = new URLSearchParams(window.location.search)
  const searchQueryParam = urlSearchParams.get('search') ? `?search=${urlSearchParams.get('search')}` : ''
  
  const tags = []

  if (urlSearchParams.get('ingredient')) {
    const tagsIngredientParam = urlSearchParams.get('ingredient').split(',')

    for (let i = 0; i < tagsIngredientParam.length; i += 1) {
      tags.push(
        {
          type: 'ingredient',
          color: 'bg-primary',
          children: tagsIngredientParam[i]
        }
      )
    }
  }

  const tagsContainer = document.createElement('div')
  tagsContainer.classList.add('container', 'mb-3', 'tag-container')

  const tagsList = document.createElement('div')
  tagsList.classList.add('d-flex', 'gap-3', 'flex-wrap')

  tagsContainer.appendChild(tagsList)

  const onRemove = (tag) => {
    const index = tags.indexOf(tag)
    tags.splice(index, 1)
    
    const tagsParam = []
    
    for (let i = 0; i < tags.length; i += 1) {
      tagsParam.push(tags[i].children)
    }

    urlSearchParams.set('ingredient', tagsParam.toString())
    
    const newUrl = new URL(`${url.origin}${searchQueryParam
      ? searchQueryParam
      : ''}${urlSearchParams.has('ingredient') && searchQueryParam
      ? `&ingredient=${urlSearchParams.get('ingredient').replaceAll(' ', '+')}`
      : `?ingredient=${urlSearchParams.get('ingredient').replaceAll(' ', '+')}`}`)
    
    window.history.pushState({},
      '',newUrl)
    document
      .querySelector('.recipes-section')
      .replaceWith(
        RecipeList(searchByIngredient(urlSearchParams.get('ingredient')))
      )
  }

  for (let i = 0; i < tags.length; i += 1) {
    const tag = tags[i]
    tagsList.appendChild(Tag(tag, onRemove))
  }

  return tagsContainer
}

export default TagsList
