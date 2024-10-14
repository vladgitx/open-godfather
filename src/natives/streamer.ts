import { hexToRgbaInt, rgbaIntToHex } from "@/lib/utils"
import { Vector3 } from "@/lib/vector3"
import type { MaterialTextAlignmentsEnum, MaterialTextSizesEnum } from ".."

const INVALID_STREAMER_ID = 0

const STREAMER_ITEM_TYPES = {
    object: 0,
    pickup: 1,
    checkpoint: 2,
    raceCheckpoint: 3,
    mapIcon: 4,
    textLabel: 5,
    area: 6,
    actor: 7,
} as const

export type StreamerItemType = keyof typeof STREAMER_ITEM_TYPES

const STREAMER_ITEM_DATA = {
    areaId: 0,
    attachedObject: 1,
    attachedPlayer: 2,
    attachedVehicle: 3,
    attachOffsetX: 4,
    attachOffsetY: 5,
    attachOffsetZ: 6,
    attachRotX: 7,
    attachRotY: 8,
    attachRotZ: 9,
    attachX: 10,
    attachY: 11,
    attachZ: 12,
    color: 13,
    drawDistance: 14,
    extraId: 15,
    health: 16,
    interiorId: 17,
    invulnerable: 18,
    maxX: 19,
    maxY: 20,
    maxZ: 21,
    minX: 22,
    minY: 23,
    minZ: 24,
    modelId: 25,
    moveRotX: 26,
    moveRotY: 27,
    moveRotZ: 28,
    moveSpeed: 29,
    moveX: 30,
    moveY: 31,
    moveZ: 32,
    nextX: 33,
    nextY: 34,
    nextZ: 35,
    playerId: 36,
    priority: 37,
    rotation: 38,
    rotX: 39,
    rotY: 40,
    rotZ: 41,
    size: 42,
    streamDistance: 43,
    style: 44,
    syncRotation: 45,
    testLOS: 46,
    type: 47,
    worldId: 48,
    x: 49,
    y: 50,
    z: 51,
} as const

type StreamerItemData = keyof typeof STREAMER_ITEM_DATA

class StreamerNatives {
    createDynamicCheckpoint(
        position: Vector3,
        size: number,
        worldId: number,
        interiorId: number,
        playerId: number,
        streamDistance: number,
        areaId: number,
        priority: number,
    ) {
        const id = samp.callNative(
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
        samp.callNative("DestroyDynamicCP", "i", id)
    }

    isValidDynamicCheckpoint(id: number) {
        return samp.callNative("IsValidDynamicCP", "i", id) === 1
    }

    togglePlayerDynamicCheckpoint(playerId: number, checkpointId: number, toggle: boolean) {
        samp.callNative("TogglePlayerDynamicCP", "iii", playerId, checkpointId, toggle ? 1 : 0)
    }

    togglePlayerAllDynamicCheckpoints(playerId: number, toggle: boolean) {
        samp.callNative("TogglePlayerAllDynamicCPs", "ii", playerId, toggle ? 1 : 0)
    }

    isPlayerInDynamicCheckpoint(playerId: number, checkpointId: number) {
        return samp.callNative("IsPlayerInDynamicCP", "ii", playerId, checkpointId) === 1
    }

    getPlayerVisibleDynamicCheckpoint(playerId: number) {
        const id = samp.callNative("GetPlayerVisibleDynamicCP", "i", playerId) as number
        return id === INVALID_STREAMER_ID ? undefined : id
    }

    createDynamicPickup(
        modelId: number,
        type: number,
        position: Vector3,
        worldId: number,
        interiorId: number,
        playerId: number,
        streamDistance: number,
        areaId: number,
        priority: number,
    ) {
        const id = samp.callNative(
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
        samp.callNative("DestroyDynamicPickup", "i", pickupId)
    }

    isValidDynamicPickup(pickupId: number) {
        return samp.callNative("IsValidDynamicPickup", "i", pickupId) === 1
    }

    createDynamic3dTextLabel(
        text: string,
        color: string,
        position: Vector3,
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
        const id = samp.callNative(
            "CreateDynamic3DTextLabel",
            "siffffiiiiiifii",
            text,
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
        samp.callNative("DestroyDynamic3DTextLabel", "i", textLabelId)
    }

    isValidDynamic3dTextLabel(textLabelId: number) {
        return samp.callNative("IsValidDynamic3DTextLabel", "i", textLabelId) === 1
    }

    getDynamic3dTextLabelText(textLabelId: number) {
        return samp.callNative("GetDynamic3DTextLabelText", "iSi", textLabelId, 256) as string
    }

    updateDynamic3dTextLabelText(textLabelId: number, color: string, text: string) {
        samp.callNative("UpdateDynamic3DTextLabelText", "iis", textLabelId, hexToRgbaInt(color), text)
    }

    getFloatData(itemType: StreamerItemType, itemId: number, itemData: StreamerItemData) {
        return samp.callNativeFloat(
            "Streamer_GetFloatData",
            "iiiF",
            STREAMER_ITEM_TYPES[itemType],
            itemId,
            STREAMER_ITEM_DATA[itemData],
        ) as number
    }

    setFloatData(itemType: StreamerItemType, itemId: number, itemData: StreamerItemData, value: number) {
        samp.callNative("Streamer_SetFloatData", "iiif", STREAMER_ITEM_TYPES[itemType], itemId, STREAMER_ITEM_DATA[itemData], value)
    }

    getIntData(itemType: StreamerItemType, itemId: number, itemData: StreamerItemData) {
        return samp.callNative("Streamer_GetIntData", "iii", STREAMER_ITEM_TYPES[itemType], itemId, STREAMER_ITEM_DATA[itemData]) as number
    }

    setIntData(itemType: StreamerItemType, itemId: number, itemData: StreamerItemData, value: number) {
        samp.callNative("Streamer_SetIntData", "iiii", STREAMER_ITEM_TYPES[itemType], itemId, STREAMER_ITEM_DATA[itemData], value)
    }

    countVisibleItems(playerId: number, type: StreamerItemType) {
        return samp.callNative("Streamer_CountVisibleItems", "iii", playerId, STREAMER_ITEM_TYPES[type], 1) as number
    }

    countItems(type: StreamerItemType) {
        return samp.callNative("Streamer_CountItems", "ii", STREAMER_ITEM_TYPES[type], 1) as number
    }

    getNearbyItems(position: Vector3, type: StreamerItemType, maxItems: number, range: number, world: number) {
        const itemIds = samp.callNative(
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
        const pos = samp.callNative("Streamer_GetItemPos", "iiFFF", STREAMER_ITEM_TYPES[itemType], itemId) as number[]
        return new Vector3(pos[0], pos[1], pos[2])
    }

    setItemPos(itemType: StreamerItemType, itemId: number, position: Vector3) {
        samp.callNative("Streamer_SetItemPos", "iifff", STREAMER_ITEM_TYPES[itemType], itemId, position.x, position.y, position.z)
    }

    createDynamicObject(
        model: number,
        position: Vector3,
        rotation: Vector3,
        world: number,
        interior: number,
        playerId: number,
        streamDistance: number,
        drawDistance: number,
        areaId: number,
        priority: number,
    ) {
        const id = samp.callNative(
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
        samp.callNative("DestroyDynamicObject", "i", objectId)
    }

    isDynamicObjectMaterialUsed(objectId: number, materialIndex: number) {
        return samp.callNative("IsDynamicObjectMaterialUsed", "ii", objectId, materialIndex) === 1
    }

    removeDynamicObjectMaterial(objectId: number, materialIndex: number) {
        samp.callNative("RemoveDynamicObjectMaterial", "ii", objectId, materialIndex)
    }

    getDynamicObjectMaterial(objectId: number, materialIndex: number) {
        const ret = samp.callNative("GetDynamicObjectMaterial", "iiISSIii", objectId, materialIndex, 80, 80) as [
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
        samp.callNative(
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
        return samp.callNative("IsDynamicObjectMaterialTextUsed", "ii", objectId, materialIndex) === 1
    }

    removeDynamicObjectMaterialText(objectId: number, materialIndex: number) {
        samp.callNative("RemoveDynamicObjectMaterialText", "ii", objectId, materialIndex)
    }

    setDynamicObjectMaterialText(
        objectId: number,
        materialIndex: number,
        text: string,
        materialSize: MaterialTextSizesEnum,
        fontFace: string,
        fontSize: number,
        bold: boolean,
        fontColor: string,
        backColor: string,
        textAlignment: MaterialTextAlignmentsEnum,
    ) {
        samp.callNative(
            "SetDynamicObjectMaterialText",
            "iisisiiiii",
            objectId,
            materialIndex,
            text,
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

class StreamerEvents {
    onPlayerPickUpDynamicPickup(callback: (playerId: number, pickupId: number) => void) {
        samp.on("OnPlayerPickUpDynamicPickup", callback)
    }

    onPlayerEnterDynamicCheckpoint(callback: (playerId: number, checkpointId: number) => void) {
        samp.on("OnPlayerEnterDynamicCP", callback)
    }

    onPlayerLeaveDynamicCheckpoint(callback: (playerId: number, checkpointId: number) => void) {
        samp.on("OnPlayerLeaveDynamicCP", callback)
    }
}

export const streamerEvents = new StreamerEvents()
