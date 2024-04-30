import { dispatcher } from "../dispatcher"
import { EntityFactory } from "../entity"
import { TextLabel } from "./entity"

class TextLabelFactory extends EntityFactory<TextLabel> {
    new(id: number, text: string, color: string) {
        if (this.pool.has(id)) {
            return undefined
        }

        const label = new TextLabel(id, text, color)
        this.pool.set(id, label)

        dispatcher.emit("entityInstantiate", label)

        return label
    }
}

export const textLabelFactory = new TextLabelFactory()
