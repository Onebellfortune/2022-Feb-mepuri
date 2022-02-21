var defaultURL = "https://maplestory.io/api";
var region = "KMS";
var version = "360";

var weapon = document.getElementById("weapon");
//var selectArea = document.getElementById("selection-weapon");
var selectionArea = document.getElementById("select-area");

function init(equip) {
	var slot = document.getElementById(`${equip}`);
	var defaultImg = document.createElement("img");
	defaultImg.id = `thumbnail-${equip}`;
	defaultImg.style = "display:block;";
	defaultImg.src = "https://maplestory.io/api/KMS/360/item/1213018/iconRaw";
	slot.appendChild(defaultImg);
}

function changeImg(e) {
	//console.log(e.target.id);
	var selectedEquip = document.getElementById(`${e.target.id}`);
	//console.log(selectedEquip);
	var equip = e.target.id.substring(10);

	var value = selectedEquip.options[selectedEquip.selectedIndex].value;
	//console.log(value);
	var changeImg = document.createElement("img");
	changeImg.id = `thumbnail-${equip}`;
	changeImg.style = "display:block;";
	changeImg.src = `https://maplestory.io/api/KMS/360/item/${value}/iconRaw`;
	var oldImg = document.getElementById(`thumbnail-${equip}`);

	var target = document.getElementById(`${equip}`);

	target.replaceChild(changeImg, oldImg);
}

function getItemsInfo() {
	callAPI("https://maplestory.io/api/KMS/360/item/category/Equip").then(
		(result) => {
			for (var i = 0; i < weapons.length; i++) {
				var selectArea = document.getElementById("selection-weapon");
				var itemSlot = document.createElement("option");
				// var weaponImg = document.createElement("img");

				// imgURI = `${defaultURL}/${region}/${version}/item/${weapons[i].id}/iconRaw`;

				// weaponImg.src = imgURI;
				// weaponSlot.appendChild(weaponImg);
				itemSlot.value = weapons[i].id;
				itemSlot.textContent = weapons[i].name;
				selectArea.appendChild(itemSlot);
			}
			//console.log(weapons.length);
			for (var i = 0; i < faceAccs.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-face-acc");
				var itemSlot = document.createElement("option");

				itemSlot.value = faceAccs[i].id;
				itemSlot.textContent = faceAccs[i].name;
				selectArea.appendChild(itemSlot);
			}

			for (var i = 0; i < eyeAccs.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-eye-acc");
				var itemSlot = document.createElement("option");

				itemSlot.value = eyeAccs[i].id;
				itemSlot.textContent = eyeAccs[i].name;
				selectArea.appendChild(itemSlot);
			}
			for (var i = 0; i < pendants.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-pendent");
				var selectArea2 = document.getElementById(
					"selection-pendent-add"
				);
				var itemSlot = document.createElement("option");

				itemSlot.value = pendants[i].id;
				itemSlot.textContent = pendants[i].name;
				selectArea.appendChild(itemSlot);
				var itemSlot = document.createElement("option");

				itemSlot.value = pendants[i].id;
				itemSlot.textContent = pendants[i].name;
				selectArea2.appendChild(itemSlot);
			}
			for (var i = 0; i < earrings.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-earrings");
				var itemSlot = document.createElement("option");

				itemSlot.value = earrings[i].id;
				itemSlot.textContent = earrings[i].name;
				selectArea.appendChild(itemSlot);
			}

			for (var i = 0; i < rings.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-ring1");
				var selectArea2 = document.getElementById("selection-ring2");
				var selectArea3 = document.getElementById("selection-ring3");
				var selectArea4 = document.getElementById("selection-ring4");
				var itemSlot = document.createElement("option");

				itemSlot.value = rings[i].id;
				itemSlot.textContent = rings[i].name;
				selectArea.appendChild(itemSlot);
				var itemSlot = document.createElement("option");

				itemSlot.value = rings[i].id;
				itemSlot.textContent = rings[i].name;
				selectArea2.appendChild(itemSlot);
				var itemSlot = document.createElement("option");

				itemSlot.value = rings[i].id;
				itemSlot.textContent = rings[i].name;
				selectArea3.appendChild(itemSlot);
				var itemSlot = document.createElement("option");

				itemSlot.value = rings[i].id;
				itemSlot.textContent = rings[i].name;
				selectArea4.appendChild(itemSlot);
			}
			for (var i = 0; i < pockets.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-pocket");
				var itemSlot = document.createElement("option");

				itemSlot.value = pockets[i].id;
				itemSlot.textContent = pockets[i].name;
				selectArea.appendChild(itemSlot);
			}
			for (var i = 0; i < badges.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-badge");
				var itemSlot = document.createElement("option");

				itemSlot.value = badges[i].id;
				itemSlot.textContent = badges[i].name;
				selectArea.appendChild(itemSlot);
			}
			for (var i = 0; i < belts.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-belt");
				var itemSlot = document.createElement("option");

				itemSlot.value = belts[i].id;
				itemSlot.textContent = belts[i].name;
				selectArea.appendChild(itemSlot);
			}
			for (var i = 0; i < emblems.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-emblem");
				var itemSlot = document.createElement("option");

				itemSlot.value = emblems[i].id;
				itemSlot.textContent = emblems[i].name;
				selectArea.appendChild(itemSlot);
			}
			for (var i = 0; i < shoulders.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-shoulder");
				var itemSlot = document.createElement("option");

				itemSlot.value = shoulders[i].id;
				itemSlot.textContent = shoulders[i].name;
				selectArea.appendChild(itemSlot);
			}

			for (var i = 0; i < medals.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-medal");
				var itemSlot = document.createElement("option");

				itemSlot.value = medals[i].id;
				itemSlot.textContent = medals[i].name;
				selectArea.appendChild(itemSlot);
			}

			for (var i = 0; i < subWeapons.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById(
					"selection-sub-weapon"
				);
				var itemSlot = document.createElement("option");

				itemSlot.value = subWeapons[i].id;
				itemSlot.textContent = subWeapons[i].name;
				selectArea.appendChild(itemSlot);
			}

			for (var i = 0; i < pants.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-pants");
				var itemSlot = document.createElement("option");

				itemSlot.value = pants[i].id;
				itemSlot.textContent = pants[i].name;
				selectArea.appendChild(itemSlot);
			}

			for (var i = 0; i < capes.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-cape");
				var itemSlot = document.createElement("option");

				itemSlot.value = capes[i].id;
				itemSlot.textContent = capes[i].name;
				selectArea.appendChild(itemSlot);
			}

			for (var i = 0; i < gloves.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-gloves");
				var itemSlot = document.createElement("option");

				itemSlot.value = gloves[i].id;
				itemSlot.textContent = gloves[i].name;
				selectArea.appendChild(itemSlot);
			}

			for (var i = 0; i < hats.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-hat");
				var itemSlot = document.createElement("option");

				itemSlot.value = hats[i].id;
				itemSlot.textContent = hats[i].name;
				selectArea.appendChild(itemSlot);
			}

			for (var i = 0; i < shoes.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-shoes");
				var itemSlot = document.createElement("option");

				itemSlot.value = shoes[i].id;
				itemSlot.textContent = shoes[i].name;
				selectArea.appendChild(itemSlot);
			}

			for (var i = 0; i < tops.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-top");
				var itemSlot = document.createElement("option");

				itemSlot.value = tops[i].id;
				itemSlot.textContent = tops[i].name;
				selectArea.appendChild(itemSlot);
			}

			for (var i = 0; i < hearts.length; i++) {
				//console.log(faceAccs.length);
				var selectArea = document.getElementById("selection-heart");
				var itemSlot = document.createElement("option");

				itemSlot.value = hearts[i].id;
				itemSlot.textContent = hearts[i].name;
				selectArea.appendChild(itemSlot);
			}
		}
	);
}

function callAPI(url) {
	return $.ajax({
		url,
		type: "GET",
		success: function (res) {
			getAllWeapons(res);
		},
		error: function () {},
		complete: function () {},
	});
}

function getItem(url) {
	return $.ajax({
		url,
		type: "GET",
		success: function (res) {
			//console.log(res);
		},
		error: function () {},
		complete: function () {},
	});
}

let weapons = [];
let rings = [];
let pockets = [];
let pendants = [];
let belts = [];
let hats = [];
let eyeAccs = [];
let faceAccs = [];
let tops = [];
let pants = [];
let shoes = [];
let earrings = [];
let shoulders = [];
let gloves = [];
let emblems = [];
let badges = [];
let medals = [];
let subWeapons = [];
let capes = [];
let hearts = [];

function getAllWeapons(elements) {
	console.log(elements);
	for (const element of elements) {
		if (element.isCash) continue;
		switch (element.typeInfo.category) {
			case "Two-Handed Weapon":
			case "One-Handed Weapon": {
				if (
					(element.requiredLevel === 200 ||
						element.requiredLevel === 160 ||
						element.requiredLevel === 150) &&
					!element.name.includes("봉인된")
				) {
					weapons.push(element);
				}
				break;
			}
			case "Accessory": {
				if (
					element.typeInfo.subCategory === "Face Accessory" &&
					element.requiredLevel >= 100
				) {
					faceAccs.push(element);
				} else if (
					element.typeInfo.subCategory === "Eye Decoration" &&
					element.requiredLevel >= 100
				) {
					eyeAccs.push(element);
				} else if (
					element.typeInfo.subCategory === "Earrings" &&
					element.requiredLevel >= 100
				) {
					earrings.push(element);
				} else if (
					element.typeInfo.subCategory === "Pendant" &&
					element.requiredLevel >= 100
				) {
					pendants.push(element);
				} else if (
					element.typeInfo.subCategory === "Ring" &&
					element.requiredLevel >= 100
				) {
					rings.push(element);
				} else if (
					element.typeInfo.subCategory === "Pocket Item" &&
					element.requiredLevel >= 100
				) {
					pockets.push(element);
				} else if (
					element.typeInfo.subCategory === "Badge" &&
					element.requiredLevel >= 100
				) {
					badges.push(element);
				} else if (
					element.typeInfo.subCategory === "Belt" &&
					element.requiredLevel >= 100
				) {
					belts.push(element);
				} else if (
					element.typeInfo.subCategory === "Emblem" &&
					element.requiredLevel >= 100
				) {
					emblems.push(element);
				} else if (
					element.typeInfo.subCategory === "Shoulder Accessory" &&
					element.requiredLevel >= 100
				) {
					shoulders.push(element);
				} else if (
					element.typeInfo.subCategory === "Medal" &&
					element.requiredLevel >= 100
				) {
					medals.push(element);
				}
				break;
			}
			case "Secondary Weapon": {
				if (element.requiredLevel >= 100) {
					subWeapons.push(element);
				}
				break;
			}
			case "Armor": {
				if (
					element.typeInfo.subCategory === "Bottom" &&
					element.requiredLevel >= 150
				) {
					pants.push(element);
				} else if (
					element.typeInfo.subCategory === "Cape" &&
					element.requiredLevel >= 160
				) {
					capes.push(element);
				} else if (
					element.typeInfo.subCategory === "Glove" &&
					element.requiredLevel >= 160
				) {
					gloves.push(element);
				} else if (
					element.typeInfo.subCategory === "Hat" &&
					element.requiredLevel >= 150
				) {
					hats.push(element);
				} else if (
					element.typeInfo.subCategory === "Shoes" &&
					element.requiredLevel >= 160
				) {
					shoes.push(element);
				} else if (
					element.typeInfo.subCategory === "Top" &&
					element.requiredLevel >= 150
				) {
					tops.push(element);
				}
			}
			case "Other": {
				if (element.typeInfo.subCategory === "Mechanical Heart") {
					hearts.push(element);
				}
				break;
			}
		}
	}
	//console.log(weapons);
}

var getId = document.querySelectorAll(".column");
for (var i = 0; i < getId.length; i++) {
	var childs = getId[i].querySelectorAll("div");
	for (var j = 0; j < childs.length; j++) {
		init(childs[j].id);
		var equipHeader = document.createElement("h1");
		equipHeader.textContent = `${childs[j].id}:`;
		var newArea = document.createElement("select");
		newArea.id = `selection-${childs[j].id}`;
		//console.log(newArea.id);
		newArea.onchange = changeImg;
		selectionArea.appendChild(equipHeader);
		selectionArea.appendChild(newArea);
	}
}

getItemsInfo();
