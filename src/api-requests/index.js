import Queries from '../queries';

const api = 'https://api.everbase.co/graphql?apikey=alpha' // API key shouldn't be exposed actually

export const search = async searchKey => {
  const response = await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: Queries.searchCountries(searchKey) }),
  })
  
  const { data, errors } = await response.json();

  return { ...data, errors };
}