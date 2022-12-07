export const getAutocompleteOptions = (query: string) => {
  return fetch(`https://direct8.org/api/autocomplete?query=${query}`)
}
