import { TextLabelMp } from "./instance"

class TextLabelFactory {
    private pool = new Map<number, TextLabelMp>()

    new(id: number, text: string, color: string) {
        if (this.at(id)) {
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

    at(id: number) {
        return this.pool.get(id)
    }
}

export const textLabelFactory = new TextLabelFactory()