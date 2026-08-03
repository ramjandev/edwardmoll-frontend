import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  quoteId: string | null;
  bookingId: string | null;
  calculatedQuote: any | null;
  bookingResult: any | null;
}

const initialState: BookingState = {
  quoteId: null,
  bookingId: null,
  calculatedQuote: null,
  bookingResult: null,
};

const bookingSlice = createSlice({
  name: "bookingFlow",
  initialState,
  reducers: {
    setQuoteId(state, action: PayloadAction<string | null>) {
      state.quoteId = action.payload;
    },
    setBookingId(state, action: PayloadAction<string | null>) {
      state.bookingId = action.payload;
    },
    setCalculatedQuote(state, action: PayloadAction<any | null>) {
      state.calculatedQuote = action.payload;
    },
    setBookingResult(state, action: PayloadAction<any | null>) {
      state.bookingResult = action.payload;
    },
    resetBookingFlow(state) {
      state.quoteId = null;
      state.bookingId = null;
      state.calculatedQuote = null;
      state.bookingResult = null;
    },
  },
});

export const {
  setQuoteId,
  setBookingId,
  setCalculatedQuote,
  setBookingResult,
  resetBookingFlow,
} = bookingSlice.actions;

export default bookingSlice.reducer;
