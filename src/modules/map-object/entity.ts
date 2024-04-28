import { streamerNatives } from "@/natives/streamer"
import { StreamerEntity } from "../streamer-entity"
import { MaterialTextAlignmentsEnum, MaterialTextSizesEnum } from "@/common/enums"

export class MapObject extends StreamerEntity {
    private materialTextures = new Map<number, { model: number; txd: string; texture: string; color?: string }>()

    private materialTexts = new Map<
        number,
        {
            text: string
            size: MaterialTextSizesEnum
            fontFace: string
            fontSize: number
            bold: boolean
            fontColor: string
            backColor: string
            textAlignment: MaterialTextAlignmentsEnum
        }
    >()

    constructor(id: number) {
        super(id, "object")
    }

    set model(id: number) {
        streamerNatives.setIntData("object", this.id, "modelId", id)
    }

    get model() {
        return streamerNatives.getIntData("object", this.id, "modelId")
    }

    setMaterialTexture(index: number, model: number, txd: string, texture: string, color = "") {
        this.materialTextures.set(index, { model, txd, texture, color })
        streamerNatives.setDynamicObjectMaterial(this.id, index, model, txd, texture, color)
    }

    getMaterialTexture(index: number) {
        return this.materialTextures.get(index)
    }

    removeMaterialTexture(index: number) {
        this.materialTextures.delete(index)
        streamerNatives.removeDynamicObjectMaterial(this.id, index)
    }

    setMaterialText(
        index: number,
        text: string,
        size: MaterialTextSizesEnum = MaterialTextSizesEnum._256x128,
        fontFace = "Arial",
        fontSize = 24,
        bold = true,
        fontColor = "FFFFFF",
        backColor = "",
        textAlignment: MaterialTextAlignmentsEnum = MaterialTextAlignmentsEnum.Left,
    ) {
        this.materialTexts.set(index, { text, size, fontFace, fontSize, bold, fontColor, backColor, textAlignment })

        streamerNatives.setDynamicObjectMaterialText(
            this.id,
            index,
            text,
            size,
            fontFace,
            fontSize,
            bold,
            fontColor,
            backColor,
            textAlignment,
        )
    }

    getMaterialText(index: number) {
        return this.materialTexts.get(index)
    }

    removeMaterialText(index: number) {
        this.materialTexts.delete(index)
        streamerNatives.removeDynamicObjectMaterialText(this.id, index)
    }
}
