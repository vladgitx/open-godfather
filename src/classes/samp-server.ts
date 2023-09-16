import { OpenConfig } from "./open-gf"
import { Natives, SampNode } from "../scripting-api"

export class SampServer {
    #name: string
    #language: string
    #website: string
    #map: string
    #mode: string
    #stuntBonuses: boolean
    #nametagDrawDistance: number
    #hour: number
    #weather: number

    constructor(config?: OpenConfig) {
        this.#name = config?.name === undefined ? "open gf server" : config.name
        this.#language = config?.language === undefined ? "English" : config.language
        this.#website = config?.website === undefined ? "open.mp" : config.website
        this.#map = config?.map === undefined ? "San Andreas" : config.map
        this.#mode = config?.mode === undefined ? "Unknown" : config.mode
        this.#stuntBonuses = config?.stuntBonuses === undefined ? false : config.stuntBonuses
        this.#nametagDrawDistance = config?.nametagDrawDistance === undefined ? 20 : config.nametagDrawDistance
        this.#hour = config?.hour === undefined ? 12 : config.hour
        this.#weather = config?.weather === undefined ? 10 : config.weather

        SampNode.on("OnGameModeInit", () => {
            this.name = this.name
            this.language = this.language
            this.website = this.website
            this.map = this.map
            this.mode = this.mode
            this.stuntBonuses = this.stuntBonuses
            this.nametagDrawDistance = this.nametagDrawDistance
            this.hour = this.hour
            this.weather = this.weather 
        })
    }

    set name(name: string) {
        this.#name = name
        Natives.sendRconCommand(`hostname ${name}`)
    }

    get name() {
        return this.#name
    }

    set language(language: string) {
        this.#language = language
        Natives.sendRconCommand(`language ${language}`)
    }

    get language() {
        return this.#language
    }

    set website(site: string) {
        this.#website = site
        Natives.sendRconCommand(`weburl ${site}`)
    }

    get website() {
        return this.#website
    }

    set map(map: string) {
        this.#map = map
        Natives.sendRconCommand(`mapname ${map}`)
    }

    get map() {
        return this.#map
    }

    set mode(mode: string) {
        this.#mode = mode
        Natives.sendRconCommand(`gamemodetext ${mode}`)
    }

    get mode() {
        return this.#mode
    }

    set stuntBonuses(enable: boolean) {
        this.#stuntBonuses = enable
        Natives.enableStuntBonusForAll(enable)
    }

    get stuntBonuses() {
        return this.#stuntBonuses
    }

    set nametagDrawDistance(distance: number) {
        this.#nametagDrawDistance = distance
        Natives.setNameTagDrawDistance(distance)
    }

    get nametagDrawDistance() {
        return this.#nametagDrawDistance
    }

    set hour(hour: number) {
        this.#hour = hour
        Natives.setWorldTime(hour)
    }

    get hour() {
        return this.#hour
    }

    set weather(weatherId: number) {
        this.#weather = weatherId
        Natives.setWeather(weatherId)
    }

    get weather() {
        return this.#weather
    }

    get tickRate() {
        return Natives.getServerTickRate()
    }
}