
# Open Godfather

Node.js framework for building SA-MP and open.mp scripts with the [samp-node](https://github.com/AmyrAhmady/samp-node) plugin.


## Installation

```bash
npm install github:vladgitx/open-godfather
```
    
## Usage example

```typescript
import { og, DialogStylesEnum } from "open-godfather"

og.events.on("playerConnect", async (player) => {
	const res = await player.dialog.show(DialogStylesEnum.MessageBox, "Hello", "Do you want to join this server?", "Yes", "No")

	if (res.response !== "first") {
		player.kick()
	} else {
		player.spawn(new og.Vector3(1664.464, 1410.141, 10.642))
		player.sendMessage("Welcome to the server!")
	}
})
```

## Fully typed

The project is entirely type-safe, including the events.

![Showing typescript](https://i.imgur.com/nZsJ5xF.png)


## Contributing

Contributions are always welcome, since there's plenty of work ahead (pickups, checkpoints, etc.). This project follows a very consistent code structure, so review existing modules before contributing.