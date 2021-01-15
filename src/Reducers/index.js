import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { bkcReducer } from './bkcReducer';
import { bookingHistoryReducer } from './bookingHistoryReducer';
import { hraReducer } from './hraReducer';
import { hrReducer } from './hrReducer';

export const rootReducer = combineReducers({
    bkc: bkcReducer,
    app: appReducer,
    hr: hrReducer,
    hra: hraReducer,
    bh: bookingHistoryReducer
})