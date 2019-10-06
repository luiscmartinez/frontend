import { createSlice } from 'redux-starter-kit'

const navReducer = createSlice({
  slice: 'navReducer',
  initialState: {
    groupID: 0,
    error: '',
  },
  reducers: {
    viewGroup(state, action) {
      return { ...state, groupID: action.payload }
    },
  },
})

export const { viewGroup } = navReducer.actions

export default navReducer.reducer
