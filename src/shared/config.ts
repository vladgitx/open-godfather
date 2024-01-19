import { Vector3 } from "../modules/vector3"

export const CONFIG = {
	player: {
		team: 0,
		color: "FFFFFF",
		skin: 0,
		cash: 0,
		spawn: {
			position: new Vector3(),
			rotation: 0,
			world: 0,
			interior: 0,
		},
	},
	vehicle: {
		interior: 0,
		plate: "",
		primaryColor: -1,
		secondaryColor: -1,
		respawnDelay: -1,
		siren: false,
	},
	message: {
		color: "FFFFFF",
	},
	chatBubble: {
		color: "FFFFFF",
		distance: 12,
		expire: 5000,
	},
}
