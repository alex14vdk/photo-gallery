import React from 'react';
import './style.scss';

const LoadingMain = () => {
    return (
        <div className="loading-main">
            <div className='loading-main__anim'>
                <div className="loading-main__pulse">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingMain;