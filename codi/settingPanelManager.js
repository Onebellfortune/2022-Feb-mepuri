import { triggerClickEvent } from "./menuManager";

export function createSettingPanelDom() {
    const hairWrapper = document.getElementById("hair_color_chips_wrapper");
    const faceWrapper = document.getElementById("face_color_chips_wrapper");
    createHairSelectionDom(hairWrapper);
    createLensSelectionDom(faceWrapper);
}

export function buttonInitialSetting() {
    const colorButtons = [
        "hair_color_chips_first",
        "hair_color_chips_second",
        "face_color_chips_first",
        "face_color_chips_second",
    ];
    colorButtons.forEach((id) => {
        if (!document.getElementById(id)) return;
        Array.prototype.slice.call(document.getElementById(id).children).forEach((element) => {
            element.className = element.className.replace(" active", "");
        });
        document.getElementById(id).children[0].className += " active";
    });
    if (document.getElementById("hairSlider")) {
        document.getElementById("hairSlider").value = "50";
        triggerClickEvent(document.getElementById("hairSlider"));
    }
}

function createHairSelectionDom(wrapper) {
    const firstColor = document.createElement("div");
    firstColor.setAttribute("id", "hair_color_chips_first");
    firstColor.style.display = "inherit";

    const secondColor = document.createElement("div");
    secondColor.setAttribute("id", "hair_color_chips_second");
    secondColor.style.display = "inherit";

    for (let i = 0; i < 8; i++) {
        const button = document.createElement("button");
        button.setAttribute("id", `H${i}`);
        button.setAttribute("class", `H${i} color_chip`);
        button.setAttribute("value", i);
        button.addEventListener("click", (event) => {
            setHairColor(event, event.target.value);
        });
        firstColor.appendChild(button);

        const button2 = document.createElement("button");
        button2.setAttribute("id", `H${i}`);
        button2.setAttribute("class", `H${i} color_chip`);
        button2.setAttribute("value", i);
        button2.addEventListener("click", (event) => {
            set2ndHairColor(event, event.target.value);
        });
        secondColor.appendChild(button2);
    }

    const slidecontainerForHair = document.createElement("div");
    slidecontainerForHair.setAttribute("class", "slidecontainer");

    const valueLabel = document.createElement("div");
    valueLabel.setAttribute("id", "hairSliderValue");
    valueLabel.setAttribute("class", "rangeValue");

    const rangeSlider = document.createElement("input");
    rangeSlider.setAttribute("id", "hairSlider");
    rangeSlider.setAttribute("type", "range");
    rangeSlider.setAttribute("min", "1");
    rangeSlider.setAttribute("max", "99");
    rangeSlider.setAttribute("value", "50");
    rangeSlider.setAttribute("class", "range");
    rangeSlider.setAttribute("oninput", "rangeSlide(this.id, this.value)");
    rangeSlider.setAttribute("onmousemove", "rangeSlide(this.id, this.value)");
    rangeSlider.setAttribute("onclick", "rangeSlide(this.id, this.value)");

    slidecontainerForHair.append(valueLabel);
    slidecontainerForHair.append(rangeSlider);

    wrapper.appendChild(firstColor);
    // wrapper.appendChild(slidecontainerForHair);
    // wrapper.appendChild(secondColor);
}

function createLensSelectionDom(wrapper) {
    const firstColor = document.createElement("div");
    firstColor.setAttribute("id", "face_color_chips_first");
    firstColor.style.display = "inherit";

    const secondColor = document.createElement("div");
    secondColor.setAttribute("id", "face_color_chips_second");
    secondColor.style.display = "inherit";

    for (let i = 0; i < 8; i++) {
        const button = document.createElement("button");
        button.setAttribute("id", `F${i}`);
        button.setAttribute("class", `F${i} color_chip`);
        button.setAttribute("value", i);
        button.addEventListener("click", (event) => {
            setLensColor(event.target.value);
        });
        firstColor.appendChild(button);

        const button2 = document.createElement("button");
        button2.setAttribute("id", `F${i}`);
        button2.setAttribute("class", `F${i} color_chip`);
        button2.setAttribute("value", i);
        button2.addEventListener("click", (event) => {
            set2ndLensColor(event.target.value);
        });
        secondColor.appendChild(button2);
    }

    wrapper.appendChild(firstColor);
    // wrapper.appendChild(secondColor);
}
