import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './UserSlice';

const Store= configureStore({
    reducer:{
        UserToken:userReducer
    }
});

export default Store;