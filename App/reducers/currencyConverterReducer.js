import {FROM_VALUE_CHANGE, FROM_CODE_CHANGE, TO_VALUE_CHANGE, TO_CODE_CHANGE} from '../constants/index';

const initialState = {
    FromCode: 'SAR',
    ToCode: 'EGP',
    FromValue:0.0,
    ToValue:0.0
};

const currencyConverterReducer = (state = initialState, action) => {
    switch(action.type) {
        case FROM_VALUE_CHANGE:
            return {
                ...state,
                FromValue: action.payload
            };
        case FROM_CODE_CHANGE:
            return {
                ...state,
                FromCode: action.payload
            };
        case TO_VALUE_CHANGE:
            return {
                ...state,
                ToValue: action.payload
            };
        case TO_CODE_CHANGE:
            return {
                ...state,
                ToCode: action.payload
            };
        default:
            return state;
    }
}
export default currencyConverterReducer;