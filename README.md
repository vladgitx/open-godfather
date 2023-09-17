
# Open Godfather

Node.js framework for building SA-MP and open.mp scripts with the [samp-node](https://github.com/AmyrAhmady/samp-node) plugin.


## Installation

```bash
npm install open-godfather
```
    
## Usage example

```typescript
import { OpenGf } from "open-godfather"

const og = new OpenGf({
    name: "my server",
    stuntBonuses: true,
})

og.events.playerConnect((player) => {
    player.setSpectating(true)
    
    player.showDialog(DialogStyleEnum.MSGBOX, "Hello", "Do you want to access the server?", "Spawn", "Leave", ((response) => {
        if (!response) {
            return player.kick()
        }
        player.sendMessage("Welcome!")
        player.setSpawnInfo(0, 101, { x: 0, y: 0, z: 3 }, 3)

        player.world = 0
        player.interior = 0
        player.health = 100
        player.armour = 0
    
        player.setSpectating(false)
    }))
})

og.events.playerRequestClass((player) => {
    player.spawn()
})
```
