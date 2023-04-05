import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  VideoConfigState,
  VideoConfigParamName,
  VideoSelected
} from '../../types';

const initialState: VideoConfigState = {
  style: {
    options: [
      {value: 'simple', label: 'Prosty'},
      {value: 'artistic', label: 'Artystyczny'},
      {value: 'street', label: 'Uliczny'},
      {value: 'amatour', label: 'Amatorski'},
      {value: 'party', label: 'Imprezowy'}
    ],
    selected: []
  },
  location: {
    options: [
      {value: 'studio', label: 'Studio'},
      {value: 'neighborhood', label: 'Osiedle'},
      {value: 'club', label: 'Klub'},
      {value: 'car', label: 'Samochód'},
      {value: 'other', label: 'Różne'}
    ],
    selected: []
  },
  homiesLevel: {
    min: 0,
    max: 9,
    selected: 0
  },
  hotGirlsLevel: {
    min: 0,
    max: 9,
    selected: 0
  },
  carsLevel: {
    min: 0,
    max: 9,
    selected: 0
  }
}

export const videoConfigSlice = createSlice({
  name: 'videoConfig',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<{name: VideoConfigParamName, selected: VideoSelected}>) {
      const stateRef = state[action.payload.name];

      if (stateRef) {
        stateRef.selected = action.payload.selected;
      }
    }
  }
})

export const { setValue: setVideoConfigValue } = videoConfigSlice.actions;

export const videoConfigState = (state: RootState) => state.videoConfig

export default videoConfigSlice.reducer;

