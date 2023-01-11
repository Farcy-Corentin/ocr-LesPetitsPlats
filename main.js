import Header from './src/views/components/Header.js'
import Searchbar from './src/views/components/Searchbar.js'
import RecipeList from './src/views/components/RecipeList.js'

document.querySelector('#app').appendChild(Header())
document.querySelector('#app').appendChild(Searchbar())
document.querySelector('#app').appendChild(RecipeList())
