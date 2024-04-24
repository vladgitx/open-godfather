import { TextLabel } from "./instance"

class TextLabelFactory {
    pool = new Map<number, TextLabel>()

    new(id: number, text: string, color: string) {
        if (this.pool.has(id)) {
            return undefined
        }

        const label = new TextLabel(id, text, color)
        this.pool.set(id, label)

        return label
    }

    destroy(label: TextLabel) {
        this.pool.delete(label.id)
        label.exists = false
    }
}

export const textLabelFactory = new TextLabelFactory()
