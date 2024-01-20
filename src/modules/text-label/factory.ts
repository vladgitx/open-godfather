import { TextLabelMp } from "./instance"

export class TextLabelMpFactory {
	private static pool = new Map<number, TextLabelMp>()

	static new(id: number, text: string, color: string) {
		if (this.at(id)) {
			return undefined
		}

		const label = new TextLabelMp(id, text, color)
		this.pool.set(id, label)

		return label
	}

	static destroy(label: TextLabelMp) {
		const deleted = this.pool.delete(label.id)
		label.exists = false
		return deleted
	}

	static at(id: number) {
		return this.pool.get(id)
	}
}
