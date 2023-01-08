const Header = () => {
  const headerContainer = document.createElement('div')
  headerContainer.classList.add(
    'container',
    'd-flex',
    'justify-content-center',
    'mt-5',
    'mb-4'
  )

  const logo = document.createElement('img')
  logo.classList.add('logo')
  logo.alt = 'Logo les petits plats - Homepage'
  logo.src = '../images/logo/logo.png'

  headerContainer.appendChild(logo)

  return headerContainer
}

export default Header
