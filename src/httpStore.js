import { writable } from 'svlete/store';

export default function(initial) {

  // create the underlying store
  const store = writable(store)

  // define a request function that will do 'fetch' and update store when request finishes
  store.request = async (method, url, params = null) => {
    // before we fetch, clear out previous error and set loading to true
    store.update(data => {
      delete data.errors
      data.loading = true

      return data
    })

    // define headers and body
    const headers = {
      "Content-type": "application/json"
    }

    const body = params ? JSON.stringify(params) : undefined

    // execute fetch
    const response = await fetch(url, { method, body, headers })
    // pull out json body
    const json = await response.json()

    // if response i 2xx
    if (response.ok) {
      // update the store, which will cause all subscribers to be notified
      store.set(json)
    } else {
      // response failed, set 'error' and clear 'loading' flag
      store.update(data => {
        data.loading = false
        data.errors = json.errors
        return data
      })
    }
  }

  // convenience wrappers for get, post, patch and delete
  store.get = (url) => store.request('GET', url)
  store.post = (url, params) => store.request('POST', url, params)
  store.patch = (url, params) => store.request('PATCH', url, params)
  store.delete = (url, params) => store.request('DELETE', url, params)

  return store
}
