import Tag from './Tag.js'
import RecipeList from './RecipeList.js'

const TagsList = () => {
  const url = new URL(window.location)
  const urlParam = new URLSearchParams(url.search)

  let tags = []

  if (urlParam.has('ingredients') && urlParam.get('ingredients') !== '') {
    const ingredientsParam = urlParam.get('ingredients').split(',')
    ingredientsParam.map((ingredient) =>
      tags.push({
        type: 'ingredients',
        color: 'bg-primary',
        children: ingredient,
      })
    )
  }

  if (urlParam.has('appliances') && urlParam.get('appliances') !== '') {
    const appliancesParam = urlParam.get('appliances').split(',')
    appliancesParam.map((appliance) =>
      tags.push({
        type: 'appliances',
        color: 'bg-success',
        children: appliance,
      })
    )
  }

  if (urlParam.has('ustensils') && urlParam.get('ustensils') !== '') {
    const ustensilsParam = urlParam.get('ustensils').split(',')
    ustensilsParam.map((ustensil) =>
      tags.push({
        type: 'ustensils',
        color: 'bg-danger',
        children: ustensil,
      })
    )
  }

  const tagsContainer = document.createElement('div')
  tagsContainer.classList.add('container', 'mb-3', 'tag-container')

  const tagsList = document.createElement('div')
  tagsList.classList.add('d-flex', 'gap-3', 'flex-wrap')

  tagsContainer.appendChild(tagsList)

  function urlSearchParamsFromTags(tags) {
    const urlTags = {}

    for (const tag of tags) {
      urlTags[tag.type] = urlTags[tag.type] ?? []
      urlTags[tag.type].push(tag.children)
    }

    const newUrlParam = new URLSearchParams()

    if (urlParam.has('search')) {
      newUrlParam.set('search', urlParam.get('search'))
    }

    for (const type in urlTags) {
      newUrlParam.set(type, urlTags[type].join(','))
    }

    return newUrlParam
  }

  const update = () => {
    const newUrl = `${url.origin}${url.pathname}?${urlSearchParamsFromTags(tags)
      .toString()
      .replace(/%2C/g, ',')}`

    window.history.pushState({}, '', newUrl)
    document.querySelector('.recipes-section').replaceWith(RecipeList())
  }

  const onRemove = (tag) => {
    const index = tags.indexOf(tag)
    tags.splice(index, 1)

    update()
  }

  tagsContainer.resetTags = () => {
    tags = []
  }

  tags.map((tag) => tagsList.appendChild(Tag(tag, onRemove)))

  return tagsContainer
}

export default TagsList
