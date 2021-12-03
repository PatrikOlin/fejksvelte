import { writable, derived } from 'svelte/store';
import { getPeople } from '../shared/fejk.service'

const initialState = {
  people: [],
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
        console.log(res)
        update(state => (state = { ...state, people: res }))
      } catch (e) {
        alert(e.message)
      } finally {
        update(state => (state = { ...state, isLoading: false }))
      }
    }
  }
}

export const fejkStore = createFejkStore()

// derived values
export const getNumOfPeople = derived(
  fejkStore,
  $fejkStore => $fejkStore.people.length
)
