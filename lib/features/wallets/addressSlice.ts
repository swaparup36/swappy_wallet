import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface AddressState {
  privateKey: Uint8Array;
  publicKey: string;
}

// Initialize the initial state
const initialState: AddressState = {
    privateKey: new Uint8Array([]),
    publicKey: ''
};

// Create a Redux slice for addresses
const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setPrivateKey(state, action: PayloadAction<Uint8Array>) {
      state.privateKey = action.payload;
    },
    setPublicKey(state, action: PayloadAction<string>) {
        state.publicKey = action.payload;
    },
  },
});

// Export actions and reducer
export const { setPrivateKey, setPublicKey } = addressSlice.actions;
export default addressSlice.reducer;
