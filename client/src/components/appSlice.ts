import { createSlice } from '@reduxjs/toolkit'

export interface AppState {
  intro: boolean
  color: string
  isLogoTexture: boolean
  isFullTexture: boolean
  logoDecal: string
  fullDecal: string
}

const initialState: AppState = {
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png'
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIntro: (state, action) => {
      state.intro = action.payload
    },
    setColor: (state, action) => {
      state.color = action.payload
    },
    setLogoTexture: (state, action) => {
      state.isLogoTexture = action.payload
    },
    setFullTexture: (state, action) => {
      state.isFullTexture = action.payload
    },
    setLogoDecal: (state, action) => {
      state.logoDecal = action.payload
    },
    setFullDecal: (state, action) => {
      state.fullDecal = action.payload
    }
  }
})

const { actions, reducer } = appSlice

export const { setIntro, setColor, setLogoTexture, setFullTexture, setLogoDecal, setFullDecal } = actions

export default reducer
