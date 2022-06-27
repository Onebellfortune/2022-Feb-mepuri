import { EAR_TYPE, SKIN_TYPE, earList, skinList } from "./constants.js";
import { apiUrl, version, locale } from "../common/apiInfo.js";
let errorURLList404 = [];

window.myfilter = function () {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("item_list");
    li = ul.getElementsByTagName("li");
    ul.style.display = "none";
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("button")[0];
        txtValue = a.name || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
    ul.style.display = "";
};
function clearList() {
    document.getElementById("item_list").innerHTML = "";
}
export function clearFilterInput() {
    document.getElementById("myInput").value = "";
}
window.filterSelection = function (event, selectedFilter) {
    var x, i;
    clearList();
    clearFilterInput();
    let once = false;

    let menuBtns = document.getElementsByClassName("top_menu_btn");
    for (i = 0; i < menuBtns.length; i++) {
        menuBtns[i].className = menuBtns[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";

    x = document.getElementsByClassName("sub_menu_btn");
    if (selectedFilter == "all") selectedFilter = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (selectedFilter === "") {
            hiddenSubMenuPanel();
            showSettingPanel();
            document.getElementById("sub_menu_wrapper").className = "sub_menu_wrapper right";
        } else if (x[i].className.indexOf(selectedFilter) > -1) {
            if (!once) {
                document.getElementById("sub_menu_wrapper").className = "sub_menu_wrapper";
                hiddenSettingPanel();
                showSubMenuPanel();
                triggerClickEvent(x[i]);
                once = true;
            }
            w3AddClass(x[i], "show");
        }
    }
};

function showSettingPanel() {
    document.getElementById("setting").style.display = "";
}
function hiddenSettingPanel() {
    document.getElementById("setting").style.display = "none";
}
function hiddenSubMenuPanel() {
    document.getElementById("item_list_wrapper").style.display = "none";
}
function showSubMenuPanel() {
    document.getElementById("item_list_wrapper").style.display = "";
}
export function triggerClickEvent(element) {
    let event = document.createEvent("MouseEvents");
    event.initEvent("click", false, true);
    element.dispatchEvent(event);
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

export function createItemListButton(item, setSelectedItem) {
    const list = document.createElement("li");
    const listBtn = document.createElement("button");

    if (item.typeInfo.subCategory === "Hair" || item.typeInfo.subCategory === "Face")
        listBtn.setAttribute("class", "general_list_btn lazy");
    else listBtn.setAttribute("class", "general_list_btn height_fit lazy");

    if (item.typeInfo.subCategory === "Hair") {
        listBtn.innerText = `${item.name} ${item.requiredGender === 0 ? "(남)" : item.requiredGender === 1 ? "(여)" : ``}`; // item.name; //
    } else if (item.typeInfo.subCategory === "Face") {
        listBtn.innerText = `${item.name} ${item.requiredGender === 0 ? "" : item.requiredGender === 1 ? "(여)" : ``}`;
    } else if (item.typeInfo.subCategory === "Overall") {
        listBtn.innerText = `${item.name} ${item.requiredGender === 0 ? "(남)" : item.requiredGender === 1 ? "(여)" : ``}`;
    } else {
        listBtn.innerText = item.name; // `${item.name} ${item.requiredGender === 0 ? "(남)" : item.requiredGender === 1 ? "(여)" : ``}`;
    }

    if (["specialLabel", "choiceHair", "choiceFace", "basicFaceFemale", "basicFaceMale"].includes(item.isCashShopItem)) {
        listBtn.className += " cash_shop_item";
    } else if (["royalHair", "royalFace"].includes(item.isCashShopItem)) {
        listBtn.className += " royal_item";
    } else if (item.isCashShopItem === "eventShop") {
        listBtn.className += " event_shop_item";
    }
    listBtn.id = `${item.typeInfo.subCategory}_${item.id}`;
    listBtn.value = item.id;
    // listBtn.style.backgroundImage = `url("${apiUrl}/${item.region}/${item.version}/item/${item.id}/icon")`;
    listBtn.addEventListener("click", (event) => {
        setSelectedItem(event.target, item);
    });
    // if (item.name.indexOf('undefined')) console.error(item);
    list.appendChild(listBtn);
    return list;
}
export function createEarListButton(item, setCharacterEar) {
    const list = document.createElement("li");
    const listBtn = document.createElement("button");
    listBtn.setAttribute("class", "general_list_btn");
    listBtn.innerText = item.name;
    listBtn.value = item.id;
    listBtn.addEventListener("click", (event) => {
        setCharacterEar(event.target.value);
    });
    list.appendChild(listBtn);
    return list;
}
export function createSkinListButton(item, setCharacterSkin) {
    const list = document.createElement("li");
    const listBtn = document.createElement("button");
    listBtn.setAttribute("class", "general_list_btn");
    listBtn.innerText = item.name;
    listBtn.value = item.id;
    listBtn.addEventListener("click", (event) => {
        setCharacterSkin(event.target.value);
    });
    list.appendChild(listBtn);
    return list;
}
export const lazyloading = () => {
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
                    // img.style.backgroundImage = `url("${apiUrl}/${locale}/${version}/item/${img.value}/icon")`;
                    if (img.id.indexOf("Face") >= 0) {
                        const imgUrl = `${apiUrl}/${locale}/${version}/item/${img.value}`;
                        fetch(imgUrl)
                            .then((res) => {
                                return res.json();
                            })
                            .then((res) => {
                                img.style.backgroundImage = `url("data:image/png;base64, ${res.frameBooks.default.frames[0].effects.face.image}")`;
                            });
                        // img.offsetTop: 실질적으로 img가 위치한 높이
                        // img.src = img.dataset.src;
                    } else {
                        img.style.backgroundImage = `url("${apiUrl}/${locale}/${version}/item/${img.value}/icon")`;
                    }
                    img.classList.remove("lazy");
                }
            });
            if (lazyloadImages.length == 0) {
                document.getElementById("item_list").removeEventListener("scroll", lazyload);
                // window.removeEventListener("resize", lazyload);
                // window.removeEventListener("orientationChange", lazyload);
            }
        }, 50);
    };
    document.getElementById("scroll_area").addEventListener("scroll", lazyload);
    // window.addEventListener("resize", lazyload);
    // window.addEventListener("orientationChange", lazyload)
    lazyload();
};
