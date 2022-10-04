import { apiUrl, version, locale } from "../common/apiInfo.js";
import { toast } from "../common/toast.js";
import { setSelectedItemInfo } from "./itemManager.js";

export function generateAvatarLink(character, linkType, isTransparent) {
    let itemEntries = getCharacterItemEntries(character);

    let backgroundColor = {
        hsl: { h: 0, s: 0, l: 0, a: 0 },
        hex: "transparent",
        rgb: { r: 248, g: 242, b: 255, a: 255 },
        hsv: { h: 0, s: 0, v: 0, a: 0 },
        oldHue: 0,
        source: "rgb",
    };
    let bgColorText = `${backgroundColor.rgb.r},${backgroundColor.rgb.g},${backgroundColor.rgb.b},${backgroundColor.rgb.a}`;
    if (isTransparent !== undefined) {
        bgColorText = `${0},${0},${0},${0}`;
    }
    let itemEntriesPayload = JSON.stringify(itemEntries);
    itemEntriesPayload = encodeURIComponent(itemEntriesPayload.substr(1, itemEntriesPayload.length - 2));

    let { animating, action, frame, mercEars, illiumEars, highFloraEars, zoom, name, flipX, includeBackground } = character;

    const avatarLink =
        `${apiUrl}/character/${itemEntriesPayload}/${
            linkType ? linkType : `${action}/${animating ? "animated" : frame}`
        }?showears=${mercEars}&showLefEars=${illiumEars}&showHighLefEars=${highFloraEars}&resize=${zoom}&flipX=${flipX}` +
        (includeBackground ? `&bgColor=${bgColorText}` : "");

    return avatarLink;
}

export function downloadAvatar(character) {
    let itemEntries = getCharacterItemEntries(character);

    let backgroundColor = {
        hsl: { h: 0, s: 0, l: 0, a: 0 },
        hex: "transparent",
        rgb: { r: 248, g: 242, b: 255, a: 255 },
        hsv: { h: 0, s: 0, v: 0, a: 0 },
        oldHue: 0,
        source: "rgb",
    };
    const bgColorText = `${backgroundColor.rgb.r},${backgroundColor.rgb.g},${backgroundColor.rgb.b},${backgroundColor.rgb.a}`;

    let itemEntriesPayload = JSON.stringify(itemEntries);
    itemEntriesPayload = encodeURIComponent(itemEntriesPayload.substr(1, itemEntriesPayload.length - 2));

    let { animating, action, frame, mercEars, illiumEars, highFloraEars, zoom, name, flipX, includeBackground } = character;

    const avatarLink =
        `${apiUrl}/character/${itemEntriesPayload}/${
            linkType ? linkType : `${action}/${animating ? "animated" : frame}`
        }?showears=${mercEars}&showLefEars=${illiumEars}&showHighLefEars=${highFloraEars}&resize=${zoom}&flipX=${flipX}` +
        (includeBackground ? `&bgColor=${bgColorText}` : "");
    return avatarLink;
}

export function drawFrontCharacter(_characterFront, opacity) {
    if (opacity === 0) {
        document.getElementById("character_area_front").style.backgroundImage =
            document.getElementById("character_area").style.backgroundImage;
        document.getElementById("character_area_front").style.opacity = opacity;
    } else {
        document.getElementById("character_area_front").style.backgroundImage = `url('${generateAvatarLink(
            _characterFront
        )}')`;
        document.getElementById("character_area_front").style.opacity = opacity;
    }
}

export function drawCharacter(_character, selectedCategoryFlag) {
    const link = generateAvatarLink(_character);
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
        return abortController.abort();
    }, 5000);
    console.log(_character);
    fetch(link, { signal: abortController.signal })
        .then((res) => {
            if (!res.ok) {
                clearTimeout(timeoutId);
                throw new Error("Response from API is not OK, something went wrong");
            } else {
                document.getElementById("character_area").style.backgroundImage = `url('${link}')`;
                setSelectedItemInfo(_character, selectedCategoryFlag);
            }
        })
        .catch((e) => {
            console.log(e);
            toast(`Can't update ${selectedCategoryFlag} now`);
        });
}
function getCharacterItemEntries(character) {
    return Object.values(character.selectedItems)
        .filter((item) => {
            return item.id && (item.visible === undefined || item.visible);
        })
        .map((item) => {
            let itemEntry = {
                itemId: Number(item.id),
            };

            if ((item.id >= 20000 && item.id < 30000) || (item.id >= 1010000 && item.id < 1020000)) {
                itemEntry.animationName = character.emotion;
            }
            if (item.region && item.region.toLowerCase() !== "gms") itemEntry.region = item.region;
            if (item.version && item.version.toLowerCase() !== "latest") itemEntry.version = item.version;
            if (item.hue) itemEntry.hue = item.hue;
            if (item.saturation !== 1) itemEntry.saturation = item.saturation;
            if (item.contrast !== 1) itemEntry.contrast = item.contrast;
            if (item.brightness !== 1) itemEntry.brightness = item.brightness;
            if (item.alpha !== 1) itemEntry.alpha = item.alpha;
            if (item.islot) itemEntry.islot = item.islot;
            if (item.vslot) itemEntry.vslot = item.vslot;
            if (item.equipFrame) itemEntry.equipFrame = item.equipFrame;
            if (item.disableEffect) itemEntry.disableEffect = item.disableEffect;
            if (item.glow) itemEntry.glow = item.glow;
            if (item.grayscale) itemEntry.grayscale = item.grayscale;
            if (item.invert) itemEntry.invert = item.invert;
            if (item.oilPaint) itemEntry.oilPaint = item.oilPaint;
            if (item.sepia) itemEntry.sepia = item.sepia;

            return itemEntry;
        });
}
