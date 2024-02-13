# Open Godfather

Node.js library for building open.mp scripts with the [samp-node](https://github.com/AmyrAhmady/samp-node) plugin.

## Installation

```bash
npm install github:vladgitx/open-godfather
```
    
## Usage example

The player is immediately placed into spectate mode when they connect, and all that's left is to spawn them. This approach eliminates class selection and team assignments, simplifying the initialization process.

```typescript
import { og } from "open-godfather"

og.events.on("playerConnect", async (player) => {
    const result = await player.dialog.show.messageBox("Hey", "Wanna spawn?", "Yes", "No")
	
    if (result?.button === "main") {
        player.spawn(new og.Vector3(1664.464, 1410.141, 10.642))
        player.sendMessage("Welcome to the server!")
    }
})
```

The player can spawn a car with a specific model ID using the "/car", "/vehicle", or "/veh" command. If the model is not specified, it will use 411 (Infernus).

```typescript
og.commands.add("/car", ["/vehicle", "/veh"], (player, modelParam = "411") => {
    const vehicle = og.vehicles.new(parseInt(modelParam), player.position, player.rotation)

    if (vehicle) {
        player.putIntoVehicle(vehicle)

        vehicle.params.engine = "on"
        vehicle.params.lights = "on"
    }
})
```

## Contributing

Contributions are always welcome, since there's plenty of work ahead (pickups, checkpoints, etc.). This project follows a very consistent code structure, so review existing modules before contributing.
