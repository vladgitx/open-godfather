import { gameNatives, type Weapon, WEAPONS } from "@/wrapper/game"

class GameServer {
    // TODO: Get from config.json
    private _name = "open gf server"
    private _language = "en"
    private _website = "open.mp"
    private _map = "San Andreas"
    private _mode = "Freeroam"
    private _stuntBonuses = false
    private _nameTagDistance = 20
    private _hour = 18
    private _weather = 1
    private _disabledNameTags = false

    set disabledNameTags(disabledNameTags: boolean) {
        this._disabledNameTags = disabledNameTags
        gameNatives.showNameTags(disabledNameTags ? 0 : 1)
    }

    get disabledNameTags() {
        return this._disabledNameTags
    }

    sendRconCommand(command: string) {
        gameNatives.sendRconCommand(command)
    }

    disableDefaultInteriorEntrances() {
        gameNatives.disableInteriorEnterExits()
    }

    getWeaponName(weapon: Weapon) {
        return gameNatives.getWeaponName(WEAPONS[weapon])
    }

    blockIpAddress(ipAddress: string, timeInMs: number) {
        gameNatives.blockIpAddress(ipAddress, timeInMs)
    }

    unblockIpAddress(ipAddress: string) {
        gameNatives.unblockIpAddress(ipAddress)
    }

    set name(name: string) {
        this._name = name
        gameNatives.sendRconCommand("name " + this._name)
    }

    get name() {
        return this._name
    }

    set language(language: string) {
        this._language = language
        gameNatives.sendRconCommand("language " + this._language)
    }

    get language() {
        return this._language
    }

    set website(website: string) {
        this._website = website
        gameNatives.sendRconCommand("website " + this._website)
    }

    get website() {
        return this._website
    }

    set map(map: string) {
        this._map = map
        gameNatives.sendRconCommand("game.map " + this._map)
    }

    get map() {
        return this._map
    }

    set mode(mode: string) {
        this._mode = mode
        gameNatives.sendRconCommand("game.mode " + this._mode)
    }

    get mode() {
        return this._mode
    }

    set stuntBonuses(stuntBonuses: boolean) {
        this._stuntBonuses = stuntBonuses
        gameNatives.enableStuntBonusForAll(this._stuntBonuses ? 1 : 0)
    }

    get stuntBonuses() {
        return this._stuntBonuses
    }

    set nameTagDistance(nameTagDistance: number) {
        this._nameTagDistance = nameTagDistance
        gameNatives.setNameTagDrawDistance(this._nameTagDistance)
    }

    get nameTagDistance() {
        return this._nameTagDistance
    }

    set hour(hour: number) {
        this._hour = hour
        gameNatives.setWorldTime(this._hour)
    }

    get hour() {
        return this._hour
    }

    set weather(weather: number) {
        this._weather = weather
        gameNatives.setWeather(this._weather)
    }

    get weather() {
        return this._weather
    }

    get tickRate() {
        return gameNatives.getServerTickRate()
    }
}

export const gameServer = new GameServer()
