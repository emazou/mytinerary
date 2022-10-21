import {configureStore} from '@reduxjs/toolkit'
import citiesAPI from './citiesAPI'
import itinerariesAPI from './itinerariesAPI'
import commentsAPI from './commentsAPI'
import activitiesAPI from './activitiesAPI'
import usersAPI from './usersAPI'
import modalReducer from './modalSlice'
import editReducer from './editSlice'
import loggedSlice from './loggedSlice'
import reloadSlice from './reloadSlice'
export default configureStore({
    reducer: {
        [citiesAPI.reducerPath]: citiesAPI.reducer,
        [itinerariesAPI.reducerPath]: itinerariesAPI.reducer,
        [commentsAPI.reducerPath]: commentsAPI.reducer,
        [activitiesAPI.reducerPath]: activitiesAPI.reducer,
        [usersAPI.reducerPath]: usersAPI.reducer,
        modal: modalReducer,
        edit: editReducer,
        logged: loggedSlice,
        reload: reloadSlice
    }
})
