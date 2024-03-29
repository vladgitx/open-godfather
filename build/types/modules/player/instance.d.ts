import { PlayerStatesEnum, SpecialActionsEnum, VehicleSeatsEnum } from "../../shared/enums";
import { Vector3 } from "../vector3";
import { VehicleMp } from "../vehicle";
import { PlayerAnimations } from "./animations";
import { PlayerDialog } from "./dialog";
import { PlayerWeapons } from "./weapons";
import { Entity } from "../entity";
import { PlayerTextLabels } from "./text-label";
import { PlayerAttachedObjects } from "./attached-objects";
export declare class PlayerMp extends Entity {
    readonly dialog: PlayerDialog;
    readonly weapons: PlayerWeapons;
    readonly animations: PlayerAnimations;
    readonly textLabels: PlayerTextLabels;
    readonly attachedObjects: PlayerAttachedObjects;
    private _name;
    private _color;
    private _cash;
    private _skin;
    private _spectating;
    constructor(id: number);
    sendMessage(message: string, color?: string): void;
    spawn(position?: Vector3, rotation?: number, world?: number, interior?: number): void;
    kick(delay?: number): void;
    set spectating(spectating: boolean);
    get spectating(): boolean;
    set position(position: Vector3);
    get position(): Vector3;
    set specialAction(action: SpecialActionsEnum);
    get specialAction(): SpecialActionsEnum;
    set skin(skin: number);
    get skin(): number;
    set rotation(rotation: number);
    get rotation(): number;
    set name(name: string);
    get name(): string;
    set world(value: number);
    get world(): number;
    set interior(value: number);
    get interior(): number;
    set health(value: number);
    get health(): number;
    set armour(value: number);
    get armour(): number;
    set color(hex: string);
    get color(): string;
    get ip(): string;
    get ping(): number;
    get gpci(): string;
    set cash(value: number);
    get cash(): number;
    set score(value: number);
    get score(): number;
    get cameraMode(): import("../../shared/enums").CameraModesEnum;
    setChatBubble(text: string, color?: string, drawDistance?: number, expireTime?: number): boolean;
    get spawned(): boolean | undefined;
    get state(): PlayerStatesEnum | undefined;
    putIntoVehicle(vehicle: VehicleMp, seat?: VehicleSeatsEnum): boolean;
    get vehicle(): VehicleMp | undefined;
    get vehicleSeat(): VehicleSeatsEnum | undefined;
}
