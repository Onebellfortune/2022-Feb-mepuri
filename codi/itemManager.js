import { callAPI } from "../common/apiCall.js";
import { apiUrl, version, locale } from "../common/apiInfo.js";
import { EAR_TYPE, SKIN_TYPE, earList, skinList } from "./constants.js";

export function getAllItemList(data) {
    let CashName = [];
    let FaceAccName = [];

    return callAPI(`${apiUrl}/${locale}/${version}/item/category/Equip`).then((res) => {
        const allList = res;
        allList.forEach((element) => {
            element.region = locale;
            element.version = version;
            const subCategoryTrim = element.typeInfo.subCategory.replace(/ /gi, "");
            switch (subCategoryTrim) {
                case "EyeDecoration":
                case "Earrings":
                case "Hat":
                case "Top":
                case "Bottom":
                    data[subCategoryTrim].push(element);
                    break;
                case "Glove":
                case "Overall":
                case "Shoes":
                case "Cape":
                    if (element.isCash) data[subCategoryTrim].push(element);
                    break;
                case "FaceAccessory":
                    if (FaceAccName.indexOf(element.name) < 0) {
                        data[subCategoryTrim].push(element);
                        FaceAccName.push(element.name);
                    }
                    break;
                case "Face":
                    const numOfId = parseInt(element.id, 10);
                    const thirdNum = parseInt((numOfId / 100) % 10, 10);
                    if (thirdNum === 0) {
                        data[subCategoryTrim].push(element);
                    }
                    break;
                case "Hair":
                    if (element.name.indexOf("검은색 ") === 0) {
                        element.name = element.name.slice(4);
                        data[subCategoryTrim].push(element);
                    }
                    break;
                case "Cash":
                default:
                    if (
                        element.typeInfo.category === "Two-Handed Weapon" ||
                        element.typeInfo.category === "One-Handed Weapon"
                    ) {
                        if (CashName.indexOf(element.name) < 0) {
                            if (element.isCash) data.Cash.push(element);
                            CashName.push(element.name);
                        }
                    } else data.etc.push(element);
                    break;
            }
        });
    });
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
function getCharacterEarName(_character) {
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
export function setSelectedItemInfo(character, selectedCategoryFlag) {
    if (selectedCategoryFlag.toLowerCase() === "skin" || selectedCategoryFlag.toLowerCase() === "ear") {
        document.getElementById("character_Skin").innerText = `${getCharacterSkinName(
            character.selectedItems.Body.id
        )} / ${getCharacterEarName(character)}`;
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
export function getHairIdAsColor(id, num) {
    return `${parseInt(parseInt(id, 10) / 10, 10)}${num}`;
}
export function getFaceIdAsColor(id, num) {
    return `${id.toString().slice(0, 2)}${num}${id.toString().slice(3)}`;
}
export function setColors(back, front, selectedColor) {
    const hairId = back.selectedItems.Hair.id;
    const faceId = back.selectedItems.Face.id;
    back.selectedItems.Hair.id = getHairIdAsColor(hairId, selectedColor.hair.back.value);
    back.selectedItems.Face.id = getFaceIdAsColor(faceId, selectedColor.lens.back.value);
    front.selectedItems.Hair.id = getHairIdAsColor(hairId, selectedColor.hair.front.value);
    front.selectedItems.Face.id = getFaceIdAsColor(faceId, selectedColor.lens.front.value);
}

export function setCharacterAPIVersion(_character, locale, version) {
    _character.selectedItems.Body.region = locale;
    _character.selectedItems.Body.version = version;
    _character.selectedItems.Head.region = locale;
    _character.selectedItems.Head.version = version;
    _character.selectedItems.Hair.region = locale;
    _character.selectedItems.Hair.version = version;
    _character.selectedItems.Face.region = locale;
    _character.selectedItems.Face.version = version;
    _character.selectedItems.Overall.region = locale;
    _character.selectedItems.Overall.version = version;
}