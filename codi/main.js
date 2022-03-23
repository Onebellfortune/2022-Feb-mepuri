import { character as characterInitialValue, characterFace, characterHair } from "./data/default_character.js";
import { EAR_TYPE, SKIN_TYPE, earList, skinList, EMOTION } from "./constants.js";
import { generateAvatarLink, drawFrontCharacter, drawCharacter } from "./avatarManager.js";
import { version, locale } from "../common/apiInfo.js";
import {
    clearFilterInput,
    triggerClickEvent,
    createItemListButton,
    createEarListButton,
    createSkinListButton,
    lazyloading,
} from "./menuManager.js";
import { FaceAccessoryVisibleData } from "./data/face_accessory.js";
import {
    getAllItemList,
    setSelectedItemInfo,
    getHairIdAsColor,
    getFaceIdAsColor,
    setColors,
    setCharacterAPIVersion,
} from "./itemManager.js";
import { createSettingPanelDom, buttonInitialSetting } from "./settingPanelManager.js";

let _character = JSON.parse(JSON.stringify(characterInitialValue)); // to deep copy
let selectedCategoryFlag = "Hair";
let selectedColor = {
    hair: {
        front: {
            value: 0,
            opacity: 0.5,
        },
        back: {
            value: 0,
            opacity: 1,
        },
    },
    lens: {
        front: {
            value: 0,
            opacity: 1,
        },
        back: {
            value: 0,
            opacity: 1,
        },
    },
};

let data = {
    FaceAccessory: [],
    EyeDecoration: [],
    Earrings: [],
    Hat: [],
    Top: [],
    Bottom: [],
    Face: [],
    Glove: [],
    Hair: [],
    Overall: [],
    Shoes: [],
    Cape: [],
    Cash: [],
    etc: [],
};
const categories = {
    FaceAccessory: { icon: "🤡" },
    EyeDecoration: { icon: "👓" },
    Earrings: { icon: "👂" },
    Hat: { icon: "🧢" },
    Top: { icon: "👕" },
    Bottom: { icon: "👖" },
    Face: { icon: "👀" },
    Glove: { icon: "🧤" },
    Hair: { icon: "💇🏻‍♀" },
    Overall: { icon: "👗" },
    Shoes: { icon: "👟" },
    Cape: { icon: "🎒" },
    Cash: { icon: "🔫" },
    etc: { icon: "" },
};
window.addEventListener("DOMContentLoaded", (event) => {
    main();
});
window.scrollToTop = () => {
    document.getElementById("scroll_area").scroll(0, 0);
};
window.setZoom = (value, action) => {
    _character.zoom = value;
    _character.animating = value === 1 ? true : false;
    _character.action = _character.action.indexOf("1") >= 0 ? `${action}1` : `${action}2`;
    refresh();
};

window.setTransparent = () => {
    if (selectedCategoryFlag === "FaceAccessory" && _character.selectedItems.Face) {
        _character.selectedItems.Face.visible = true;
    }
    delete _character.selectedItems[selectedCategoryFlag];
    refresh();
};
window.initializeCharacter = () => {
    _character = JSON.parse(JSON.stringify(characterInitialValue));
    setSelectedColorToInitialize();
    setCharacterAPIVersion(_character, locale, version);
    buttonInitialSetting();
    refresh();
};
window.setHairColor = function (event, num) {
    let colorBtns = document.getElementById("hair_color_chips_first").children;
    for (let i = 0; i < colorBtns.length; i++) {
        colorBtns[i].className = colorBtns[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";
    setSelectedColor("hair", "back", num);
    refresh();
};
window.set2ndHairColor = function (event, num) {
    let colorBtns = document.getElementById("hair_color_chips_second").children;
    for (let i = 0; i < colorBtns.length; i++) {
        colorBtns[i].className = colorBtns[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";

    setSelectedColor("hair", "front", num);
    refresh();
};
window.setLensColor = function (num) {
    let colorBtns = document.getElementById("face_color_chips_first").children;
    for (let i = 0; i < colorBtns.length; i++) {
        colorBtns[i].className = colorBtns[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";

    setSelectedColor("lens", "back", num);
    refresh();
};
window.set2ndLensColor = function (num) {
    let colorBtns = document.getElementById("face_color_chips_second").children;
    for (let i = 0; i < colorBtns.length; i++) {
        colorBtns[i].className = colorBtns[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";

    setSelectedColor("lens", "front", num);
    refresh();
};

window.getDownloadCharacterUrl = () => {
    var x = new XMLHttpRequest();
    x.open("GET", generateAvatarLink(_character), true);
    x.responseType = "blob";
    x.onload = function (e) {
        download(e.target.response, "mepuri", "image/png");
    };
    x.send();
};
window.setHandMotion = (value) => {
    switch (value) {
        case 0:
            _character.action = "stand1";
            break;
        case 1:
            _character.action = "stand2";
            break;
        case 2:
            break;
    }
    refresh();
};

window.showList = (event, category) => {
    const list_wrapper = document.getElementById("item_list");
    list_wrapper.innerHTML = "";
    selectedCategoryFlag = category;
    clearFilterInput();
    scrollToTop();

    let menuBtns = document.getElementsByClassName("sub_menu_btn");
    for (let i = 0; i < menuBtns.length; i++) {
        menuBtns[i].className = menuBtns[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";

    switch (category) {
        case "FaceAccessory":
        case "EyeDecoration":
        case "Earrings":
        case "Hat":
        case "Top":
        case "Bottom":
        case "Face":
        case "Glove":
        case "Hair":
        case "Overall":
        case "Shoes":
        case "Cape":
        case "Cash":
            data[category].forEach((item) => {
                list_wrapper.insertBefore(createItemListButton(item, setSelectedItem), list_wrapper.children[0]);
            });
            break;
        case "Ear":
            earList.forEach((item) => {
                list_wrapper.appendChild(createEarListButton(item, setCharacterEar));
            });
            break;
        case "Skin":
            skinList.forEach((item) => {
                list_wrapper.appendChild(createSkinListButton(item, setCharacterSkin));
            });
            break;
        default:
            break;
    }
    // lazyloading();
};

window.rangeSlide = (id, value) => {
    document.getElementById(id + "Value").innerHTML = `${value}:${100 - value}`;
    setSelectedOpacity(id, value);
    if (document.getElementById("character_area_front"))
        document.getElementById("character_area_front").style.opacity = `${selectedColor.hair.front.opacity}`;
};

window.setEffect = () => {
    const random = Math.floor(Math.random() * (EMOTION.length - 0)) + 0;
    _character.emotion = EMOTION[random];
    refresh();
    setTimeout(() => {
        _character.emotion = "default";
        refresh();
    }, 1000);
};

function setSelectedColor(type, position, value) {
    selectedColor[type][position].value = value;
}
function setSelectedOpacity(id, value) {
    const type = id === "hairSlider" ? "hair" : "lens";
    const position = "front";
    selectedColor[type][position].opacity = (100 - value) / 100;
}
function setSelectedColorToInitialize() {
    setSelectedColor("hair", "back", 0);
    setSelectedColor("hair", "front", 0);
    setSelectedColor("lens", "back", 0);
    setSelectedColor("lens", "front", 0);
}

function setSelectedItem(target) {
    if (!_character.selectedItems[selectedCategoryFlag]) {
        _character.selectedItems[selectedCategoryFlag] = data[selectedCategoryFlag][0];
    }

    function findVisibleData(id) {
        let value = true;
        FaceAccessoryVisibleData.find((object) => {
            if (object.id === id) {
                value = object.isVisibleFace;
            }
        });
        return value;
    }
    _character.selectedItems[selectedCategoryFlag].id = target.value;
    _character.selectedItems[selectedCategoryFlag].name = categories[selectedCategoryFlag].icon + target.textContent;
    switch (selectedCategoryFlag) {
        case "EyeDecoration":
        case "Earrings":
        case "Hat":
        case "Shoes":
        case "Cape":
        case "Cash":
        case "Glove":
            break;
        case "FaceAccessory":
            _character.selectedItems.Face.visible = findVisibleData(target.value);
            break;
        case "Top":
            delete _character.selectedItems.Overall;
            break;
        case "Bottom":
            delete _character.selectedItems.Overall;
            break;
        case "Face":
            _character.selectedItems.Face.id = getFaceIdAsColor(target.value.toString(), selectedColor.lens.back.value);
            break;
        case "Hair":
            _character.selectedItems.Hair.id = getHairIdAsColor(target.value, selectedColor.hair.back.value);
            break;
        case "Overall":
            delete _character.selectedItems.Top;
            delete _character.selectedItems.Bottom;
            break;
        default:
            break;
    }
    refresh();
}
/** set character item */
function setCharacterEar(id) {
    _character.highFloraEars = false;
    _character.illiumEars = false;
    _character.mercEars = false;
    switch (parseInt(id, 10)) {
        case EAR_TYPE.HIGHLEAF:
            _character.highFloraEars = true;
            break;
        case EAR_TYPE.ILLIUM:
            _character.illiumEars = true;
            break;
        case EAR_TYPE.MERCEDES:
            _character.mercEars = true;
            break;
        case EAR_TYPE.GENERAL:
        default:
            break;
    }
    refresh();
}
function setCharacterSkin(id) {
    _character.selectedItems.Body.id = parseInt(id, 10);
    _character.selectedItems.Head.id = parseInt(id, 10) + 10000;
    refresh();
}
let waiting = false;

function throttle(callback, limit = 100) {
    if (!waiting) {
        callback.apply(this, arguments);
        waiting = true;
        setTimeout(() => {
            waiting = false;
        }, limit);
    }
}
function refresh() {
    let _characterFront = JSON.parse(JSON.stringify(_character));
    setColors(_character, _characterFront, selectedColor);
    throttle(() => {
        if (
            selectedColor.hair.front.value === selectedColor.hair.back.value &&
            selectedColor.lens.front.value === selectedColor.lens.back.value
        ) {
            drawFrontCharacter(_characterFront, 0);
            drawCharacter(_character);
        } else {
            drawFrontCharacter(_characterFront, selectedColor.hair.front.opacity);
            drawCharacter(_character);
        }
        setSelectedItemInfo(_character, selectedCategoryFlag);
    }, 100);
}

const information = [""];
function main() {
    document.getElementById("info_area").innerText = "📢 [알림] !메푸리 코디 개발중! 테스트 버전입니다.";
    getAllItemList(data).then(() => {
        createSettingPanelDom();
        initializeCharacter();
        triggerClickEvent(document.getElementsByClassName("sub_menu_btn")[0]);
        refresh();
        // lazyloading();
    });
}
