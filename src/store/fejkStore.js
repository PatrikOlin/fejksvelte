import { writable, derived } from 'svelte/store';
import { getCompanies, getPeople } from '../shared/fejk.service'

const initialState = {
  people: [],
  companies: [],
  articles: [],
  isLoading: false,
  error: '',
}

function createFejkStore() {
  const { subscribe, update } = writable(initialState)

  return {
    subscribe,
    loadPeople: async (amount = 0) => {
      update(state => (state = { ...state, isLoading: true }))
      try {
        const res = (await getPeople(amount));
        update(state => (state = { ...state, people: res }))
      } catch (e) {
        alert(e.message)
      } finally {
        update(state => (state = { ...state, isLoading: false }))
      }
    },
    loadCompanies: async (amount = 0) => {
      const { update } = writable(initialState)
      update(state => (state = { ...state, isLoading: true }))
      try {
        const res = (await getCompanies(amount));
        update(state => (state = { ...state, companies: res }))
      } catch (e) {
        alert(e.message)
      } finally {
        update(state => (state = { ...state, isLoading: false }))
      }
    },
    loadArticles: async (amount = 0) => {
      const { update } = writable(initialState)
      update(state => (state = { ...state, isLoading: true }))
      try {
        const res = (await getArticles(amount));
        update(state => (state = { ...state, articles: res }))
      } catch (e) {
        alert(e.message)
      } finally {
        update(state => (state = { ...state, isLoading: false }))
      }
    }
    ,
  }
}

export const fejkStore = createFejkStore()

// derived values
export const getNumOfPeople = derived(
  fejkStore,
  $fejkStore => $fejkStore.people.length
)
