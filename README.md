# Open Godfather

Node.js library for building open.mp scripts with the [samp-node](https://github.com/AmyrAhmady/samp-node) plugin.

## Installation

```bash
npm install github:vladgitx/open-godfather
```
    
## Usage example

```typescript
import { og } from "open-godfather"

og.events.on("playerConnect", async (player) => {
    const result = await player.dialog.show.message("Hello", "Do you want to join this server?", "Yes", "No")
	
    if (result.button === "main") {
        player.spawn(new og.Vector3(1664.464, 1410.141, 10.642))
        player.sendMessage("Welcome to the server!")
    }
})
```

## Contributing

Contributions are always welcome, since there's plenty of work ahead (pickups, checkpoints, etc.). This project follows a very consistent code structure, so review existing modules before contributing.
