export declare class Entity {
    id: number;
    private variables;
    private cleanupCallbacks;
    constructor(id: number);
    onCleanup(callback: () => void): void;
    setVariable(name: string, value: unknown): void;
    getVariable(name: string): unknown;
    deleteVariable(name: string): boolean;
    set exists(value: false);
    get exists(): boolean;
}
