import { UserType } from '../HW8'

type ActionType =
  | { type: 'sort'; payload: 'up' | 'down' }
  | { type: 'check'; payload: number }

export const homeWorkReducer = (state: any, action: ActionType): any => {
  // need to fix any
  switch (action.type) {
    case 'sort': {
      // by name
      const sortedNamesState = [...state]

      if (action.payload === 'up') {
        sortedNamesState.sort(function (a, b) {
          if (a.name > b.name) {
            return 1
          }
          if (a.name < b.name) {
            return -1
          }
          return 0
        })
      } else {
        sortedNamesState.sort(function (a, b) {
          if (a.name < b.name) {
            return 1
          }
          if (a.name > b.name) {
            return -1
          }
          return 0
        })
      }
      return sortedNamesState
    }
    case 'check': {
      return state.filter((person: UserType) => person.age >= 18)
    }
    default:
      return state
  }
}
