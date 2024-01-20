import { CommandMpFactory } from "./factory"

export class CommandsMp {
	constructor() {}

	add = CommandMpFactory.new

	get all() {
		return CommandMpFactory.all
	}
}
