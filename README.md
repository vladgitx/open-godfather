# Open Godfather

> **Status:** Experimental / early development

Open Godfather is a fully typed Node.js/TypeScript framework for building [open.mp](https://open.mp/) servers with the [samp-node](https://github.com/AmyrAhmady/samp-node) plugin.

It provides an object-oriented entity model, managed entity lifecycles, typed events, commands, dialogs, streamer integration, and high-level gameplay APIs while still allowing direct access to samp-node when needed.

* [Starting a project](#starting-a-project)
* [Usage example](#usage-example)
* [Framework behavior](#framework-behavior)
* [Project status](#project-status)

## Starting a project

The easiest way to start a project is with [create-og-app](https://github.com/vladgitx/create-og-app), which sets up the server files, plugins, TypeScript project structure, and Rollup configuration for you.

```bash
cd my-project
npx github:vladgitx/og-cli
```

Once the project is created, edit `src/index.ts` and start the server with:

```bash
npm run start
```

### Manual setup

If you prefer to manage the open.mp server files, plugins, and build configuration yourself, install Open Godfather directly in an existing project:

```bash
npm install github:vladgitx/open-godfather
```

## Usage example

Open.mp entities are represented as TypeScript objects with their own state, behavior, events, and lifecycle.

For example, you can show a dialog when a player connects and spawn them depending on the response:

```typescript
import * as og from "open-godfather"

og.events.on("playerConnect", async (player) => {
    try {
        const result = await player.dialog.show.messageBox(
            "Hey",
            "Wanna spawn?",
            "Yes",
            "No",
        )

        if (result.action) {
            player.spawn(new og.Vector3(1664.464, 1410.141, 10.642))

            player.events.on("enterVehicle", (vehicle) => {
                player.sendMessage(`You entered a vehicle! (ID ${vehicle.id})`)
            })
        } else {
            player.sendMessage("Bye-bye")
            player.kick()
        }
    } catch {}
})
```

Dialog methods return promises and are automatically rejected when the operation can no longer complete, such as when another dialog replaces the current one or the player disconnects.

### Commands

Commands can be registered with aliases and receive the player and parsed arguments directly.

The example below creates `/car`, with `/vehicle` and `/veh` as aliases:

```typescript
og.commands.add("/car", ["/vehicle", "/veh"], (player, modelParam = "411") => {
    const vehicle = og.vehicles.new(
        parseInt(modelParam),
        player.position,
        player.rotation,
    )

    if (vehicle) {
        player.putIntoVehicle(vehicle)

        vehicle.params.engine = "on"
        vehicle.params.lights = "on"
    }
})
```

## Framework behavior

Open Godfather intentionally changes some default SA-MP behavior to provide simpler and more predictable application-level APIs.

### Connection and spawning

Players are placed into spectate mode when they connect, leaving spawning under application control. Their default name color is also set to white.

### Overridable default behavior

Some gameplay events have default framework behavior. Registering a listener for these events transfers control to your application, allowing the default behavior to be replaced entirely.

#### Damage

Open Godfather does not rely on SA-MP teams for normal damage handling. Players are assigned to the same internal team while the framework applies damage itself.

Registering a `playerDamage` listener disables the default damage behavior:

```typescript
og.events.on("playerDamage", (player, issuer, amount, weapon, bodyPart) => {
    if (issuer) {
        player.health -= amount
    }
})
```

#### Commands

Commands execute automatically unless a `playerCommand` listener is registered. When one is present, your application decides whether the matched command should run:

```typescript
og.events.on("playerCommand", (player, cmdText, command, call) => {
    if (command) {
        call()
    } else {
        player.sendMessage(`Command "${cmdText}" doesn't exist.`)
    }
})
```

#### Chat

By default, player messages are handled normally. Registering a `playerText` listener gives your application full control over chat behavior.

A basic global chat implementation could look like this:

```typescript
og.events.on("playerText", (player, text) => {
    if (text) {
        og.players.broadcast(`${player.name}: ${text}`)
    }
})
```

### Vehicle parameters

Vehicle engines and lights use manual control by default, so newly created vehicles start with their engine off.

```typescript
vehicle.params.engine = "on"
vehicle.params.lights = "on"
```

### Colors

HEX colors can be used directly throughout the framework:

```typescript
player.sendMessage("Hey!", "9163f2")
```

## Project status

Open Godfather is under active development and does not yet expose every open.mp native or plugin API.

Unsupported natives can still be accessed directly through samp-node:

```typescript
samp.callNative(...)
```

This allows high-level Open Godfather APIs and low-level samp-node calls to be used together when necessary.

Contributions that expand API coverage, improve existing abstractions, or add support for additional open.mp functionality are welcome.

### Alternatives

If you need broader coverage of the open.mp scripting API and a larger ecosystem of plugin wrappers, [Infernus](https://github.com/dockfries/infernus) is another TypeScript-based option.
