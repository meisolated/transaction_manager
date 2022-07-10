import md5 from "md5"
export function numberSeparator(_num) {
    var num = _num
    num = num.toString()
    var lastThree = num.substring(num.length - 3)
    var otherNumbers = num.substring(0, num.length - 3)
    if (otherNumbers != "") lastThree = "," + lastThree
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree
    return "₹" + res
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
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890"
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    )

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
