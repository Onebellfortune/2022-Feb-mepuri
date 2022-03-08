import { character } from "./data/default_character.js";
import { EAR_TYPE, SKIN_TYPE, earList, skinList } from "./constants.js";
import { generateAvatarLink } from "./avatarManager.js";
import { apiUrl, version, locale, KMS, KMST } from "../common/apiInfo.js";
import {
    clearFilterInput,
    triggerClickEvent,
    createItemListButton,
    createEarListButton,
    createSkinListButton,
} from "./menuManager.js";
import { callAPI } from "../common/apiCall.js";
import { FaceAccessoryVisibleData } from "./data/face_accessory.js";

let _version = version;
let _locale = locale;
let characterString = JSON.stringify(character);
let _character = JSON.parse(characterString); // to deep copy
let frontCharacter = {
    hairID: _character.selectedItems.Hair.id,
    lensID: _character.selectedItems.Face.id,
};

let selectedCategoryFlag = "Hair";
let selectedHairColor = 0;
let selectedLensColor = 0;
let spinner;
let FaceAccessory = [];
let EyeDecoration = [];
let Earrings = [];
let Hat = [];
let Top = [];
let Bottom = [];
let Face = [];
let Glove = [];
let Hair = [];
let Overall = [];
let Shoes = [];
let Cape = [];
let Cash = [];
let etc = [];
function clearAllItemList() {
    FaceAccessory = [];
    EyeDecoration = [];
    Earrings = [];
    Hat = [];
    Top = [];
    Bottom = [];
    Face = [];
    Glove = [];
    Hair = [];
    Overall = [];
    Shoes = [];
    Cape = [];
    Cash = [];
    etc = [];
}
window.addEventListener("DOMContentLoaded", (event) => {
    var opts = {
        lines: 13, // The number of lines to draw
        length: 38, // The length of each line
        width: 17, // The line thickness
        radius: 45, // The radius of the inner circle
        scale: 0.3, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        speed: 1, // Rounds per second
        rotate: 0, // The rotation offset
        animation: "spinner-line-fade-quick", // The CSS animation name for the lines
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: "#0f0f0f", // CSS color or array of colors
        fadeColor: "transparent", // CSS color or array of colors
        top: "10%", // Top position relative to parent
        left: "-50%", // Left position relative to parent
        shadow: "1 1 2px transparent", // Box-shadow for the lines
        zIndex: 2000000000, // The z-index (defaults to 2e9)
        className: "spinner", // The CSS class to assign to the spinner
        position: "relative", // Element positioning
    };
    var target = document.getElementById("character_area_wrapper_wrapper");
    spinner = new Spinner(opts).spin();
    target.appendChild(spinner.el);
    // spinner.stop();
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

const lazyloading = () => {
    const lazyloadImages = Array.prototype.slice.call(document.getElementsByClassName("lazy"));

    let lazyloadThrottleTimeout;
    const lazyload = () => {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }
        lazyloadThrottleTimeout = setTimeout(() => {
            const scrollTop = document.getElementById("scroll_area").scrollTop;
            lazyloadImages.forEach((img) => {
                if (img.offsetTop < window.innerHeight + scrollTop) {
                    img.style.backgroundImage = `url("${apiUrl}/${locale}/${version}/item/${img.value}/icon")`;
                    // img.offsetTop: 실질적으로 img가 위치한 높이
                    // img.src = img.dataset.src;
                    img.classList.remove("lazy");
                }
            });
            if (lazyloadImages.length == 0) {
                document.getElementById("item_list").removeEventListener("scroll", lazyload);
                // window.removeEventListener("resize", lazyload);
                // window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    };
    document.getElementById("scroll_area").addEventListener("scroll", lazyload);
    // window.addEventListener("resize", lazyload);
    // window.addEventListener("orientationChange", lazyload);
};

window.setTransparent = () => {
    if (selectedCategoryFlag === "FaceAccessory" && _character.selectedItems.Face) {
        _character.selectedItems.Face.visible = true;
    }
    delete _character.selectedItems[selectedCategoryFlag];
    refresh();
};
window.initializeCharacter = () => {
    _character = JSON.parse(characterString);
    setCharacterAPIVersion(_locale, _version);
    refresh();
};
window.setHairColor = function (event, num) {
    let colorBtns = document.getElementById("hair_color_chips_first").children;
    for (let i = 0; i < colorBtns.length; i++) {
        colorBtns[i].className = colorBtns[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";

    selectedHairColor = num;
    _character.selectedItems.Hair.id = getHairIdAsColor(_character.selectedItems.Hair.id, num);
    refresh();
};
window.setHair2ndColor = function (event, num) {
    let colorBtns = document.getElementById("hair_color_chips_second").children;
    for (let i = 0; i < colorBtns.length; i++) {
        colorBtns[i].className = colorBtns[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";

    selectedHairColor = num;
    frontCharacter.hairID = getHairIdAsColor(_character.selectedItems.Hair.id, num);
    refresh();
};
window.setLensColor = function (num) {
    let colorBtns = document.getElementById("face_color_chips_first").children;
    for (let i = 0; i < colorBtns.length; i++) {
        colorBtns[i].className = colorBtns[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";

    selectedLensColor = num;
    _character.selectedItems.Face.id = getFaceIdAsColor(_character.selectedItems.Face.id.toString(), num);
    refresh();
};
window.set2ndLensColor = function (num) {
    let colorBtns = document.getElementById("face_color_chips_second").children;
    for (let i = 0; i < colorBtns.length; i++) {
        colorBtns[i].className = colorBtns[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";

    selectedLensColor = num;
    frontCharacter.lensID = getFaceIdAsColor(_character.selectedItems.Face.id.toString(), num);
    refresh();
};
function getHairIdAsColor(id, num) {
    return `${parseInt(parseInt(id, 10) / 10, 10)}${num}`;
}
function getFaceIdAsColor(id, num) {
    return `${id.slice(0, 2)}${num}${id.slice(3)}`;
}
function setCharacterAPIVersion(_locale, _version) {
    if (_locale === "KMS") {
        delete _character.selectedItems.Hat;
        delete _character.selectedItems["One-Handed Blunt Weapon"];
    }
    _character.selectedItems.Body.region = _locale;
    _character.selectedItems.Body.version = _version;
    _character.selectedItems.Head.region = _locale;
    _character.selectedItems.Head.version = _version;
    _character.selectedItems.Hair.region = _locale;
    _character.selectedItems.Hair.version = _version;
    _character.selectedItems.Face.region = _locale;
    _character.selectedItems.Face.version = _version;
    _character.selectedItems.Overall.region = _locale;
    _character.selectedItems.Overall.version = _version;
}
window.getDownloadCharacterUrl = () => {
    var x = new XMLHttpRequest();
    x.open("GET", generateAvatarLink(_character), true);
    x.responseType = "blob";
    x.onload = function (e) {
        download(e.target.response, "awesomesauce.png", "image/png");
    };
    x.send();

    // const imgSrc = generateAvatarLink(_character);
    // var image = new Image();
    // image.crossOrigin = "anonymous";
    // image.src = imgSrc;
    // var fileName = image.src.split("/").pop();
    // image.onload = function () {
    //     var canvas = document.createElement("canvas");
    //     canvas.width = this.width;
    //     canvas.height = this.height;
    //     canvas.getContext("2d").drawImage(this, 0, 0);
    //     if (typeof window.navigator.msSaveBlob !== "undefined") {
    //         window.navigator.msSaveBlob(dataURLtoBlob(canvas.toDataURL()), fileName);
    //     } else {
    //         var link = document.createElement("a");
    //         link.href = canvas.toDataURL();
    //         link.download = fileName;
    //         link.click();
    //     }
    // };
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
window.setAPIVersion = (value) => {
    if (value === "KMS") {
        _locale = "KMS";
        _version = KMS;
    } else {
        _locale = "KMST";
        _version = KMST;
    }
    clearAllItemList();
    getAllItemList();
    // initializeCharacter();
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
            FaceAccessory.forEach((item) => {
                list_wrapper.insertBefore(createItemListButton(item, setSelectedItem), list_wrapper.children[0]);
            });
            break;
        case "EyeDecoration":
            EyeDecoration.forEach((item) => {
                list_wrapper.insertBefore(createItemListButton(item, setSelectedItem), list_wrapper.children[0]);
            });
            break;
        case "Earrings":
            Earrings.forEach((item) => {
                list_wrapper.insertBefore(createItemListButton(item, setSelectedItem), list_wrapper.children[0]);
            });
            break;
        case "Hat":
            Hat.forEach((item) => {
                list_wrapper.insertBefore(createItemListButton(item, setSelectedItem), list_wrapper.children[0]);
            });
            break;
        case "Top":
            Top.forEach((item) => {
                list_wrapper.insertBefore(createItemListButton(item, setSelectedItem), list_wrapper.children[0]);
            });
            break;
        case "Bottom":
            Bottom.forEach((item) => {
                list_wrapper.insertBefore(createItemListButton(item, setSelectedItem), list_wrapper.children[0]);
            });
            break;
        case "Face":
            Face.forEach((item) => {
                list_wrapper.insertBefore(createItemListButton(item, setSelectedItem), list_wrapper.children[0]);
            });
            break;
        case "Glove":
            Glove.forEach((item) => {
                list_wrapper.insertBefore(createItemListButton(item, setSelectedItem), list_wrapper.children[0]);
            });
            break;
        case "Hair":
            Hair.forEach((item) => {
                list_wrapper.insertBefore(createItemListButton(item, setSelectedItem), list_wrapper.children[0]);
            });
            break;
        case "Overall":
            Overall.forEach((item) => {
                list_wrapper.insertBefore(createItemListButton(item, setSelectedItem), list_wrapper.children[0]);
            });
            break;
        case "Shoes":
            Shoes.forEach((item) => {
                list_wrapper.insertBefore(createItemListButton(item, setSelectedItem), list_wrapper.children[0]);
            });
            break;
        case "Cape":
            Cape.forEach((item) => {
                list_wrapper.insertBefore(createItemListButton(item, setSelectedItem), list_wrapper.children[0]);
            });
            break;
        case "Cash":
            Cash.forEach((item) => {
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
    lazyloading();
};

function setSelectedItem(target) {
    //     const subCategoryTrim = element.typeInfo.subCategory.replace(/ /gi, "");
    //     if (!character.selectedItems[subCategoryTrim]) {
    //         character.selectedItems[subCategoryTrim] = eval(subCategoryTrim)[0];
    //     }
    if (!_character.selectedItems[selectedCategoryFlag]) {
        _character.selectedItems[selectedCategoryFlag] = eval(selectedCategoryFlag)[0];
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
    switch (selectedCategoryFlag) {
        case "FaceAccessory":
            _character.selectedItems.FaceAccessory.id = target.value;
            _character.selectedItems.FaceAccessory.name = "🤡 " + target.textContent;
            _character.selectedItems.Face.visible = findVisibleData(target.value);
            break;
        case "EyeDecoration":
            _character.selectedItems.EyeDecoration.id = target.value;
            _character.selectedItems.EyeDecoration.name = "👓 " + target.textContent;
            break;
        case "Earrings":
            _character.selectedItems.Earrings.id = target.value;
            _character.selectedItems.Earrings.name = "👂 " + target.textContent;
            break;
        case "Hat":
            _character.selectedItems.Hat.id = target.value;
            _character.selectedItems.Hat.name = "🧢 " + target.textContent;
            break;
        case "Top":
            delete _character.selectedItems.Overall;
            _character.selectedItems.Top.id = target.value;
            _character.selectedItems.Top.name = "👕 " + target.textContent;
            break;
        case "Bottom":
            delete _character.selectedItems.Overall;
            _character.selectedItems.Bottom.id = target.value;
            _character.selectedItems.Bottom.name = "👖 " + target.textContent;
            break;
        case "Face":
            _character.selectedItems.Face.id = getFaceIdAsColor(target.value.toString(), selectedLensColor);
            _character.selectedItems.Face.name = "👀 " + target.textContent;
            break;
        case "Glove":
            _character.selectedItems.Glove.id = target.value;
            _character.selectedItems.Glove.name = "🧤 " + target.textContent;
            break;
        case "Hair":
            _character.selectedItems.Hair.id = getHairIdAsColor(target.value, selectedHairColor);
            _character.selectedItems.Hair.name = "💇🏻‍♀ " + target.textContent;
            break;
        case "Overall":
            delete _character.selectedItems.Top;
            delete _character.selectedItems.Bottom;
            _character.selectedItems.Overall.id = target.value;
            _character.selectedItems.Overall.name = "👗 " + target.textContent;
            break;
        case "Shoes":
            _character.selectedItems.Shoes.id = target.value;
            _character.selectedItems.Shoes.name = "👟 " + target.textContent;
            break;
        case "Cape":
            _character.selectedItems.Cape.id = target.value;
            _character.selectedItems.Cape.name = "🎒 " + target.textContent;
            break;
        case "Cash":
            _character.selectedItems.Cash.id = target.value;
            _character.selectedItems.Cash.name = "🔫 " + target.textContent;
            break;
        default:
            break;
    }
    refresh();
    // });
}
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
function getCharacterSkinName(id) {
    let skinName = "-";
    skinList.forEach((skin) => {
        if (skin.id === id) {
            skinName = skin.name;
        }
    });
    return skinName;
}
function getCharacterEarName() {
    let earName = "-";
    const id = _character.highFloraEars
        ? EAR_TYPE.HIGHLEAF
        : _character.illiumEars
        ? EAR_TYPE.ILLIUM
        : _character.mercEars
        ? EAR_TYPE.MERCEDES
        : EAR_TYPE.GENERAL;
    earList.forEach((ear) => {
        if (ear.id === id) {
            earName = ear.name;
        }
    });
    return earName;
}
function refresh() {
    // document.getElementById("character_area").setAttribute("src", generateAvatarLink(_character));
    // fetch(generateAvatarLink(_character));
    // const _characterNotanimated = JSON.parse(JSON.stringify(_character));
    // _characterNotanimated.animating = false;
    // document.getElementById("character_area").style.backgroundImage = `url('${generateAvatarLink(
    //     _character
    // )}'), url('${generateAvatarLink(_characterNotanimated)}')`;
    let _characterFront = JSON.parse(JSON.stringify(_character));
    _characterFront.selectedItems.Hair.id = frontCharacter.hairID;
    _characterFront.selectedItems.Face.id = frontCharacter.lensID;

    setSelectedItemToCanvas(_character, _characterFront);
    setSelectedItemInfo(_character);
}
function setSelectedItemToCanvas(character, _characterFront) {
    // document.getElementById("character_area").style.backgroundImage = `url('${generateAvatarLink(
    //     second, undefined, true
    // )}'), url('${generateAvatarLink(character)}')`;
    document.getElementById("character_area").src = `${generateAvatarLink(character)}`;
    document.getElementById("character_area_front").src = `${generateAvatarLink(_characterFront)}`;

    // const httpRequest = new XMLHttpRequest();
    // httpRequest.onreadystatechange = () => {
    //     switch (httpRequest.readyState) {
    //         case 1: // loading ...
    //             break;
    //         case 4:
    //             break;
    //         default:
    //             break;
    //     }
    // };
    // httpRequest.open("GET", generateAvatarLink(character), true);
    // httpRequest.send(null);
}

function setSelectedItemInfo(character) {
    if (selectedCategoryFlag.toLowerCase() === "skin" || selectedCategoryFlag.toLowerCase() === "ear") {
        document.getElementById("character_Skin").innerText = `${getCharacterSkinName(
            character.selectedItems.Body.id
        )} / ${getCharacterEarName()}`;
        document.getElementById("character_Skin").style.display = "block";
        return;
    }
    const selectedItemTextArea = document.getElementById(`character_${selectedCategoryFlag}`);
    if (selectedItemTextArea) {
        if (character.selectedItems[selectedCategoryFlag]) {
            selectedItemTextArea.style.display = "block";
            selectedItemTextArea.innerText = character.selectedItems[selectedCategoryFlag].name;
        } else {
            selectedItemTextArea.style.display = "none";
            selectedItemTextArea.innerText = "-";
        }
    }
}
function getAllItemList() {
    let CashName = [];
    let FaceAccName = [];

    return callAPI(`${apiUrl}/${_locale}/${_version}/item/category/Equip`).then((res) => {
        const allList = res;
        allList.forEach((element) => {
            element.region = _locale;
            element.version = _version;
            switch (element.typeInfo.subCategory) {
                case "Face Accessory":
                    if (FaceAccName.indexOf(element.name) < 0) {
                        FaceAccessory.push(element);
                        FaceAccName.push(element.name);
                    }
                    break;
                case "Eye Decoration":
                    EyeDecoration.push(element);
                    break;
                case "Earrings":
                    Earrings.push(element);
                    break;
                case "Hat":
                    Hat.push(element);
                    break;
                case "Top":
                    Top.push(element);
                    break;
                case "Bottom":
                    Bottom.push(element);
                    break;
                case "Face":
                    const numOfId = parseInt(element.id, 10);
                    const thirdNum = parseInt((numOfId / 100) % 10, 10);
                    if (thirdNum === 0) {
                        Face.push(element);
                    }
                    break;
                case "Glove":
                    if (element.isCash) Glove.push(element);
                    break;
                case "Hair":
                    if (element.name.indexOf("검은색 ") === 0) {
                        element.name = element.name.slice(4);
                        Hair.push(element);
                    }
                    break;
                case "Overall":
                    if (element.isCash) Overall.push(element);
                    break;
                case "Shoes":
                    if (element.isCash) Shoes.push(element);
                    break;
                case "Cape":
                    if (element.isCash) Cape.push(element);
                    break;
                case "Cash":
                default:
                    if (
                        element.typeInfo.category === "Two-Handed Weapon" ||
                        element.typeInfo.category === "One-Handed Weapon"
                    ) {
                        if (CashName.indexOf(element.name) < 0) {
                            if (element.isCash) Cash.push(element);
                            CashName.push(element.name);
                        }
                    } else etc.push(element);
                    break;
            }
        });
    });
}
const information = [""];
function main() {
    spinner.spin();
    document.getElementById("info_area").innerText = "📢 [알림] !개발중! 테스트 버전입니다.";
    getAllItemList().then(() => {
        initializeCharacter();
        console.log(`얼장: ${FaceAccessory.length}
        눈장: ${EyeDecoration.length}
        귀장: ${Earrings.length}
        모자: ${Hat.length}
        탑: ${Top.length}
        하의: ${Bottom.length}
        얼굴: ${Face.length}
        장갑: ${Glove.length}
        머리: ${Hair.length}
        한벌: ${Overall.length}
        신발: ${Shoes.length}
        망토: ${Cape.length}
        무기: ${Cash.length}
        etc: ${etc.length}`);
        triggerClickEvent(document.getElementsByClassName("sub_menu_btn")[0]);

        // cha tete
        // character.selectedItems.FaceAccessory.id = "1011006";
        // character.selectedItems.EyeDecoration.id = "1022285";
        // character.selectedItems.Face.id = 26079;
        // character.selectedItems.Hair.id = "61370";
        refresh();
    });
}
