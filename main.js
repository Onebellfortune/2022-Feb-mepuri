const apiUrl = "https://maplestory.io/api";
const locale = "KMS";
const version = "360";

const EAR_TYPE = {
    GENERAL: 0,
    MERCEDES: 1,
    HIGHLEAF: 2,
    ILLIUM: 3,
};
const SKIN_TYPE = {
    GENERAL: 0,
    MERCEDES: 1,
    HIGHLEAF: 2,
    ILLIUM: 3,
};

const earList = [
    { category: "Ear", name: "일반", id: EAR_TYPE.GENERAL },
    { category: "Ear", name: "메르세데스", id: EAR_TYPE.MERCEDES },
    { category: "Ear", name: "하이레프", id: EAR_TYPE.HIGHLEAF },
    { category: "Ear", name: "일리움", id: EAR_TYPE.ILLIUM },
];

const skinList = [{ category: "Skin", name: "크림", id: EAR_TYPE.GENERAL }];

let selectedCategoryFlag = "";
let cashItem;

let Accessory;
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
let weapon = [];
let etc = [];
function callAPI(url) {
    return $.ajax({
        url,
        type: "GET",
        success: function (res) {
            console.log(res);
            // cashItem = res.Cash;
        },
        error: function () {},
        complete: function () {},
    });
}

//   action: "stand1"
// emotion: "default"
// fhSnap: true
// flipX: false
// frame: 0
// id: 1645079875155
// illiumEars: false
// includeBackground: true
// mercEars: false
// name: ""
// position: {x: -166, y: -191}
// selectedItems: {Body: {…}, Head: {…}}
// skin: 2000
// type: "character"
// visible: true
// zoom: 1
let character = {
    animating: undefined,
    action: "stand1",
    frame: 0,
    mercEars: true,
    illiumEars: false,
    highFloraEars: false,
    zoom: 3,
    name: "",
    flipX: false,
    includeBackground: true,
    selectedItems: {
        Body: {
            name: "Body",
            noIcon: true,
            id: 2000,
            region: locale,
            version: version,
            typeInfo: {
                category: "Character",
                highItemId: 2999,
                lowItemId: 2000,
                overallCategory: "Character",
                subCategory: "Body",
            },
        },
        Head: {
            name: "Head",
            noIcon: true,
            id: 12000,
            region: locale,
            version: version,
            typeInfo: {
                category: "Character",
                highItemId: 12999,
                lowItemId: 12000,
                overallCategory: "Character",
                subCategory: "Head",
            },
        },
        Shoes: {},
    },
};

function getAllCashItems() {
    const sampleUrl = `${apiUrl}/${locale}/${version}/item/count`;
    return callAPI(sampleUrl);
}
function generateAvatarLink(character, linkType) {
    let itemEntries = getCharacterItemEntries(character);

    let backgroundColor = JSON.parse(
        localStorage["backgroundColor"] || false
    ) || {
        hsl: { h: 0, s: 0, l: 0, a: 0 },
        hex: "transparent",
        rgb: { r: 0, g: 0, b: 0, a: 0 },
        hsv: { h: 0, s: 0, v: 0, a: 0 },
        oldHue: 0,
        source: "rgb",
    };
    const bgColorText = `${backgroundColor.rgb.r},${backgroundColor.rgb.g},${backgroundColor.rgb.b},${backgroundColor.rgb.a}`;

    let itemEntriesPayload = JSON.stringify(itemEntries);
    itemEntriesPayload = encodeURIComponent(
        itemEntriesPayload.substr(1, itemEntriesPayload.length - 2)
    );

    let {
        animating,
        action,
        frame,
        mercEars,
        illiumEars,
        highFloraEars,
        zoom,
        name,
        flipX,
        includeBackground,
    } = character;

    return (
        `https://maplestory.io/api/character/${itemEntriesPayload}/${
            linkType ? linkType : `${action}/${animating ? "animated" : frame}`
        }?showears=${mercEars}&showLefEars=${illiumEars}&showHighLefEars=${highFloraEars}&resize=${zoom}&name=${encodeURI(
            name || ""
        )}&flipX=${flipX}` +
        (includeBackground ? `&bgColor=${bgColorText}` : "")
    );
}
function getCharacterItemEntries(character) {
    return Object.values(character.selectedItems)
        .filter(
            (item) => item.id && (item.visible === undefined || item.visible)
        )
        .map((item) => {
            let itemEntry = {
                itemId: Number(item.id),
            };

            if (
                (item.id >= 20000 && item.id < 30000) ||
                (item.id >= 1010000 && item.id < 1020000)
            )
                itemEntry.animationName = character.emotion;
            if (item.region && item.region.toLowerCase() !== "gms")
                itemEntry.region = item.region;
            if (item.version && item.version.toLowerCase() !== "latest")
                itemEntry.version = item.version;
            if (item.hue) itemEntry.hue = item.hue;
            if (item.saturation !== 1) itemEntry.saturation = item.saturation;
            if (item.contrast !== 1) itemEntry.contrast = item.contrast;
            if (item.brightness !== 1) itemEntry.brightness = item.brightness;
            if (item.alpha !== 1) itemEntry.alpha = item.alpha;
            if (item.islot) itemEntry.islot = item.islot;
            if (item.vslot) itemEntry.vslot = item.vslot;
            if (item.equipFrame) itemEntry.equipFrame = item.equipFrame;
            if (item.disableEffect)
                itemEntry.disableEffect = item.disableEffect;
            if (item.glow) itemEntry.glow = item.glow;
            if (item.grayscale) itemEntry.grayscale = item.grayscale;
            if (item.invert) itemEntry.invert = item.invert;
            if (item.oilPaint) itemEntry.oilPaint = item.oilPaint;
            if (item.sepia) itemEntry.sepia = item.sepia;

            return itemEntry;
        });
}
window.addEventListener("DOMContentLoaded", (event) => {
    main();
});
function main() {
    // const sampleUrl = `${apiUrl}/${locale}/${version}/item/01213018/iconRaw`;

    const overallCategory = ["Equip"];
    getAllCashItems().then(function () {});
    // callAPI(`${apiUrl}/${locale}/${version}/item/list`);
    callAPI(`${apiUrl}/${locale}/${version}/item/category/Equip`).then(
        (res) => {
            const allList = res;
            allList.forEach((element) => {
                element.region = locale;
                element.version = version;
                switch (element.typeInfo.subCategory) {
                    case "Face Accessory":
                        FaceAccessory.push(element);
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
                        Face.push(element);
                        break;
                    case "Glove":
                        Glove.push(element);
                        break;
                    case "Hair":
                        Hair.push(element);
                        break;
                    case "Overall":
                        Overall.push(element);
                        break;
                    case "Shoes":
                        Shoes.push(element);
                        break;
                    case "Cape":
                        Cape.push(element);
                        break;
                    case "Cash":
                        break;
                    default:
                        if (
                            element.typeInfo.category === "Two-Handed Weapon" ||
                            element.typeInfo.category === "One-Handed Weapon"
                        )
                            weapon.push(element);
                        else etc.push(element);
                        break;
                }
            });

            character.selectedItems.FaceAccessory = FaceAccessory[0];
            character.selectedItems.EyeDecoration = EyeDecoration[0];
            character.selectedItems.Hat = Hat[0];
            character.selectedItems.Top = Top[0];
            character.selectedItems.Bottom = Bottom[0];
            character.selectedItems.Face = Face[0];
            character.selectedItems.Glove = Glove[0];
            character.selectedItems.Hair = Hair[0];
            character.selectedItems.Overall = Overall[0];
            character.selectedItems.Shoes = Shoes[0];
            character.selectedItems.Cape = Cape[0];
            refresh();
            // console.log(FaceAccessory);
            // console.log(EyeDecoration);
        }
    );
    window.myfilter = function () {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("item_list");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("button")[0];
            txtValue = a.name || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    };
    function createItemListButton(item) {
        const list = document.createElement("li");
        const listBtn = document.createElement("button");
        listBtn.innerText = item.name;
        listBtn.value = item.id;
        listBtn.addEventListener("click", (event) => {
            setSelectedItem(event.target.value);
        });
        list.appendChild(listBtn);
        return list;
    }
    function createEarListButton(item) {
        const list = document.createElement("li");
        const listBtn = document.createElement("button");
        listBtn.innerText = item.name;
        listBtn.value = item.id;
        listBtn.addEventListener("click", (event) => {
            setCharacterEar(event.target.value);
        });
        list.appendChild(listBtn);
        return list;
    }
    window.setTransparent = () => {
        delete character.selectedItems[selectedCategoryFlag];
        refresh();
    };
    window.showList = (category) => {
        // const list_wrapper = document.getElementById("item_list");
        const list_wrapper = document.getElementById("item_list");
        list_wrapper.innerHTML = "";
        selectedCategoryFlag = category;
        switch (category) {
            case "FaceAccessory":
                FaceAccessory.forEach((item) => {
                    list_wrapper.appendChild(createItemListButton(item));
                });
                break;
            case "EyeDecoration":
                EyeDecoration.forEach((item) => {
                    list_wrapper.appendChild(createItemListButton(item));
                });
                break;
            case "Earrings":
                Earrings.forEach((item) => {
                    list_wrapper.appendChild(createItemListButton(item));
                });
                break;
            case "Hat":
                Hat.forEach((item) => {
                    list_wrapper.appendChild(createItemListButton(item));
                });
                break;
            case "Top":
                Top.forEach((item) => {
                    list_wrapper.appendChild(createItemListButton(item));
                });
                break;
            case "Bottom":
                Bottom.forEach((item) => {
                    list_wrapper.appendChild(createItemListButton(item));
                });
                break;
            case "Face":
                Face.forEach((item) => {
                    list_wrapper.appendChild(createItemListButton(item));
                });
                break;
            case "Glove":
                Glove.forEach((item) => {
                    list_wrapper.appendChild(createItemListButton(item));
                });
                break;
            case "Hair":
                Hair.forEach((item) => {
                    list_wrapper.appendChild(createItemListButton(item));
                });
                break;
            case "Overall":
                Overall.forEach((item) => {
                    list_wrapper.appendChild(createItemListButton(item));
                });
                break;
            case "Shoes":
                Shoes.forEach((item) => {
                    list_wrapper.appendChild(createItemListButton(item));
                });
                break;
            case "Cape":
                Cape.forEach((item) => {
                    list_wrapper.appendChild(createItemListButton(item));
                });
                break;
            case "weapon":
                weapon.forEach((item) => {
                    list_wrapper.appendChild(createItemListButton(item));
                });
                break;
            case "Ear":
                earList.forEach((item) => {
                    list_wrapper.appendChild(createEarListButton(item));
                });
                break;
            default:
                break;
        }
    };
    function setSelectedItem(id) {
        console.log(id);
        callAPI(`${apiUrl}/${locale}/${version}/item/${id}`).then((element) => {
            const subCategoryTrim = element.typeInfo.subCategory.replace(
                / /gi,
                ""
            );
            if (!character.selectedItems[subCategoryTrim]) {
                character.selectedItems[subCategoryTrim] =
                    eval(subCategoryTrim)[0];
            }
            switch (subCategoryTrim) {
                case "FaceAccessory":
                    character.selectedItems.FaceAccessory.id = id;
                    break;
                case "EyeDecoration":
                    character.selectedItems.EyeDecoration.id = id;
                    break;
                case "Earrings":
                    character.selectedItems.Earrings.id = id;
                    break;
                case "Hat":
                    character.selectedItems.Hat.id = id;
                    break;
                case "Top":
                    character.selectedItems.Top.id = id;
                    break;
                case "Bottom":
                    character.selectedItems.Bottom.id = id;
                    break;
                case "Face":
                    character.selectedItems.Face.id = id;
                    break;
                case "Glove":
                    character.selectedItems.Glove.id = id;
                    break;
                case "Hair":
                    character.selectedItems.Hair.id = id;
                    break;
                case "Overall":
                    character.selectedItems.Overall.id = id;
                    break;
                case "Shoes":
                    character.selectedItems.Shoes.id = id;
                    break;
                case "Cape":
                    character.selectedItems.Cape.id = id;
                    break;
                default:
                    break;
            }
            refresh();
        });
    }
    function setCharacterEar(id) {
        character.highFloraEars = false;
        character.illiumEars = false;
        character.mercEars = false;
        switch (parseInt(id, 10)) {
            case EAR_TYPE.HIGHLEAF:
                character.highFloraEars = true;
                break;
            case EAR_TYPE.ILLIUM:
                character.illiumEars = true;
                break;
            case EAR_TYPE.MERCEDES:
                character.mercEars = true;
                break;
            case EAR_TYPE.GENERAL:
            default:
                break;
        }
        refresh();
    }
    function refresh() {
        document.getElementById("character_area").src =
            generateAvatarLink(character);
        setSelectedItemInfo(character);
    }
    function setSelectedItemInfo(character) {
        document.getElementById("character_FaceAccessory").innerText = character
            .selectedItems.FaceAccessory
            ? character.selectedItems.FaceAccessory.name
            : "-";
        document.getElementById("character_EyeDecoration").innerText = character
            .selectedItems.EyeDecoration
            ? character.selectedItems.EyeDecoration.name
            : "-";
        document.getElementById("character_Hat").innerText = character
            .selectedItems.Hat
            ? character.selectedItems.Hat.name
            : "-";
        document.getElementById("character_Top").innerText = character
            .selectedItems.Top
            ? character.selectedItems.Top.name
            : "-";
        document.getElementById("character_Bottom").innerText = character
            .selectedItems.Bottom
            ? character.selectedItems.Bottom.name
            : "-";
        document.getElementById("character_Face").innerText = character
            .selectedItems.Face
            ? character.selectedItems.Face.name
            : "-";
        document.getElementById("character_Glove").innerText = character
            .selectedItems.Glove
            ? character.selectedItems.Glove.name
            : "-";
        document.getElementById("character_Hair").innerText = character
            .selectedItems.Hair
            ? character.selectedItems.Hair.name
            : "-";
        document.getElementById("character_Overall").innerText = character
            .selectedItems.Overall
            ? character.selectedItems.Overall.name
            : "-";
        document.getElementById("character_Shoes").innerText = character
            .selectedItems.Shoes
            ? character.selectedItems.Shoes.name
            : "-";
        document.getElementById("character_Cape").innerText = character
            .selectedItems.Cape
            ? character.selectedItems.Cape.name
            : "-";
    }
    // callAPI(`${apiUrl}/${locale}/${version}/item/1190000`);
}
// main();
