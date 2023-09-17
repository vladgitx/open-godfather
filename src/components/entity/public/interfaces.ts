import { WorldPosition } from "../../../shared/types"

export interface WorldEntity {
    set world(value: number)

    get world(): number

    set interior(value: number)

    get interior(): number

    set rotation(rotation: number)

    get rotation(): number

    setPosition(position: WorldPosition): any

    getPosition(): WorldPosition

    getDistance(position: WorldPosition, world?: number, interior?: number): number
}