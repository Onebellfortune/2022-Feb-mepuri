import { EAR_TYPE, SKIN_TYPE, earList, skinList } from "./constants.js";
import { apiUrl, locale, version } from "../common/apiInfo.js";

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

window.filterSelection = function (event, selectedFilter) {
    var x, i;
    clearList();
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
        if (x[i].className.indexOf(selectedFilter) > -1) {
            if (!once) {
                triggerClickEvent(x[i]);
                once = true;
            }
            w3AddClass(x[i], "show");
        }
    }
};

function triggerClickEvent(element) {
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
    listBtn.setAttribute("class", "general_btn");
    listBtn.innerText = item.name;
    listBtn.value = item.id;
    listBtn.style.backgroundImage = `url("${apiUrl}/${locale}/${version}/item/${item.id}/icon")`;
    listBtn.addEventListener("click", (event) => {
        setSelectedItem(event.target);
    });
    list.appendChild(listBtn);
    return list;
}
export function createEarListButton(item, setCharacterEar) {
    const list = document.createElement("li");
    const listBtn = document.createElement("button");
    listBtn.setAttribute("class", "general_btn");
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
    listBtn.setAttribute("class", "general_btn");
    listBtn.innerText = item.name;
    listBtn.value = item.id;
    listBtn.addEventListener("click", (event) => {
        setCharacterSkin(event.target.value);
    });
    list.appendChild(listBtn);
    return list;
}
