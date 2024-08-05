import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  currentConversation: {
    messages: [],
    feedback: null,
  },
};

// Mock API call to save conversation
export const saveConversationAsync = createAsyncThunk(
  'conversation/saveConversation',
  async (conversation, thunkAPI) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return conversation;
  }
);

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.currentConversation.messages.push(action.payload);
    },
    addFeedback: (state, action) => {
      const { index, type } = action.payload;
      state.currentConversation.messages[index].feedback = type;
    },
    saveConversation: (state) => {
      state.conversations.push(state.currentConversation);
      state.currentConversation = { messages: [], feedback: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveConversationAsync.fulfilled, (state, action) => {
      state.conversations.push(action.payload);
      state.currentConversation = { messages: [], feedback: null };
    });
  }
});

export const { addMessage, addFeedback, saveConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
