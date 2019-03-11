export function getUserCookie(selectedCookie, defaultValue) {
    try {
        return document.cookie.split(`${selectedCookie}=`)[1].split(";")[0];
    } catch {
        return defaultValue;
    }
}
