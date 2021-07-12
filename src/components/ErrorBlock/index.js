import React, {useContext} from 'react';
import './style.scss';
import {Context} from "../../context/Context";

const ErrorBlock = () => {
    const {errorHide, state: {error: {text, show}}} = useContext(Context);

    return (
        <div className={`error-block ${show && 'error-block--show'}`}>
            <div className="error-block__window">
                <p className="error-block__text">{text}</p>
                <button
                    className="error-block__btn"
                    onClick={() => errorHide()}>
                    Ok
                </button>
            </div>
        </div>
    )
}

export default ErrorBlock;