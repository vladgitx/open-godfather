import { SampNatives } from "../natives"

export class ServerMp {
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
		SampNatives.sendRconCommand("hostname " + this._name)
		SampNatives.sendRconCommand("language " + this._language)
		SampNatives.sendRconCommand("weburl " + this._website)
		SampNatives.sendRconCommand("mapname " + this._map)
		SampNatives.sendRconCommand("gamemode " + this._mode)

		SampNatives.enableStuntBonusForAll(this._stuntBonuses)
		SampNatives.setNameTagDrawDistance(this._nameTagDistance)
		SampNatives.setWorldTime(this._hour)
		SampNatives.setWeather(this._weather)
	}

	set name(name: string) {
		this._name = name
		SampNatives.sendRconCommand("hostname " + this._name)
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
		SampNatives.sendRconCommand("weburl " + this._website)
	}

	get website() {
		return this._website
	}

	set map(map: string) {
		this._map = map
		SampNatives.sendRconCommand("mapname " + this._map)
	}

	get map() {
		return this._map
	}

	set mode(mode: string) {
		this._mode = mode
		SampNatives.sendRconCommand("gamemode " + this._mode)
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
