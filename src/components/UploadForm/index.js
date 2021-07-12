import React, {useContext, useState} from 'react';
import {upload} from "../../utils/UploadHandlers";
import './style.scss';
import {Context} from "../../context/Context";


const UploadForm = () => {
    const {uploadData, stopLoading, errorShow} = useContext(Context);
    const [url, setUrl] = useState("");

    const addByUrl = (e) => {
        e.preventDefault();
        if (url) {
            uploadData();
            upload(url, errorShow, stopLoading);
        }
        setUrl("");
    }

    return (
        <form className="upload-form">
            <input className='upload-form__element'
                   type="text"
                   onChange={e => setUrl(e.target.value)}
                   value={url}
                   placeholder='Вставьте URL изображения или json-файл с данными'
            />
            <button
                className='upload-form__element'
                onClick={e => addByUrl(e)}
            >
                Загрузить
            </button>
        </form>
    );
}

export default UploadForm;