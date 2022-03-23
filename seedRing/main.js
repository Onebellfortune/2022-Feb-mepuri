const userInfoInit = {
    union: 0,
    skill: [],
    linkSkill: [],
    setEffect: {
        bossSet: 0,
        absolSet: 0,
        karutaSet: 0,
    },
    itemWeapon: {
        weapon: {
            power: 0,
            percent: 0,
        },
        subWeapon: {
            power: 0,
            percent: 0,
        },
        emblem: {
            power: 0,
            percent: 0,
        },
    },
    item: {
        ring1: 0,
        ring2: 0,
        ring3: 0,
        ring4: 0,
        pocket: 0,
        pendent1: 0,
        pendent2: 0,
        belt: 0,
        faceAcc: 0,
        eyeAcc: 0,
        earAcc: 0,
        hat: 0,
        clothes: 0,
        pants: 0,
        gloves: 0,
        shoes: 0,
        shoulder: 0,
        cape: 0,
        badge: 0,
        medal: 0,
        heart: 0,
        ching: 0,
        pet: 0,
        petAcc: 0,
    },
    stats: {
        mainStats: 0,
        subStats: 0,
        damage: 0,
        damageLast: 0,
        damageBoss: 0,
    },
    weaponNum: 0,
    characterNum: 0,
    sookryoundo: 0,
};
function getSumOfPowerPercent(characterInfo) {
    const muboem = characterInfo.itemWeapon;
    return muboem.weapon.percent + muboem.emblem.percent + muboem.subWeapon.percent;
}
function getSumOfPower(characterInfo) {
    const muboem = characterInfo.itemWeapon;
    return (
        muboem.emblem.power +
        muboem.weapon.power +
        muboem.subWeapon.power +
        Object.values(characterInfo.item).reduce((a, b) => a + b)
    );
}
function getStatPower(characterInfo) {
    const stats = characterInfo.stats;
    const power = getSumOfPower(characterInfo);
    const powerPercent = getSumOfPowerPercent(characterInfo);
    return (
        (stats.mainStats * 4 + stats.subStats) *
        0.01 *
        (power * (1 + powerPercent / 100)) *
        characterInfo.weaponNum *
        characterInfo.characterNum *
        (1 + stats.damage / 100) *
        (1 + stats.damageLast / 100)
    );
}
function myclick() {
    console.log(document);
    // alert(document.userForm.action);
}
// window.myclick = () => {
//     console.log(document);
//     alert(document.userForm.action);
// };
function main() {}
