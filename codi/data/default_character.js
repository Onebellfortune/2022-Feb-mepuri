export const character = {
    animating: true,
    action: "stand1",
    frame: 0,
    emotion: "default",
    mercEars: false,
    illiumEars: false,
    highFloraEars: false,
    zoom: 1,
    skin: 2000,
    name: "",
    flipX: false,
    fhSnap: true,
    includeBackground: true,
    visible: true,
    selectedItems: {
        Body: {
            name: "Body",
            noIcon: false,
            id: 2016,
            region: "KMS",
            version: "360",
            typeInfo: {
                overallCategory: "Character",
                category: "Character",
                subCategory: "Body",
                lowItemId: 2000,
                highItemId: 2999,
            },
        },
        Head: {
            name: "Head",
            noIcon: true,
            id: 12016,
            region: "KMS",
            version: "360",
            typeInfo: {
                overallCategory: "Character",
                category: "Character",
                subCategory: "Head",
                lowItemId: 12000,
                highItemId: 12999,
            },
        },
        Face: {
            requiredJobs: ["Beginner"],
            isCash: true,
            requiredGender: 0,
            name: "이슬눈 얼굴",
            desc: "",
            id: 23020,
            typeInfo: {
                overallCategory: "Equip",
                category: "Character",
                subCategory: "Face",
                lowItemId: 20000,
                highItemId: 29999,
            },
            region: "KMS",
            version: "360",
        },
        Overall: {
            requiredJobs: ["Beginner"],
            requiredLevel: 0,
            isCash: true,
            requiredGender: 1,
            name: "여신의 가호 한벌옷",
            desc: "",
            id: 1053828,
            typeInfo: {
                overallCategory: "Equip",
                category: "Armor",
                subCategory: "Overall",
                lowItemId: 1050000,
                highItemId: 1060000,
            },
            region: "KMS",
            version: "360",
        },
        Hair: {
            requiredJobs: ["Beginner"],
            isCash: true,
            requiredGender: 1,
            name: "검은색 꽃송이 헤어",
            desc: "",
            id: 37230,
            typeInfo: {
                overallCategory: "Equip",
                category: "Character",
                subCategory: "Hair",
                lowItemId: 30000,
                highItemId: 49999,
            },
            region: "KMS",
            version: "360",
        },
    },
};
Object.freeze(character);
