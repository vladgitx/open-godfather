import { TextLabelMp } from "./instance"

class TextLabelFactory {
    pool = new Map<number, TextLabelMp>()

    new(id: number, text: string, color: string) {
        if (this.pool.has(id)) {
            return undefined
        }

        const label = new TextLabelMp(id, text, color)
        this.pool.set(id, label)

        return label
    }

    destroy(label: TextLabelMp) {
        this.pool.delete(label.id)
        label.exists = false
    }
}

export const textLabelFactory = new TextLabelFactory()
