function callAPI(url) {
    return $.ajax({
        url,
        type: "GET",
        success: function (res) {
            getAllWeapons(res);
            
            console.log('뭐래');
        },
        error: function () {},
        complete: function () {},
    });
}

function getAllWeapons(elements)
{
    let weapons = [];
    elements.forEach(element => {
        if (
                (element.typeInfo.category === "Two-Handed Weapon" ||
                element.typeInfo.category === "One-Handed Weapon")
                && element.requiredLevel=== 200
            )
            
                weapons.push(element);
    });
    console.log(weapons);

}
var column=document.querySelectorAll('.item-slot1');
//console.log(column);
var weapon=document.getElementById("weapon");

var weaponImg=document.createElement('img');

var testAPI=callAPI('https://maplestory.io/api/KMS/360/item/category/Equip');
weaponImg.src='https://maplestory.io/api/KMS/360/item/1213022/icon';

weapon.appendChild(weaponImg);
//weapon.src=callAPI('https://maplestory.io/api/KMS/360/item/1213022/icon');
//console.log(weapon.src);

