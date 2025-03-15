import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define a type for the slice state
export interface SessionState {
  session: any,

}

// Define the initial state using that type
const initialState: SessionState = {
  session: null
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
      setSession: (state, action: PayloadAction<any>) => {
        state.session = action.payload
      }
    }
  })

export const { setSession } = sessionSlice.actions

export default sessionSlice.reducer