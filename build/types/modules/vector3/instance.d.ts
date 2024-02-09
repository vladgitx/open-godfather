export declare class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    add(v: Vector3): Vector3;
    subtract(v: Vector3): Vector3;
    scale(scalar: number): Vector3;
    dot(v: Vector3): number;
    cross(v: Vector3): Vector3;
    length(): number;
    normalize(): Vector3;
    distance(v: Vector3): number;
    inFrontXY(angle: number, distance: number, z?: number): Vector3;
}
