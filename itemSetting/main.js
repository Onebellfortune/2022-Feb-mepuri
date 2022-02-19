var defaultURL = "https://maplestory.io/api";
var region = "KMS";
var version = "360";

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

let weapons = [];
function getAllWeapons(elements) {
	elements.forEach((element) => {
		if (
			(element.typeInfo.category === "Two-Handed Weapon" ||
				element.typeInfo.category === "One-Handed Weapon") &&
			element.requiredLevel === 200
		)
			weapons.push(element);
	});
	//console.log(weapons);
}

var column = document.querySelectorAll(".item-slot1");
//console.log(column);
var weapon = document.getElementById("weapon");

callAPI("https://maplestory.io/api/KMS/360/item/category/Equip").then(
	(result) => {
		for (var i = 0; i < weapons.length; i++) {
			var weaponImg = document.createElement("img");
			imgURI = `${defaultURL}/${region}/${version}/item/${weapons[i].id}/iconRaw`;
			weaponImg.src = imgURI;
			document.body.appendChild(weaponImg);
		}
	}
);

//console.log(weapons);
weapon.appendChild(weaponImg);
//weapon.src=callAPI('https://maplestory.io/api/KMS/360/item/1213022/icon');
//console.log(weapon.src);
