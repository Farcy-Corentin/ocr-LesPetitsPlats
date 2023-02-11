import Filter from './Filter.js'

const FilterList = (filters) => {
  const filterContainer = document.createElement('div')
  filterContainer.classList.add('container')

  const row = document.createElement('div')
  row.classList.add('row')

  filters.map((filter) => row.appendChild(Filter(filter)))

  filterContainer.appendChild(row)

  return filterContainer
}

export default FilterList
