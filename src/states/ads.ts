import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'

export interface AdsState {
  category1: string
  category2: string
  dateRange: [Date | null, Date | null]
  dayOrWeek: string
}

const INITIAL_STATE: AdsState = {
  category1: 'roas',
  category2: 'none',
  dateRange: [new Date('02-08-2022'), new Date('02-10-2022')],
  dayOrWeek: 'day',
}

const adsSlice = createSlice({
  name: 'ads',
  initialState: INITIAL_STATE,
  reducers: {
    setCategory1: (state: AdsState, action: PayloadAction<string>) => {
      state.category1 = action.payload
    },
    setCategory2: (state: AdsState, action: PayloadAction<string>) => {
      state.category2 = action.payload
    },
    setDateRange: (state: AdsState, action: PayloadAction<[Date | null, Date | null]>) => {
      state.dateRange = action.payload
    },
    setDayOrWeek: (state: AdsState, action: PayloadAction<string>) => {
      state.dayOrWeek = action.payload
    },
  },
})

export const { setCategory1, setCategory2, setDateRange, setDayOrWeek } = adsSlice.actions

export default adsSlice.reducer

// Selector =====================

export const getCategory1 = (state: RootState): string => state.ads.category1
export const getCategory2 = (state: RootState): string => state.ads.category2
export const getDateRange = (state: RootState): [Date | null, Date | null] => state.ads.dateRange
export const getDayOrWeek = (state: RootState): string => state.ads.dayOrWeek
