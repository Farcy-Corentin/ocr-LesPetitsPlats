const Tag = (tag, onRemove) => {
  const tagWrapper = document.createElement('div')
  tagWrapper.classList.add('text-white', 'tag-wrapper', 'mb-2')
  
  const tagSpan = document.createElement('span')
  tagSpan.classList.add(`${tag.color}`, 'd-flex', 'justify-content-center', 'align-items-center',  'rounded')
  
  const description = document.createElement('p')
  description.classList.add('m-0')
  description.textContent = tag.children
  
  const tagCloseIcon = document.createElement('i')
  tagCloseIcon.classList.add('fa-regular', 'fa-circle-xmark', 'ms-2')
  
  tagCloseIcon.addEventListener('click', () => {
    !tag ? tagWrapper.parentNode.parentNode.removeChild(tagWrapper) : tagWrapper.parentNode.removeChild(tagWrapper)
    onRemove(tag)
  })
  
  tagSpan.appendChild(description)
  tagSpan.appendChild(tagCloseIcon)
  
  tagWrapper.appendChild(tagSpan)
  
  return tagWrapper
}

export default Tag
