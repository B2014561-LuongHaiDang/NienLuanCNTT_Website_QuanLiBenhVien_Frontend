import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  cccd: '',
  avatar: '',
  id: '',
  access_token: '',
  isAdmin: false
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name='', cccd='', access_token='', avatar='', _id='', isAdmin } = action.payload
      state.name = name;
      state.cccd = cccd;
      state.avatar = avatar;
      state.id = _id;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      state.name = '';
      state.cccd = '';
      state.avatar = '';
      state.id = '';
      state.access_token = '';
    }
  },
})

export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer