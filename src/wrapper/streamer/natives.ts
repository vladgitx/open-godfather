import { type Position3, Vector3 } from "@/lib/vector3"
import { INVALID_STREAMER_ID } from "./constants"
import { hexToRgbaInt, rgbaIntToHex } from "@/lib/utils"
import { STREAMER_ITEM_DATA, STREAMER_ITEM_TYPES, type StreamerItemData, type StreamerItemType } from "./enums"
import { type EnumValue } from "@/lib/types"
import type { MATERIAL_TEXT_ALIGNMENTS, MATERIAL_TEXT_SIZES } from "../game/enums.public"
import { charset } from "@/lib/charset"
import { nativeHook } from "@/lib/native-hook"

class StreamerNatives {
    createDynamicCheckpoint(
        position: Position3,
        size: number,
        worldId: number,
        interiorId: number,
        playerId: number,
        streamDistance: number,
        areaId: number,
        priority: number,
    ) {
        const id = nativeHook.callNative(
            "CreateDynamicCP",
            "ffffiiifii",
            position.x,
            position.y,
            position.z,
            size,
            worldId,
            interiorId,
            playerId,
            streamDistance,
            areaId,
            priority,
        ) as number

        return id === INVALID_STREAMER_ID ? undefined : id
    }

    destroyDynamicCheckpoint(id: number) {
        nativeHook.callNative("DestroyDynamicCP", "i", id)
    }

    isValidDynamicCheckpoint(id: number) {
        return nativeHook.callNative("IsValidDynamicCP", "i", id) === 1
    }

    togglePlayerDynamicCheckpoint(playerId: number, checkpointId: number, toggle: boolean) {
        nativeHook.callNative("TogglePlayerDynamicCP", "iii", playerId, checkpointId, toggle ? 1 : 0)
    }

    togglePlayerAllDynamicCheckpoints(playerId: number, toggle: boolean) {
        nativeHook.callNative("TogglePlayerAllDynamicCPs", "ii", playerId, toggle ? 1 : 0)
    }

    isPlayerInDynamicCheckpoint(playerId: number, checkpointId: number) {
        return nativeHook.callNative("IsPlayerInDynamicCP", "ii", playerId, checkpointId) === 1
    }

    getPlayerVisibleDynamicCheckpoint(playerId: number) {
        const id = nativeHook.callNative("GetPlayerVisibleDynamicCP", "i", playerId) as number
        return id === INVALID_STREAMER_ID ? undefined : id
    }

    createDynamicPickup(
        modelId: number,
        type: number,
        position: Position3,
        worldId: number,
        interiorId: number,
        playerId: number,
        streamDistance: number,
        areaId: number,
        priority: number,
    ) {
        const id = nativeHook.callNative(
            "CreateDynamicPickup",
            "iifffiiifii",
            modelId,
            type,
            position.x,
            position.y,
            position.z,
            worldId,
            interiorId,
            playerId,
            streamDistance,
            areaId,
            priority,
        ) as number

        return id === INVALID_STREAMER_ID ? undefined : id
    }

    destroyDynamicPickup(pickupId: number) {
        nativeHook.callNative("DestroyDynamicPickup", "i", pickupId)
    }

    isValidDynamicPickup(pickupId: number) {
        return nativeHook.callNative("IsValidDynamicPickup", "i", pickupId) === 1
    }

    createDynamic3dTextLabel(
        text: string,
        color: string,
        position: Position3,
        drawDistance: number,
        attachedPlayerId: number,
        attachedVehicleId: number,
        testLos: number,
        world: number,
        interior: number,
        playerId: number,
        streamDistance: number,
        areaId: number,
        priority: number,
    ) {
        const { flag, encoded } = charset.encode(text)

        const id = nativeHook.callNative(
            "CreateDynamic3DTextLabel",
            `${flag}iffffiiiiiifii`,
            encoded,
            hexToRgbaInt(color),
            position.x,
            position.y,
            position.z,
            drawDistance,
            attachedPlayerId,
            attachedVehicleId,
            testLos,
            world,
            interior,
            playerId,
            streamDistance,
            areaId,
            priority,
        ) as number

        return id === INVALID_STREAMER_ID ? undefined : id
    }

    destroyDynamic3dTextLabel(textLabelId: number) {
        nativeHook.callNative("DestroyDynamic3DTextLabel", "i", textLabelId)
    }

    isValidDynamic3dTextLabel(textLabelId: number) {
        return nativeHook.callNative("IsValidDynamic3DTextLabel", "i", textLabelId) === 1
    }

    getDynamic3dTextLabelText(textLabelId: number) {
        return charset.decode(nativeHook.callNative("GetDynamic3DTextLabelText", "iAi", textLabelId, 256))
    }

    updateDynamic3dTextLabelText(textLabelId: number, color: string, text: string) {
        const { flag, encoded } = charset.encode(text)

        nativeHook.callNative("UpdateDynamic3DTextLabelText", `ii${flag}`, textLabelId, hexToRgbaInt(color), encoded)
    }

    getFloatData(itemType: StreamerItemType, itemId: number, itemData: StreamerItemData) {
        return nativeHook.callNativeFloat(
            "Streamer_GetFloatData",
            "iiiF",
            STREAMER_ITEM_TYPES[itemType],
            itemId,
            STREAMER_ITEM_DATA[itemData],
        ) as number
    }

    setFloatData(itemType: StreamerItemType, itemId: number, itemData: StreamerItemData, value: number) {
        nativeHook.callNative("Streamer_SetFloatData", "iiif", STREAMER_ITEM_TYPES[itemType], itemId, STREAMER_ITEM_DATA[itemData], value)
    }

    getIntData(itemType: StreamerItemType, itemId: number, itemData: StreamerItemData) {
        return nativeHook.callNative(
            "Streamer_GetIntData",
            "iii",
            STREAMER_ITEM_TYPES[itemType],
            itemId,
            STREAMER_ITEM_DATA[itemData],
        ) as number
    }

    setIntData(itemType: StreamerItemType, itemId: number, itemData: StreamerItemData, value: number) {
        nativeHook.callNative("Streamer_SetIntData", "iiii", STREAMER_ITEM_TYPES[itemType], itemId, STREAMER_ITEM_DATA[itemData], value)
    }

    countVisibleItems(playerId: number, type: StreamerItemType) {
        return nativeHook.callNative("Streamer_CountVisibleItems", "iii", playerId, STREAMER_ITEM_TYPES[type], 1) as number
    }

    countItems(type: StreamerItemType) {
        return nativeHook.callNative("Streamer_CountItems", "ii", STREAMER_ITEM_TYPES[type], 1) as number
    }

    getNearbyItems(position: Position3, type: StreamerItemType, maxItems: number, range: number, world: number) {
        const itemIds = nativeHook.callNative(
            "Streamer_GetNearbyItems",
            "fffiAifi",
            position.x,
            position.y,
            position.z,
            STREAMER_ITEM_TYPES[type],
            maxItems,
            range,
            world,
        ) as number[]

        return itemIds
    }

    getItemPos(itemType: StreamerItemType, itemId: number) {
        const pos = nativeHook.callNative("Streamer_GetItemPos", "iiFFF", STREAMER_ITEM_TYPES[itemType], itemId) as number[]
        return new Vector3(pos[0], pos[1], pos[2])
    }

    setItemPos(itemType: StreamerItemType, itemId: number, position: Position3) {
        nativeHook.callNative("Streamer_SetItemPos", "iifff", STREAMER_ITEM_TYPES[itemType], itemId, position.x, position.y, position.z)
    }

    createDynamicObject(
        model: number,
        position: Position3,
        rotation: Position3,
        world: number,
        interior: number,
        playerId: number,
        streamDistance: number,
        drawDistance: number,
        areaId: number,
        priority: number,
    ) {
        const id = nativeHook.callNative(
            "CreateDynamicObject",
            "iffffffiiiffii",
            model,
            position.x,
            position.y,
            position.z,
            rotation.x,
            rotation.y,
            rotation.z,
            world,
            interior,
            playerId,
            streamDistance,
            drawDistance,
            areaId,
            priority,
        ) as number

        return id === INVALID_STREAMER_ID ? undefined : id
    }

    destroyDynamicObject(objectId: number) {
        nativeHook.callNative("DestroyDynamicObject", "i", objectId)
    }

    isDynamicObjectMaterialUsed(objectId: number, materialIndex: number) {
        return nativeHook.callNative("IsDynamicObjectMaterialUsed", "ii", objectId, materialIndex) === 1
    }

    removeDynamicObjectMaterial(objectId: number, materialIndex: number) {
        nativeHook.callNative("RemoveDynamicObjectMaterial", "ii", objectId, materialIndex)
    }

    getDynamicObjectMaterial(objectId: number, materialIndex: number) {
        const ret = nativeHook.callNative("GetDynamicObjectMaterial", "iiISSIii", objectId, materialIndex, 80, 80) as [
            number,
            string,
            string,
            number,
        ]

        return {
            model: ret[0],
            txd: ret[1],
            texture: ret[2],
            color: rgbaIntToHex(ret[3]),
        }
    }

    setDynamicObjectMaterial(
        objectId: number,
        materialIndex: number,
        modelId: number,
        txdName: string,
        textureName: string,
        materialColor: string,
    ) {
        nativeHook.callNative(
            "SetDynamicObjectMaterial",
            "iiissi",
            objectId,
            materialIndex,
            modelId,
            txdName,
            textureName,
            hexToRgbaInt(materialColor),
        )
    }

    isDynamicObjectMaterialTextUsed(objectId: number, materialIndex: number) {
        return nativeHook.callNative("IsDynamicObjectMaterialTextUsed", "ii", objectId, materialIndex) === 1
    }

    removeDynamicObjectMaterialText(objectId: number, materialIndex: number) {
        nativeHook.callNative("RemoveDynamicObjectMaterialText", "ii", objectId, materialIndex)
    }

    setDynamicObjectMaterialText(
        objectId: number,
        materialIndex: number,
        text: string,
        materialSize: EnumValue<typeof MATERIAL_TEXT_SIZES>,
        fontFace: string,
        fontSize: number,
        bold: boolean,
        fontColor: string,
        backColor: string,
        textAlignment: EnumValue<typeof MATERIAL_TEXT_ALIGNMENTS>,
    ) {
        const { flag, encoded } = charset.encode(text)

        nativeHook.callNative(
            "SetDynamicObjectMaterialText",
            `ii${flag}isiiiii`,
            objectId,
            materialIndex,
            encoded,
            materialSize,
            fontFace,
            fontSize,
            bold,
            hexToRgbaInt(fontColor),
            hexToRgbaInt(backColor),
            textAlignment,
        )
    }
}

export const streamerNatives = new StreamerNatives()
