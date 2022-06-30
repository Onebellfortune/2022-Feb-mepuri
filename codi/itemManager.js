import { callAPI } from "../common/apiCall.js";
import { apiUrl, version, locale } from "../common/apiInfo.js";
import { EAR_TYPE, CATEGORIES, earList, skinList } from "./constants.js";
import {
    royalHair,
    royalFace,
    choiceHair,
    choiceFace,
    basicFaceFemale,
    basicFaceMale,
    specialLabel,
    eventShop,
    awardsFace,
    awardsHair,
} from "./data/current-cash-shop-items.js";

export let dataIncludingUri = [];
export function getAllItemList(data) {
    let CashName = [];
    let FaceAccName = [];
    let duplicateNameCheckCloths = [];
    // let duplicateNameCheckWeapon = [];

    return callAPI(`${apiUrl}/${locale}/${version}/item/category/Equip`)
        .then((allList) => {
            allList.forEach((element) => {
                const subCategoryTrim = element.typeInfo.subCategory.replace(/ /gi, "");

                element.region = locale;
                element.version = version;

                switch (subCategoryTrim) {
                    case "EyeDecoration":
                    case "Earrings":
                    case "Hat":
                    case "Top":
                    case "Bottom":
                        if (isAddedFront(element)) {
                            data[subCategoryTrim].push(element);
                        } else {
                            data[subCategoryTrim].unshift(element);
                        }
                        break;
                    case "Glove":
                    case "Shoes":
                    case "Cape":
                        if (element.isCash) {
                            if (isAddedFront(element)) {
                                data[subCategoryTrim].push(element);
                            } else {
                                data[subCategoryTrim].unshift(element);
                            }
                        }
                        break;
                    case "Overall":
                        // 중복체크시 이름으로만 판단하면 남/녀 이름 같은경우 추가안되는 문제발생.
                        const duplicationItem = duplicateNameCheckCloths.find((item) => item.name === element.name);
                        if (!duplicationItem) {
                            if (isAddedFront(element)) {
                                data[subCategoryTrim].push(element);
                            } else {
                                data[subCategoryTrim].unshift(element);
                            }
                            duplicateNameCheckCloths.push(element);
                        } else {
                            switch (element.requiredGender) {
                                case 0:
                                    if (
                                        element.requiredGender === 0 &&
                                        duplicationItem.requiredGender === element.requiredGender
                                    ) {
                                    }
                                    break;
                                case 3:
                                    break;
                                case 1:
                                case 2:
                                    if (!element.isCash) break;
                                    if (element.requiredGender + duplicationItem.requiredGender === 1) {
                                        // 남.녀 페어
                                        if (isAddedFront(element)) {
                                            data[subCategoryTrim].push(element);
                                        } else {
                                            data[subCategoryTrim].unshift(element);
                                        }
                                        duplicateNameCheckCloths.push(element);
                                    } else if (element.requiredGender === duplicationItem.requiredGender) {
                                        // 중복임
                                    } else {
                                        // 중복으로보임
                                    }

                                    break;
                            }
                        }
                        break;
                    case "FaceAccessory":
                        if (FaceAccName.indexOf(element.name) < 0) {
                            if (isAddedFront(element)) {
                                data[subCategoryTrim].push(element);
                            } else {
                                data[subCategoryTrim].unshift(element);
                            }
                            FaceAccName.push(element.name);
                        }
                        break;
                    case "Face":
                        const numOfId = parseInt(element.id, 10);
                        const thirdNum = parseInt((numOfId / 100) % 10, 10);
                        if (thirdNum === 0) {
                            if (isAddedFront(element)) {
                                data[subCategoryTrim].push(element);
                            } else {
                                data[subCategoryTrim].unshift(element);
                            }
                        }
                        break;
                    case "Hair":
                        if (element.name.indexOf("검은색 ") === 0) {
                            element.name = element.name.slice(4);
                            if (isAddedFront(element)) {
                                data[subCategoryTrim].push(element);
                            } else {
                                data[subCategoryTrim].unshift(element);
                            }
                        }
                        break;
                    case "Cash":
                    default:
                        if (
                            element.typeInfo.category === "Two-Handed Weapon" ||
                            element.typeInfo.category === "One-Handed Weapon"
                        ) {
                            if (CashName.indexOf(element.name) < 0) {
                                if (element.isCash) {
                                    if (isAddedFront(element)) {
                                        data.Cash.push(element);
                                    } else {
                                        data.Cash.unshift(element);
                                    }
                                }
                                CashName.push(element.name);
                            }
                        } else data.etc.push(element);
                        break;
                }
                setCategoryIfCashShop(element);
            });
        })
        .then(() => {
            // rearrageData(data);
        });
}
function setCategoryIfCashShop(item) {
    if (royalHair.includes(item.name)) {
        item.isCashShopItem = "royalHair";
    } else if (royalFace.includes(item.name)) {
        item.isCashShopItem = "royalFace";
    } else if (specialLabel.includes(item.name)) {
        item.isCashShopItem = "specialLabel";
    } else if (choiceHair.includes(item.name)) {
        item.isCashShopItem = "choiceHair";
    } else if (choiceFace.includes(item.name)) {
        item.isCashShopItem = "choiceFace";
    } else if (basicFaceFemale.includes(item.name)) {
        item.isCashShopItem = "basicFaceFemale";
    } else if (basicFaceMale.includes(item.name)) {
        item.isCashShopItem = "basicFaceMale";
    } else if (specialLabel.includes(item.name)) {
        item.isCashShopItem = "specialLabel";
    } else if (eventShop.includes(item.name)) {
        item.isCashShopItem = "eventShop";
    } else if (awardsFace.includes(item.name)) {
        item.isCashShopItem = "awardsFace";
    } else if (awardsHair.includes(item.name)) {
        item.isCashShopItem = "awardsHair";
    }
}

function rearrageData(data) {
    data["Hair"] = data["Hair"]
        .filter((item) => !isCashShopItem(royalHair, item))
        .concat(data["Hair"].filter((item) => isCashShopItem(royalHair, item)));
    data["Face"] = data["Face"]
        .filter((item) => !isCashShopItem(royalFace, item))
        .concat(data["Face"].filter((item) => isCashShopItem(royalFace, item, "royalFace")));
    data["Overall"] = data["Overall"]
        .filter((item) => !isCashShopItem(specialLabel, item))
        .concat(data["Overall"].filter((item) => isCashShopItem(specialLabel, item, "specialLabel")));
}
function isAddedFront(item) {
    return (
        isCashShopItem(royalHair, item) ||
        isCashShopItem(royalFace, item) ||
        isCashShopItem(choiceHair, item) ||
        isCashShopItem(choiceFace, item) ||
        isCashShopItem(royalFace, item) ||
        isCashShopItem(basicFaceFemale, item) ||
        isCashShopItem(basicFaceMale, item) ||
        isCashShopItem(specialLabel, item) ||
        isCashShopItem(eventShop, item) ||
        isCashShopItem(awardsFace, item) ||
        isCashShopItem(awardsHair, item)
    );
}
function isCashShopItem(cashShopList, item, cashCategory) {
    return cashShopList.includes(item.name);
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
    if (back.selectedItems.Hair) {
        const hairId = back.selectedItems.Hair.id;
        back.selectedItems.Hair.id = getHairIdAsColor(hairId, selectedColor.hair.back.value);
        front.selectedItems.Hair.id = getHairIdAsColor(hairId, selectedColor.hair.front.value);
    }
    if (back.selectedItems.Face) {
        const faceId = back.selectedItems.Face.id;
        back.selectedItems.Face.id = getFaceIdAsColor(faceId, selectedColor.lens.back.value);
        front.selectedItems.Face.id = getFaceIdAsColor(faceId, selectedColor.lens.front.value);
    }
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
