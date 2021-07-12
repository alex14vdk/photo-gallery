import Firebase from "./firebase";

class UploadHandler {
    constructor(errorCallback, successCallback) {
        this.errorCallback = errorCallback;
        this.successCallback = successCallback;
    }

    /**
     * В зависимости от способа добавления - обрабатываем и загружаем файл
     * @param uploaded
     */
    upload = (uploaded) => {
        UploadInfo.identifyUploadType(uploaded,
            () => {
                this.#uploadAsFile(uploaded);
            },
            () => {
                this.#uploadByUrl(uploaded);
            }
        )
    }

    /**
     * Добавляем изображение, либо перебираем изображения в json
     * @param uploaded
     */
    #uploadAsFile = (uploaded) => {
        uploaded.map((file) => {
            UploadInfo.checkFile(
                file,
                async () => {
                    if (file.type === 'application/json') {
                        this.#getDataFromJson(await UploadInfo.convertFiletoJson(file));
                    } else {
                        this.#uploadImgFile(file);
                    }
                },
                (e) => this.errorCallback(e)
            )
        })
    }

    /**
     * Преобразовываем ссылку в файл или в json данные
     * @param url
     * @param size
     */
    #uploadByUrl = (url, size = {}) => {
        UploadInfo.checkUrl(
            url,
            () => {
                const type = UploadInfo.getFileTypeByUrl(url);
                fetch(url).then(res => {
                    return type !== 'json' ? res.blob() : res.json();
                }).then(result => {
                    result.name = UploadInfo.getFileNameByUrl(url);

                    if (type !== 'json') {
                        this.#uploadImgFile(result, size);
                    } else {
                        this.#getDataFromJson(result);
                    }
                })
            },
            (e) => this.errorCallback(e)
        )
    }

    /**
     * Перебираем данные JSON файла
     * @param result
     */
    #getDataFromJson = (result) => {
        UploadInfo.checkJSON(result,
            () => {
                result[UploadInfo.jsonImageArrName].map(data => {
                    const {url, width, height} = data;
                    this.#uploadByUrl(url, {width, height});
                })
            },
            (e) => this.errorCallback(e)
        )
    }

    /**
     * Отправляем преобразованный файл изображения в firebase, предварительно определив масштаб, в случае, если не задан
     * @param file
     * @param size
     * @returns {Promise<void>}
     */
    #uploadImgFile = async (file, size = {}) => {
        let imageSize;
        if (size.width > 0 && size.height > 0) {
            imageSize = size;
        } else {
            imageSize = await UploadInfo.getImageFileSize(file);
        }

        Firebase.addFile(file, imageSize, (e) => this.successCallback(e));
    }
}


const UploadInfo = {
    allowedDropTypes: ['image/png', 'image/jpeg', 'application/json'],
    allowedUrlTypes: ['json', 'png', 'jpg', 'jpeg'],
    maxFileSizeInMb: 5,
    jsonImageArrName: 'galleryImages',
    /**
     * Определяем каким способом загружают файл
     * @param upload
     * @param fileCallback
     * @param urlCallback
     */
    identifyUploadType: function (upload, fileCallback, urlCallback) {
        if (UploadInfo.isFile(upload[0])) {
            fileCallback();
        } else {
            urlCallback();
        }
    },
    /**
     * Проверяем URL на корректность
     * @param url
     * @param callback - отработка функции в случае отсутствия ошибок
     * @param errorCallback - отработка callback функции демонстрации ошибки
     */
    checkUrl: function (url, callback, errorCallback) {
        let errorText = false;

        if (!this.isCorrectUrl(url)) {
            errorText = `Incorrect URL. Allowed types: ${this.allowedUrlTypes.join(', ')}`;
        }
        errorText ? errorCallback(errorText) : callback();
    },
    /**
     * Проверка файла на корректность
     * @param file
     * @param callback
     * @param errorCallback
     */
    checkFile: function (file, callback, errorCallback) {
        let errorText = false;

        if (!this.allowedDropTypes.includes(file.type)) {
            errorText = `Allowed types: ${this.allowedUrlTypes.join(', ')}`;
        } else if (file.size > (this.maxFileSizeInMb * 1024 * 1024)) {
            errorText = `Max File Size: ${this.maxFileSizeInMb}mb`;
        }
        errorText ? errorCallback(errorText) : callback();
    },
    /**
     * Проверка файла JSON, на корректность содержимого формата данных
     * @param data
     * @param callback
     * @param errorCallback
     */
    checkJSON: function (data, callback, errorCallback) {
        let errorText = false;

        if (!this.isCorrectJsonFormat(data)) {
            errorText = `Incorrect JSON Format`;
        }
        errorText ? errorCallback(errorText) : callback();
    },
    /**
     * Получаем масштаб изображения
     * @param file
     * @returns {Promise<unknown>}
     */
    getImageFileSize: function (file) {
        const img = new Image();
        var _URL = window.URL || window.webkitURL;
        var objectUrl = _URL.createObjectURL(file);

        const promise = new Promise((resolve, reject) => {
            img.onload = () => {
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                resolve({width, height});
            };
            img.onerror = reject;
        });
        img.src = objectUrl;
        return promise;
    },
    /**
     * Преобразовываем json файл в читаемый вид
     * @param file
     * @returns {Promise<unknown>}
     */
    convertFiletoJson: function (file) {
        let fr = new FileReader();
        return new Promise((resolve, reject) => {
            fr.onload = function receivedText(e) {
                let lines = e.target.result;
                let newArr = JSON.parse(lines);
                resolve(newArr);
            };
            fr.onerror = reject;
            fr.readAsText(file);
        });
    },
    isCorrectJsonFormat: function (result) {
        if (result[this.jsonImageArrName].length &&
            result[this.jsonImageArrName][0].width > 0 &&
            result[this.jsonImageArrName][0].height > 0 &&
            result[this.jsonImageArrName][0].url
        ) {
            return true;
        }
    },
    isFile: file => {
        if (typeof file == 'object' && file.name && file.size > 0) {
            return true;
        }
    },
    isCorrectUrl: function (url) {
        const awdTypes = new RegExp(this.allowedUrlTypes.join("|"));
        const myRegex = new RegExp(`(http)?s?:?(\/\/[^"']*\.(?:${awdTypes.source}))`, "i");
        return myRegex.test(url);
    },
    getFileNameByUrl: url => {
        return url.substring(url.lastIndexOf('/') + 1);
    },
    getFileTypeByUrl: url => {
        return url.split(/[#?]/)[0].split('.').pop().trim();
    },
}

/**
 * @param uploadData
 * @param errorCallback
 * @param successCallback
 */
export const upload = (
    uploadData,
    errorCallback = Function(),
    successCallback = Function()
) => {
    const uploadFile = new UploadHandler(errorCallback, successCallback);
    uploadFile.upload(uploadData);
}