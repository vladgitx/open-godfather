import { Natives, SampNode } from "../scripting-api"
import { globalEvent } from "./global-event"
import { DeepRequired } from "../utils"

export type GlobalConfig = {
    host?: GlobalConfigHost
    nametagDrawDistance?: number
    stuntBonuses?: boolean
    hour?: number
    weather?: number
}

type GlobalConfigHost = {
    name?: string
    language?: string
    website?: string
    map?: string
    mode?: string
}

const defaultGlobalConfig: DeepRequired<GlobalConfig> = {
    host: {
        name: "node.js godfather server",
        language: "English",
        website: "open.mp",
        map: "San Andreas",
        mode: "Unknown",
    },
    nametagDrawDistance: 50,
    stuntBonuses: false,
    hour: 12,
    weather: 10,
}

SampNode.on("OnGameModeInit", () => {
    let indexFile
    try {
        indexFile = require("../../../samp-node/index")
    } catch {
        console.error("[warning] Using default global config values because index.js file could not be found, make sure it's inside the \"src\" folder at the root level.")
    }
    const config: GlobalConfig | undefined = indexFile?.globalConfig

    if (config?.host?.name !== undefined) {
        Global.host.name = config.host.name
    }
    if (config?.host?.language !== undefined) {
        Global.host.language = config.host.language
    }
    if (config?.host?.website !== undefined) {
        Global.host.website = config.host.website
    }
    if (config?.host?.map !== undefined) {
        Global.host.map = config.host.map
    }
    if (config?.host?.mode !== undefined) {
        Global.host.mode = config.host.mode
    }
    if (config?.stuntBonuses !== undefined) {
        Global.stuntBonuses = config.stuntBonuses
    }
    if (config?.nametagDrawDistance !== undefined) {
        Global.nametagDrawDistance = config.nametagDrawDistance
    }
    if (config?.hour !== undefined) {
        Global.hour = config.hour
    }
    if (config?.weather !== undefined) {
        Global.weather = config.weather
    }
    globalEvent.emit("gameModeInit")
})

export class Global {
    static #host: Required<GlobalConfigHost> = {
        name: defaultGlobalConfig.host.name,
        language: defaultGlobalConfig.host.language,
        website: defaultGlobalConfig.host.website,
        map: defaultGlobalConfig.host.map,
        mode: defaultGlobalConfig.host.mode,
    }
    static #stuntBonuses = defaultGlobalConfig.stuntBonuses
    static #nametagDrawDistance = defaultGlobalConfig.nametagDrawDistance
    static #hour = defaultGlobalConfig.hour
    static #weather = defaultGlobalConfig.weather

    static host: Required<GlobalConfigHost> = {
        set name(name: string) {
            Global.#host.name = name
            Natives.sendRconCommand(`hostname ${name}`)
        },

        get name() {
            return Global.#host.name
        },

        set language(language: string) {
            Global.#host.language = language
            Natives.sendRconCommand(`language ${language}`)
        },

        get language() {
            return Global.#host.language
        },

        set website(url: string) {
            Global.#host.website = url
            Natives.sendRconCommand(`weburl ${url}`)
        },

        get website() {
            return Global.#host.website
        },

        set map(name: string) {
            Global.#host.map = name
            Natives.sendRconCommand(`mapname ${name}`)
        },

        get map() {
            return Global.#host.map
        },

        set mode(name: string) {
            Global.#host.mode = name
            Natives.sendRconCommand(`gamemodetext ${name}`)
        },

        get mode() {
            return Global.#host.mode
        },
    }

    static get tickRate() {
        return Natives.getServerTickRate()
    }

    static set stuntBonuses(enable: boolean) {
        this.#stuntBonuses = enable
        Natives.enableStuntBonusForAll(enable)
    }

    static get stuntBonuses() {
        return this.#stuntBonuses
    }

    static set nametagDrawDistance(distance: number) {
        this.#nametagDrawDistance = distance
        Natives.setNameTagDrawDistance(distance)
    }

    static get nametagDrawDistance() {
        return this.#nametagDrawDistance
    }

    static set hour(hour: number) {
        this.#hour = hour
        Natives.setWorldTime(hour)
    }

    static get hour() {
        return this.#hour
    }

    static set weather(weatherId: number) {
        this.#weather = weatherId
        Natives.setWeather(weatherId)
    }

    static get weather() {
        return this.#weather
    }
}