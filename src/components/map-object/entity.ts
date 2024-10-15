import { streamerNatives } from "@/wrapper/streamer"
import { StreamerEntity } from "../../core/streamer-entity"
import { MaterialTextAlignmentsEnum, MaterialTextSizesEnum } from "@/utils/enums"

export class MapObject extends StreamerEntity {
    private materialTextures = new Map<number, { model: number; textureLibrary?: string; textureName?: string; color?: string }>()

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

    constructor(streamerId: number) {
        super(streamerId, "object")
    }

    set model(id: number) {
        streamerNatives.setIntData("object", this.streamerId, "modelId", id)
    }

    get model() {
        return streamerNatives.getIntData("object", this.streamerId, "modelId")
    }

    setMaterialTexture(index: number, model: number, library?: string, name?: string, color = "") {
        this.materialTextures.set(index, { model, textureLibrary: library, textureName: name, color })
        streamerNatives.setDynamicObjectMaterial(this.streamerId, index, model, library ?? "none", name ?? "none", color)
    }

    getMaterialTexture(index: number) {
        return this.materialTextures.get(index)
    }

    removeMaterialTexture(index: number) {
        this.materialTextures.delete(index)
        streamerNatives.removeDynamicObjectMaterial(this.streamerId, index)
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
            this.streamerId,
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
        streamerNatives.removeDynamicObjectMaterialText(this.streamerId, index)
    }
}
