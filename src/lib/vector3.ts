export interface Position3 {
    x: number
    y: number
    z: number
}

export interface Position2 {
    x: number
    y: number
}

export class Vector3 implements Position3 {
    public x: number
    public y: number
    public z: number

    constructor(x?: number, y?: number, z?: number)
    constructor(position: Partial<Position3>)

    constructor(x: number | Partial<Position3> = 0, y = 0, z = 0) {
        if (typeof x === "object") {
            this.x = x.x ?? 0
            this.y = x.y ?? 0
            this.z = x.z ?? 0
        } else {
            this.x = x
            this.y = y
            this.z = z
        }
    }

    add(position: Position3): Vector3 {
        return new Vector3(this.x + position.x, this.y + position.y, this.z + position.z)
    }

    subtract(position: Position3): Vector3 {
        return new Vector3(this.x - position.x, this.y - position.y, this.z - position.z)
    }

    scale(scalar: number): Vector3 {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar)
    }

    dot(position: Position3): number {
        return this.x * position.x + this.y * position.y + this.z * position.z
    }

    cross(position: Position3): Vector3 {
        return new Vector3(
            this.y * position.z - this.z * position.y,
            this.z * position.x - this.x * position.z,
            this.x * position.y - this.y * position.x,
        )
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    normalize(): Vector3 {
        const len = this.length()
        return len > 0 ? this.scale(1 / len) : new Vector3()
    }

    distance(position: Position3): number {
        const dx = this.x - position.x
        const dy = this.y - position.y
        const dz = this.z - position.z
        return Math.sqrt(dx * dx + dy * dy + dz * dz)
    }

    inFrontXY(angle: number, distance: number, newZ?: number): Vector3 {
        const radians = (-angle * Math.PI) / 180 // In SA-MP, angles are reversed

        const offsetX = Math.sin(radians) * distance
        const offsetY = Math.cos(radians) * distance

        return new Vector3(this.x + offsetX, this.y + offsetY, newZ ?? this.z)
    }
}
