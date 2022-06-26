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
    const pad = (n, s = 2) => (`${new Array(s).fill(0)}${n}`).slice(-s)
    const d = new Date(ts)
    return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
    // return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` //?with seconds
}
