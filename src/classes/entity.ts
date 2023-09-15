import { EntityPosition } from "../types"

export class Entity {
    readonly id: number
    #variables: Map<string, any>

    constructor(id: number) {
        this.id = id
        this.#variables = new Map()
    }

    setVariable(name: string, value: any) {
        this.#variables.set(name, value)
    }

    getVariable(name: string) {
        return this.#variables.get(name)
    }

    deleteVariable(name: string) {
        return this.#variables.delete(name)
    }
}

export interface GenericEntity {
    get exists(): boolean

    setTimeout(callback: () => void, delay: number): NodeJS.Timeout

    setInterval(callback: () => void, delay: number): NodeJS.Timeout
}

export interface WorldEntity extends GenericEntity {
    set world(value: number)

    get world(): number

    set interior(value: number)

    get interior(): number

    set rotation(rotation: number)

    get rotation(): number

    setPosition(position: EntityPosition): any

    getPosition(): EntityPosition

    getDistance(position: EntityPosition, world?: number, interior?: number): number
}