import { SampNatives } from "@/wrapper"

class MultiplayerServer {
    private _name = "open gf server"
    private _language = "en"
    private _website = "open.mp"
    private _map = "San Andreas"
    private _mode = "Freeroam"
    private _stuntBonuses = false
    private _nameTagDistance = 20
    private _hour = 18
    private _weather = 1

    constructor() {
        this.name = this._name
        this.language = this._language
        this.website = this._website
        this.map = this._map
        this.mode = this._mode
        this.stuntBonuses = this._stuntBonuses
        this.nameTagDistance = this._nameTagDistance
        this.hour = this._hour
        this.weather = this._weather
    }

    sendRconCommand(command: string) {
        SampNatives.sendRconCommand(command)
    }

    set name(name: string) {
        this._name = name
        SampNatives.sendRconCommand("name " + this._name)
    }

    get name() {
        return this._name
    }

    set language(language: string) {
        this._language = language
        SampNatives.sendRconCommand("language " + this._language)
    }

    get language() {
        return this._language
    }

    set website(website: string) {
        this._website = website
        SampNatives.sendRconCommand("website " + this._website)
    }

    get website() {
        return this._website
    }

    set map(map: string) {
        this._map = map
        SampNatives.sendRconCommand("game.map " + this._map)
    }

    get map() {
        return this._map
    }

    set mode(mode: string) {
        this._mode = mode
        SampNatives.sendRconCommand("game.mode " + this._mode)
    }

    get mode() {
        return this._mode
    }

    set stuntBonuses(stuntBonuses: boolean) {
        this._stuntBonuses = stuntBonuses
        SampNatives.enableStuntBonusForAll(this._stuntBonuses)
    }

    get stuntBonuses() {
        return this._stuntBonuses
    }

    set nameTagDistance(nameTagDistance: number) {
        this._nameTagDistance = nameTagDistance
        SampNatives.setNameTagDrawDistance(this._nameTagDistance)
    }

    get nameTagDistance() {
        return this._nameTagDistance
    }

    set hour(hour: number) {
        this._hour = hour
        SampNatives.setWorldTime(this._hour)
    }

    get hour() {
        return this._hour
    }

    set weather(weather: number) {
        this._weather = weather
        SampNatives.setWeather(this._weather)
    }

    get weather() {
        return this._weather
    }

    get tickRate() {
        return SampNatives.getServerTickRate()
    }
}

export const mpServer = new MultiplayerServer()
