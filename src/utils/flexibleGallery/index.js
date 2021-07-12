import './style.scss';

class FlexibleGallery {
    constructor(gallery, params) {
        this.allGalleryWidth = gallery.clientWidth;
        this.allGalleryHeight = 0;
        this.maxRowHeight = params.maxRowHeight;
        this.marginElement = params.marginElement;
        this.selectorElement = params.selectorElement;
        this.gallery = gallery;
        this.row = {
            elements: [],
            height: 0,
            ratio: 0,
            widthWithoutMargin: 0
        };
        this.mediaMaxRowHeight = params.mediaMaxRowHeight;
        this.imgPositionTop = 0;
        this.preparedSizing = params.preparedSizing;
        this.imgData = [];
    }

    /**
     * Инициализация вычислений
     */
    init = function () {
        const elements = this.gallery.querySelectorAll(this.selectorElement);

        this.gallery.classList.add("flexible-gallery");
        this.maxRowHeight = this.#getCurMaxRowHeight(this.allGalleryWidth);

        let arrElements = this.preparedSizing;
        if (!this.preparedSizing) {
            arrElements = [...elements];
        }

        arrElements.map((element, i) => {
            elements[i].classList.add("flexible-gallery__item");

            let img = element;
            if (!this.preparedSizing) {
                img = element.querySelectorAll('img')[0];
            }

            let imgRatio = img.width / img.height;//получаем соотношение (напр. 4/3 = ~1.333)
            if (!this.preparedSizing) {
                imgRatio = img.naturalWidth / img.naturalHeight
            }

            this.row.widthWithoutMargin = this.allGalleryWidth - ((this.row.elements.length - 1) * this.marginElement) - this.marginElement;//ширина блока минус отступы от кол-ва элементов

            this.row.elements.push(img);//добавляем элементы в массив текущей строки
            this.row.ratio += imgRatio;//добавляем значение соотношения изображения к общему значению соотношения в строке

            if (this.maxRowHeight > (this.row.widthWithoutMargin / this.row.ratio)) {//если высота строки с сохранением пропорций изображений внутри неё, меньше чем максимально-заданная высота строки
                this.#rowEdit();
            } else if ((elements.length - 1) === i && this.row.elements.length) {//в случае если элемент последний и при этом текущая строка не обработана
                this.#rowEdit(true);
            }
        })

        this.#reStyleElements(elements);
        this.#imgOnLoad(elements);
    }


    /**
     * Работа с элементами строки
     * @param lastRow
     */
    #rowEdit = function (lastRow = false) {
        let imgWidthNew, imgHeightNew;
        let imgPositionLeft = 0;

        if (!lastRow) {
            this.row.height = this.row.widthWithoutMargin / this.row.ratio;//получаем высоту строки
        } else {
            this.row.height = this.maxRowHeight;
        }

        this.row.elements.map((imgElement, i) => {

            let imgRatio = imgElement.width / imgElement.height;//получаем соотношение (напр. 4/3 = ~1.333)
            if (!this.preparedSizing) {
                imgRatio = imgElement.naturalWidth / imgElement.naturalHeight
            }

            if (!lastRow) {
                imgWidthNew = this.row.height * imgRatio;//ширина элемента равна соотношению элемента*высоту строки
                imgHeightNew = this.row.height;
            } else {
                imgWidthNew = this.maxRowHeight * imgRatio;//задаём изображению ширину исходя из его соотношения и макс. высоты строки
                imgHeightNew = this.maxRowHeight;
            }

            this.imgData.push({
                imgElement,
                imgWidthNew,
                imgHeightNew,
                imgPositionLeft,
                imgPositionTop: this.imgPositionTop
            });
            imgPositionLeft += imgWidthNew + this.marginElement;
        })
        this.imgPositionTop += this.row.height + this.marginElement;
        this.allGalleryHeight += this.row.height + this.marginElement;

        this.#resetRow();
    }

    /**
     * Стилизация элементов
     * @param elements
     */
    #reStyleElements = function (elements) {
        const measure = 'px';
        this.gallery.style.height = this.allGalleryHeight + measure;
        this.imgData.map((imageData, i) => {
            elements[i].style.width = imageData.imgWidthNew + measure;
            elements[i].style.height = imageData.imgHeightNew + measure;
            elements[i].style.left = imageData.imgPositionLeft + measure;
            elements[i].style.top = imageData.imgPositionTop + measure;
        })
    }

    /**
     * Фиксация загрузки
     * @param elements
     */
    #imgOnLoad = function (elements) {
        [...elements].map((element, i) => {
            const img = element.querySelectorAll('img')[0];
            img.onload = () => {
                element.classList.add("flexible-gallery__item--active");
            }
        })
    }

    /**
     * Сброс параметров строки
     */
    #resetRow = function () {
        this.row.elements = [];
        this.row.ratio = 0;
    }

    /**
     * Получаем показатель максимальной высоты строки, в зависимости от текущей общей ширины блока
     * @param curWidth - текущая ширина блока
     * @returns {*}
     */
    #getCurMaxRowHeight = function (curWidth) {
        const points = Object.keys(this.mediaMaxRowHeight);

        for (let i = 0; i < points.length; i++) {
            if (points[i] > curWidth) {
                return this.mediaMaxRowHeight[points[i]];
            }
        }
        return this.maxRowHeight;
    }

    /**
     * Параметры по умолчанию
     * @type {{preparedSizing: boolean, marginElement: number, maxRowHeight: number, mediaMaxRowHeight: {"320": number, "480": number}, selectorElement: string}}
     */
    static defaultParams = {
        maxRowHeight: 200,
        mediaMaxRowHeight: {
            '320': 428,
            '480': 640
        },
        marginElement: 10,
        selectorElement: "a",
        preparedSizing: false
    }
}

/**
 * @param block - блок с элементами
 * @param params - объект с ключами параметров плагина
 */
const initGallery = function (block, params = {}) {
    let handlerFunction;

    (handlerFunction = () => {
        if (!block) {
            return false;
        }
        params = Object.assign(FlexibleGallery.defaultParams, params);//задаём параметры из параметров по-умолчанию, в случае отсутствия своих
        const gallery = new FlexibleGallery(block, params);
        gallery.init();
    })();

    ['resize'].map(e => {
        window.addEventListener(e, () => {
            handlerFunction();
        })
    })
}

export default initGallery;