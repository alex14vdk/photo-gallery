import React, {useEffect, useRef, useCallback, useContext} from 'react';
import Firebase from "../../utils/firebase";
import {useDropzone} from 'react-dropzone';
import initGallery from "../../utils/flexibleGallery";
import {upload} from "../../utils/UploadHandlers";
import Item from "../Item";
import './style.scss';
import {Context} from "../../context/Context";

import "lightgallery.js/dist/css/lightgallery.css";
import {LightgalleryProvider} from "react-lightgallery";

const ImagesBlock = () => {
    const {uploadData, getData, stopLoading, errorShow, state: {data, load}} = useContext(Context);
    const ref = useRef(null);

    const onDrop = useCallback(File => {
        uploadData();
        upload(File, errorShow, stopLoading);
    }, []);

    const {getRootProps} = useDropzone({
        onDrop
    });

    useEffect(() => {
        return Firebase.getData(getData, stopLoading);
    }, []);

    useEffect(() => {
        initGallery(ref.current, {
            preparedSizing: data,
            selectorElement: 'div.images-block__item',
            marginElement: 7,
            maxRowHeight: 240,
            mediaMaxRowHeight: {
                '320': 640,
                '420': 680,
                '480': 720
            }
        })

    }, [data]);

    return (
        <div {...getRootProps()} className="images-block" ref={ref}>
            {
                !data.length && !load
                &&
                <div className="images-block__drop-area drop-zone">
                    <span className="drop-zone__icon">&nbsp;</span>
                    <span className="drop-zone__descr">
                        Drag & Drop files here
                    </span>
                </div>
            }

            <LightgalleryProvider
                lightgallerySettings={{
                    loop: true,
                    escKey: true,
                    keyPress: true
                }}
            >
                {
                    data && data.map((img, i) => (
                        <Item index={i} key={img.id} {...img} />
                    ))
                }
            </LightgalleryProvider>
        </div>
    )
}

export default ImagesBlock;