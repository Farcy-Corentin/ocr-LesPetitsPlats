import Filter from './Filter.js'
import { getAll } from '../../domain/ingredients/repositories/IngredientRepository.js'
const FilterList = (filters) => {
  const filterContainer = document.createElement('div')
  filterContainer.classList.add('container')

  const row = document.createElement('div')
  row.classList.add('row')

  filters.map((filter) => {
    let children = {}
    if (filter.name === 'ingredient') {
      children = getAll()
    }

    if (filter.name === 'appliance') {
      children = [
        {
          name: 'appliance1',
        },
        { name: 'appliance2' },
      ]
    }

    if (filter.name === 'ustencils') {
      children = [
        {
          name: 'ustencil1',
        },
        { name: 'ustencil2' },
      ]
    }

    row.appendChild(Filter(filter, children))
  })

  filterContainer.appendChild(row)

  return filterContainer
}

export default FilterList
