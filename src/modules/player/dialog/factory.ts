import { PlayerMp } from "../instance"
import { DialogResponse } from "./@types/response"

export class PlayerDialogFactory {
	static promises = new Map<number, (result: DialogResponse) => void>()

	static async new(player: PlayerMp): Promise<DialogResponse> {
		const existing = this.promises.get(player.id)
		if (existing) {
			existing({ button: undefined, listItem: undefined, inputText: "" })
		}

		return new Promise((resolve) => {
			this.promises.set(player.id, resolve)
		})
	}

	static destroy(player: PlayerMp, response?: DialogResponse) {
		const existing = this.promises.get(player.id)
		if (existing) {
			existing(response || { button: undefined, listItem: undefined, inputText: "" })
		}

		this.promises.delete(player.id)
	}
}
