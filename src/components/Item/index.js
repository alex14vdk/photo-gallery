import React, {useContext} from 'react';
import Firebase from "../../utils/firebase";
import Loading from "../Loading";
import './style.scss';
import {Context} from "../../context/Context";
import {LightgalleryItem, useLightgallery} from "react-lightgallery";
import useOnclickOutside from "react-cool-onclickoutside";

const Item = ({id, url, index}) => {
    const {deleteData, selectItem, stopLoading, state: {selected}} = useContext(Context);

    const {openGallery} = useLightgallery();

    const selectOut = useOnclickOutside(() => {
        selectItem(null)
    });

    const onSelectItem = (e, id) => {
        e.preventDefault();
        selectItem(id)
    }

    return (
        <div className="images-block__item item"
             onClick={e => onSelectItem(e, id)}
             ref={selectOut}
        >
            <Loading/>
            <div className={
                `item__select-panel 
                ${selected === id ? 'item__select-panel--active' : ''}`
            }>
                <div className="item__delete"
                     onClick={() => {
                         deleteData();
                         Firebase.deleteFile(id, url, stopLoading)
                     }}
                >
                    &nbsp;
                </div>
                <div onClick={() => {
                    openGallery("group", index)
                }}
                     className='item__show'
                >
                    &nbsp;
                </div>
                <LightgalleryItem group={"group"} src={url}>&nbsp;</LightgalleryItem>
            </div>
            <img src={url} alt="uploaded pic"/>
        </div>
    )
}

export default Item;