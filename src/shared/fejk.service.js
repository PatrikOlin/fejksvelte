const baseUrl = 'https://api.fejk.company/v1/';


export async function getPeople(amount = 1) {
  const url = `${baseUrl}/people?amount=${amount}`
  const response = await fetch(url)
  return response.json()
}
