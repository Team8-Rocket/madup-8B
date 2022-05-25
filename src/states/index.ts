import { configureStore } from '@reduxjs/toolkit'

import ads from './ads'

export const store = configureStore({
  reducer: { ads },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
