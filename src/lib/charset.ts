import iconv from "iconv-lite"

let playersCharset = "ISO-8859-1"

function setCharset(charset: string) {
    playersCharset = charset
}

function getCharset() {
    return playersCharset
}

function decodeFromBuf(buf: Buffer | number[], charset = playersCharset): string {
    const buffer = buf instanceof Buffer ? buf : Buffer.from(getValidStr(buf))

    return iconv.decode(buffer, charset)
}

// Truncate the string to the EOS tag to get the actual valid data
function getValidStr(byteArr: number[]) {
    const end = byteArr.indexOf(0)

    if (end === -1) {
        return byteArr
    }

    return byteArr.slice(0, byteArr.indexOf(0))
}

const processMsg = (msg: string, charset = playersCharset): { flag: string; encoded: string | number[] } => {
    const isUtf8 = charset.replace("-", "") === "utf8"
    const res = isUtf8 ? msg : encodeToBuf(msg, charset)
    const flag = res instanceof Array ? "a" : "s"

    return { flag, encoded: res }
}

function encodeToBuf(content: string, charset: string): number[] {
    return [...iconv.encode(content, charset), 0]
}

function convertSpecialCharacters(input: string): string {
    const charMap: Record<string, string> = {
        à: "\x97",
        á: "\x98",
        â: "\x99",
        ä: "\x9A",
        À: "\x80",
        Á: "\x81",
        Â: "\x82",
        Ä: "\x83",
        è: "\x9D",
        é: "\x9E",
        ê: "\x9F",
        ë: "\xA0",
        È: "\x86",
        É: "\x87",
        Ê: "\x88",
        Ë: "\x89",
        ì: "\xA1",
        í: "\xA2",
        î: "\xA3",
        ï: "\xA4",
        Ì: "\x8A",
        Í: "\x8B",
        Î: "\x8C",
        Ï: "\x8D",
        ò: "\xA5",
        ó: "\xA6",
        ô: "\xA7",
        ö: "\xA8",
        Ò: "\x8E",
        Ó: "\x8F",
        Ô: "\x90",
        Ö: "\x91",
        ù: "\xA9",
        ú: "\xAA",
        û: "\xAB",
        ü: "\xAC",
        Ù: "\x92",
        Ú: "\x93",
        Û: "\x94",
        Ü: "\x95",
        ñ: "\xAE",
        Ñ: "\xAD",
        "¡": "@",
        "¿": "\xAF",
        "`": "\xB1",
        // "&": "&",
    }

    return input
        .split("")
        .map((char) => (char in charMap ? charMap[char] : char))
        .join("")
}

export const charset = {
    set: setCharset,
    get: getCharset,
    decode: decodeFromBuf,
    encode: processMsg,
    convertSpecialCharacters,
}
