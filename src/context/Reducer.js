import {ERROR_SHOW, ERROR_HIDE, DATA_GET, DATA_UPLOAD, DATA_DELETE, STOP_LOADING, SELECT_ITEM} from "./Types";

export const InitialState = {
    error: {
        show: false,
        text: ""
    },
    load: true,
    data: [],
    selected: null
}

export const Reducer = (state, action) => {
    switch (action.type) {
        case ERROR_SHOW:
            return {
                ...state,
                load: false,
                error: {
                    show: true,
                    text: action.payload
                }
            };
        case ERROR_HIDE:
            return {
                ...state,
                error: {
                    show: false,
                    text: InitialState.error.text
                }
            };
        case DATA_GET:
            return {
                ...state,
                data: action.payload,
                load: false
            };
        case DATA_UPLOAD:
            return {
                ...state,
                load: true
            };
        case DATA_DELETE:
            return {
                ...state,
                load: true
            };
        case STOP_LOADING:
            return {
                ...state,
                load: false
            };
        case SELECT_ITEM:
            return {
                ...state,
                selected: action.payload
            };
        default:
            return state;
    }
};