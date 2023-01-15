import { getAll, searchAll } from '../repositories/RecipeRepository.js'
import RecipeList from '../../../views/components/RecipeList.js'

export const searchRecipes = () => {
  const searchEl = document.querySelector('.search-input')

  const validatorHandlers = {
    atLeast: (input, min) => input.value.trim().length >= min,
  }

  const validators = {
    needThreeChars: createValidator(
      validatorHandlers.atLeast,
      [3],
      'Le champs {name} doit contenir 3 caractères minimum pour lancer la recherche!'
    ),
  }

  function createValidator(handler, params, error, stopOnFailure = false) {
    return { handler, params, error, stopOnFailure }
  }

  function createInputValidator(name, input, validators) {
    return { name, input, validators }
  }

  const inputs = [
    createInputValidator('rechercher', searchEl, [validators.needThreeChars]),
  ]

  function validate(previousErrors, validator, input) {
    if (previousErrors.find((error) => error.stopOnFailure)) {
      return previousErrors
    }

    const isValid = validator.handler(input, ...validator.params)
    if (!isValid) {
      previousErrors.push(validator)
    }

    return previousErrors
  }

  function setInputErrors({ input, name }, errors) {
    let inputs = [input]

    inputs.forEach((el) => {
      el.parentNode.setAttribute('data-error-visible', true)
      errors.map((error) => console.log('error', error))
    })
  }

  function resetInputErrors({ input }) {
    let inputs = [input]

    inputs.forEach((el) => {
      console.log('inputEl', el)
    })
  }

  function setRecipesAtLeast(errors) {
    errors.map((error) => {
      if (error.handler.name === 'atLeast') {
        document
          .querySelector('.recipes-section')
          .replaceWith(RecipeList(getAll()))
      }
    })
  }

  function onInput() {
    let canSubmit = true

    inputs.forEach((inputValidator) => {
      const errors = inputValidator.validators.reduce(
        (prev, curr) => validate(prev, curr, inputValidator.input),
        []
      )

      if (errors.length > 0) {
        canSubmit = false
        setRecipesAtLeast(errors)
        setInputErrors(inputValidator, errors)
      }

      if (canSubmit) {
        return document
          .querySelector('.recipes-section')
          .replaceWith(RecipeList(searchAll(searchEl.value)))
      }
    })
  }

  return onInput()
}
