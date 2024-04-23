import { Vector3 } from "@/modules/vector3"

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
            "iifffiiiiii",
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
        const pos = samp.callNative("Streamer_GetItemPos", "ii", STREAMER_ITEM_TYPES[itemType], itemId) as number[]
        return new Vector3(pos[0], pos[1], pos[2])
    }

    setItemPos(itemType: StreamerItemType, itemId: number, position: Vector3) {
        samp.callNative("Streamer_SetItemPos", "iifff", STREAMER_ITEM_TYPES[itemType], itemId, position.x, position.y, position.z)
    }
}

export const streamerNatives = new StreamerNatives()
