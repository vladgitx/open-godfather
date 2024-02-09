export class Vector3 {
	x: number
	y: number
	z: number

	constructor(x: number = 0, y: number = 0, z: number = 0) {
		this.x = x
		this.y = y
		this.z = z
	}

	add(v: Vector3): Vector3 {
		return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
	}

	subtract(v: Vector3): Vector3 {
		return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z)
	}

	scale(scalar: number): Vector3 {
		return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar)
	}

	dot(v: Vector3): number {
		return this.x * v.x + this.y * v.y + this.z * v.z
	}

	cross(v: Vector3): Vector3 {
		return new Vector3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x)
	}

	length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
	}

	normalize(): Vector3 {
		const len = this.length()
		return len > 0 ? this.scale(1 / len) : new Vector3()
	}

	distance(v: Vector3): number {
		const dx = this.x - v.x
		const dy = this.y - v.y
		const dz = this.z - v.z
		return Math.sqrt(dx * dx + dy * dy + dz * dz)
	}

	inFrontXY(angle: number, distance: number, z?: number): Vector3 {
		const dx = Math.cos(angle) * distance
		const dy = Math.sin(angle) * distance

		const newX = this.x + dx
		const newY = this.y + dy

		return new Vector3(newX, newY, z != undefined ? z : this.z)
	}
}
