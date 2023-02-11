import Tag from './Tag.js'
import RecipeList from './RecipeList.js'

const TagsList = () => {
  const url = new URL(window.location)
  const urlParam = new URLSearchParams(url.search)

  const tags = []

  if (urlParam.has('ingredients') && urlParam.get('ingredients') !== '') {
    const ingredientsParam = urlParam.get('ingredients').split(',')
    for (let i = 0; i < ingredientsParam.length; i += 1) {
      tags.push({
        type: 'ingredients',
        color: 'bg-primary',
        children: ingredientsParam[i],
      })
    }
  }

  if (urlParam.has('appliances') && urlParam.get('appliances') !== '') {
    const appliancesParam = urlParam.get('appliances').split(',')
    for (let i = 0; i < appliancesParam.length; i += 1) {
      tags.push({
        type: 'appliances',
        color: 'bg-success',
        children: appliancesParam[i],
      })
    }
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

    newUrlParam.set('search', urlParam.get('search'))

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

  for (let i = 0; i < tags.length; i += 1) {
    const tag = tags[i]
    tagsList.appendChild(Tag(tag, onRemove))
  }

  return tagsContainer
}

export default TagsList
