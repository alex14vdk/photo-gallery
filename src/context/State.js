import React, {useReducer} from 'react';
import {Context} from './Context';
import {Reducer, InitialState} from "./Reducer";
import {ERROR_SHOW, ERROR_HIDE, DATA_GET, DATA_UPLOAD, DATA_DELETE, STOP_LOADING, SELECT_ITEM} from "./Types";

const State = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, InitialState);

    const errorShow = (text) => {
        dispatch({
            type: ERROR_SHOW,
            payload: text
        })
    };

    const errorHide = () => {
        dispatch({
            type: ERROR_HIDE
        })
    };

    const stopLoading = () => {
        dispatch({
            type: STOP_LOADING
        })
    }

    const getData = (data) => {
        dispatch({
            type: DATA_GET,
            payload: data
        })
    };

    const uploadData = () => {
        dispatch({
            type: DATA_UPLOAD
        })
    };

    const deleteData = () => {
        dispatch({
            type: DATA_DELETE
        })
    };

    const selectItem = (id) => {
        dispatch({
            type: SELECT_ITEM,
            payload: id
        })
    }

    return (
        <Context.Provider
            value={{
                errorShow,
                errorHide,
                stopLoading,
                getData,
                uploadData,
                deleteData,
                selectItem,
                state: state
            }}
        >
            {children}
        </Context.Provider>
    )
};

export default State;