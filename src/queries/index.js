export default {
  searchCountries:  (searchTerm) => {
    return `{
      countries(where: { name: { eq: "${searchTerm}" } }) {
        name
        population
        capital {
          name
        }
        currencies {
          name
        }
      }
    }`
  }
}