import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  MusicConfigState,
  MusicConfigParamName,
  MusicSelected
} from '../../types';

const initialState: MusicConfigState = {
  style: {
    options: [
      {value: 'classic', label: 'Klasycznie'},
      {value: 'psycho', label: 'Psycho'},
      {value: 'rock', label: 'Rockowo'},
      {value: 'bounce', label: 'Bounce'},
      {value: 'hiphopolo', label: 'Hiphopolo'}
    ],
    selected: []
  },
  topic: {
    options: [
      {value: 'tough_life', label: 'Ciężkie życie'},
      {value: 'drugs', label: 'Dragi / Palenie blantów'},
      {value: 'money', label: 'Pieniądze'},
      {value: 'rap', label: 'Rap'},
      {value: 'deep', label: 'Głębokie'},
      {value: 'party', label: 'Impreza'},
      {value: 'patriotic', label: 'Polska'},
    ],
    selected: []
  },
  stolen: {
    options: [
      {value: 'unknown', label: 'Własne / nieznany artysta'},
      {value: 'famous', label: 'Od kogoś znanego'},
    ],
    selected: []
  },
  featuring: {
    options: [
      {value: 'raper', label: 'Raper(ka)'},
      {value: 'singer', label: 'Wokalist(k)a'}
    ],
    selected: []
  },
  swearLevel: {
    min: 0,
    max: 9,
    selected: 0
  },
  rhymesLevel: {
    min: 0,
    max: 9,
    selected: 0
  }
}

export const musicConfigSlice = createSlice({
  name: 'musicConfig',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<{name: MusicConfigParamName, selected: MusicSelected}>) {
      const stateRef = state[action.payload.name];

      if (stateRef) {
        stateRef.selected = action.payload.selected;
      }
    }
  }
})

export const { setValue: setMusicConfigValue } = musicConfigSlice.actions;

export const musicConfigState = (state: RootState) => state.musicConfig

export default musicConfigSlice.reducer;

