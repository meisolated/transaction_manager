import md5 from "md5"
export function numberSeparator(_num) {
    let end = _num.toString().includes(".") ? "." + _num.toString().split(".")[1] : ""
    var num = _num.toString().includes(".") ? _num.toString().split(".")[0] : _num
    num = num.toString()
    var lastThree = num.substring(num.length - 3)
    var otherNumbers = num.substring(0, num.length - 3)
    if (otherNumbers != "") lastThree = "," + lastThree
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree
    return "₹" + res + end
}

export function currentTimestamp() {
    return Math.floor(Date.now() / 1000)
}

export function convertTimestamp(ts) {
    const pad = (n, s = 2) => `${new Array(s).fill(0)}${n}`.slice(-s)
    const d = new Date(ts)
    return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
    // return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` //?with seconds
}

const generateRandomString = (myLength) => {
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890"
    const randomArray = Array.from({ length: myLength }, (v, k) => chars[Math.floor(Math.random() * chars.length)])

    const randomString = randomArray.join("")
    return randomString
}

export const randomIdGenerator = () => {
    // random string
    let id = md5(generateRandomString(40) + "-" + Date.now())
    return id
}

export function startAndEndOfDat() {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    let timestampState = Math.floor(new Date(start).getTime() / 1000)

    const end = new Date()
    end.setHours(23, 59, 59, 999)
    let timestampEnd = Math.floor(new Date(end).getTime() / 1000)

    return { start: timestampState, end: timestampEnd }
}

/**
 *
 * @param {*} t time in seconds
 * @returns
 */
export const sleep = (t) =>
    new Promise(async (resolve, _reject) => {
        setTimeout(() => {
            resolve()
        }, t * 1000)
    })

export const convertTextToFont = (text) => {
    let font = {
        a: "🇦",
        b: "🇧",
        c: "🇨",
        d: "🇩",
        e: "🇪",
        f: "🇫",
        g: "🇬",
        h: "🇭",
        i: "🇮",
        j: "🇯",
        k: "🇰",
        l: "🇱",
        m: "🇲",
        n: "🇳",
        o: "🇴",
        p: "🇵",
        q: "🇶",
        r: "🇷",
        s: "🇸",
        t: "🇹",
        u: "🇺",
        v: "🇻",
        w: "🇼",
        x: "🇽",
        y: "🇾",
        x: "🇿",
    }
    let fontText = text.split("").map((char) => font[char] || char).join("")
    return fontText

}
