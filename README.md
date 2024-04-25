# Open Godfather :warning: Experimental :warning:

Fully-typed Node.js library for building open.mp scripts with the [samp-node](https://github.com/AmyrAhmady/samp-node) plugin in an object-oriented manner.

- [Starting a project](#starting-a-project)
- [Usage example](#usage-example)
- [Quirks](#quirks)
- [Is this complete?](#is-this-complete)

## Starting a project

One-step installation, just run the command below to start a Typescript project in your **current directory**.

```bash
cd my-project
npx github:vladgitx/og-cli
```

That's it! You can now edit `src/index.ts` and start the server with `npm run start`.

### You know what you're doing?

If you don't want to use the [Open Godfather CLI](https://github.com/vladgitx/og-cli), you can handle server files, plugins, etc. by yourself. Just run `npm install github:vladgitx/open-godfather` to install this package in your existing project.
    
## Usage example

Spawn a player based on the dialog's response.

```typescript
import { og } from "open-godfather"

og.events.on("playerConnect", async (player) => {
    const result = await player.dialog.show.messageBox("Hey", "Wanna spawn?", "Yes", "No")
	
    if (result?.action) {
        player.spawn(new og.Vector3(1664.464, 1410.141, 10.642))
        player.sendMessage("Welcome to the server!")
    }
})
```

### Commands

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

## Quirks

This library overrides some of the default SA-MP behavior in order to simplify things.

### Connection and spawning

Players are placed into spectate mode when they connect, and all that's left is to spawn them.

### Damage

This library abolishes player teams, so all players are assigned the same team when they connect. In SA-MP, players wouldn't be able to damage each other, but Open Godfather still applies damage.

However, once you define a `playerDamage` event, the Open Godfather effect is disabled and you have to apply the damage manually:

```typescript
og.events.on("playerDamage", (player, issuer, amount, weapon, bodyPart) => {
    if (issuer) {
    	player.health -= amount
    }
})
```

### Commands

Commands are called normally until you define a `playerCommand` event. Once you do that, you have to call the command manually:

```typescript
og.events.on("playerCommand", (player, cmdText, command, call) => {
    if (command) {
        call()
    } else {
        player.sendMessage(`Command "${cmdText}" doesn't exist.`)
    }
})
```

### Colors

You can use HEX colors for everything:

```typescript
player.sendMessage("Hey!", "9163f2")
```

## Is this complete?

There are still a lot of natives missing. If you need a native that's not supported yet, you have two options:

- Simply use the samp-node's `samp.callNative` function. You can also wrap it to make it type-safe.
- Import it from a library like [samp-node-lib](https://github.com/peterszombati/samp-node-lib).

This comes with a potential risk of having to refactor things when they're finally supported by the library, so the best and most appreciated way would be to contribute to this project through a pull request.

### Not complete enough?

A more complete solution, that wraps more plugins and covers most of the scripting API, is the [Infernus library](https://github.com/dockfries/infernus).
