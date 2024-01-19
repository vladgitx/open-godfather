import { PlayerMpFactory } from "./factory"

export class PlayersMp {
	private factory = new PlayerMpFactory()

	constructor() {}

	at(id: number) {
		return this.factory.at(id)
	}
}
