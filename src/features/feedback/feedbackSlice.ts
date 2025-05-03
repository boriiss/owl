import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedbackFormData {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  comment: string;
  userId?: number;
  birthday?: string;
}

interface FeedbackState {
  formData: FeedbackFormData | null;
  isSubmitted: boolean;
}

const initialState: FeedbackState = {
  formData: null,
  isSubmitted: false,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    submitFeedback(state, action: PayloadAction<FeedbackFormData>) {
      state.formData = action.payload;
      state.isSubmitted = true;
    },
    resetFeedback(state) {
      state.formData = null;
      state.isSubmitted = false;
    },
  },
});

export const { submitFeedback, resetFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;