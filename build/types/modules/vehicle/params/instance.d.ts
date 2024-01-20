import { VehicleMp } from "..";
export declare class VehicleParams {
    private vehicle;
    private _engine;
    private _lights;
    private _alarm;
    private _doors;
    private _bonnet;
    private _boot;
    private _objective;
    constructor(vehicle: VehicleMp);
    set engine(value: "on" | "off");
    get engine(): "on" | "off";
    set lights(value: "on" | "off");
    get lights(): "on" | "off";
    set alarm(value: "on" | "off");
    get alarm(): "on" | "off";
    set doors(value: "locked" | "unlocked");
    get doors(): "locked" | "unlocked";
    set hood(value: "closed" | "open");
    get hood(): "closed" | "open";
    set trunk(value: "closed" | "open");
    get trunk(): "closed" | "open";
    set objective(value: "on" | "off");
    get objective(): "on" | "off";
}
