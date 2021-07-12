import React, {useContext} from 'react';
import UploadForm from '../UploadForm';
import ImagesBlock from '../ImagesBlock';
import ErrorBlock from "../ErrorBlock";
import LoadingMain from "../LoadingMain";

import {Context} from "../../context/Context";

import './style.scss'

const App = () => {
    const {state: {load}} = useContext(Context);

    return (
        <main>
            <UploadForm/>
            <ImagesBlock/>
            <ErrorBlock/>
            {
                load && <LoadingMain/>
            }
        </main>
    );
}

export default App;
