import { CONFIG } from "../../shared/config"

export class Entity {
	private variables = new Map<string, any>()

	constructor(public id: number) {}

	setTimeout(callback: () => void, delay: number) {
		return setTimeout(() => {
			if (this.exists) {
				callback()
			}
		}, delay)
	}

	setInterval(callback: () => void, delay: number) {
		const intervalId = setInterval(() => {
			if (this.exists) {
				callback()
			} else {
				clearInterval(intervalId)
			}
		}, delay)
		return intervalId
	}

	setVariable(name: string, value: any) {
		this.variables.set(name, value)
	}

	getVariable(name: string) {
		return this.variables.get(name)
	}

	deleteVariable(name: string) {
		return this.variables.delete(name)
	}

	set exists(value: boolean) {
		this.id = CONFIG.entity.invalidId
	}

	get exists() {
		return this.id !== CONFIG.entity.invalidId
	}
}
