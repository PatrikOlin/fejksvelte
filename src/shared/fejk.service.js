const baseUrl = 'https://api.fejk.company/v1/';

export async function getPeople(amount = 1) {
  const url = `${baseUrl}/people?amount=${amount}`
  const response = await fetch(url)
  return response.json()
}

export async function getCompanies(amount = 1) {
  const url = `${baseUrl}/companies?amount=${amount}`
  const response = await fetch(url)
  return response.json()
}

export async function getArticles(amount = 1) {
  const url = `${baseUrl}/articles?amount=${amount}`
  const response = await fetch(url)
  return response.json()
}
