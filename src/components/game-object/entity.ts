import { streamerNatives } from "@/wrapper/streamer"
import {
    MATERIAL_TEXT_ALIGNMENTS,
    MATERIAL_TEXT_SIZES,
    type MaterialTextAlignment,
    type MaterialTextSize,
} from "@/wrapper/game/enums.public"
import { StreamerEntity } from "@/lib/entity/streamer"

export class GameObject extends StreamerEntity {
    constructor(gameId: number) {
        super(gameId, "object")
    }

    set model(id: number) {
        streamerNatives.setIntData("object", this.id, "modelId", id)
    }

    get model() {
        return streamerNatives.getIntData("object", this.id, "modelId")
    }

    setMaterial(index: number, model: number, txd?: string, texture?: string, color = "") {
        streamerNatives.setDynamicObjectMaterial(this.id, index, model, txd ?? "none", texture ?? "none", color)
    }

    getMaterial(index: number) {
        return streamerNatives.getDynamicObjectMaterial(this.id, index)
    }

    removeMaterial(index: number) {
        streamerNatives.removeDynamicObjectMaterial(this.id, index)
    }

    setMaterialText(
        index: number,
        text: string,
        size: MaterialTextSize = "256x128",
        fontFace = "Arial",
        fontSize = 24,
        bold = true,
        fontColor = "FFFFFF",
        backColor = "",
        textAlignment: MaterialTextAlignment = "left",
    ) {
        streamerNatives.setDynamicObjectMaterialText(
            this.id,
            index,
            text,
            MATERIAL_TEXT_SIZES[size],
            fontFace,
            fontSize,
            bold,
            fontColor,
            backColor,
            MATERIAL_TEXT_ALIGNMENTS[textAlignment],
        )
    }

    getMaterialText(index: number) {
        return streamerNatives.getDynamicObjectMaterialText(this.id, index)
    }

    removeMaterialText(index: number) {
        streamerNatives.removeDynamicObjectMaterialText(this.id, index)
    }
}
