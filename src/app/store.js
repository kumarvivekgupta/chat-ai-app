import { configureStore } from '@reduxjs/toolkit';
import  conversationReducer  from '../features/chat/conversationSlice'

export const store = configureStore({
    reducer: {
        conversation: conversationReducer,
    },
});
