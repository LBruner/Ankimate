import {createSlice} from "@reduxjs/toolkit";

const initialNotification = {
    details: null,
    timer: 0
}

const uiSlice = createSlice({
    name: 'notification', initialState: {
        activeNotification: initialNotification,
        showNotification: false,
        isWaiting: false,
        fieldCount: 0
    }, reducers: {
        showNotification(state, action) {
            console.log('fafs',action.payload);
            state.showNotification = true;
            const {notification} = action.payload;
            state.activeNotification = notification;
        },
        hideNotification(state) {
            state.showNotification = false;
            state.activeNotification.details = null;
            state.activeNotification.timer = 0;
        },
        toggleIsWaiting(state) {
            state.isWaiting = !state.isWaiting;
        },
        setFieldCount(state,action){
            state.fieldCount = action.payload.fieldCount;
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;