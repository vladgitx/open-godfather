/**
 * A registry that maps native function names to the public Pawn functions that will handle them.
 * Key: The name of the original native function (e.g., "ShowPlayerDialog").
 * Value: The name of the public function in the Pawn script (e.g., "Polyfill_ShowPlayerDialog").
 */
const nativeHookRegistry = new Map<string, string>()

/**
 * A wrapper for `samp.callNative`. It intercepts the call, checks if a hook is registered
 * for the native, and calls the corresponding public function if one exists. Otherwise,
 * it calls the original native function.
 */
function callNative(...[native, format, ...args]: Parameters<typeof samp.callNative>): ReturnType<typeof samp.callNative> {
    const publicHook = nativeHookRegistry.get(native)

    if (publicHook) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return samp.callPublic(publicHook, format, ...args)
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return samp.callNative(native, format, ...args)
}

/**
 * A wrapper for `samp.callNativeFloat`. It intercepts the call, checks if a hook is registered
 * for the native, and calls the corresponding public function if one exists. Otherwise,
 * it calls the original native function.
 */
function callNativeFloat(...[native, format, ...args]: Parameters<typeof samp.callNativeFloat>): ReturnType<typeof samp.callNativeFloat> {
    const publicHook = nativeHookRegistry.get(native)

    if (publicHook) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return samp.callPublicFloat(publicHook, format, ...args)
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return samp.callNativeFloat(native, format, ...args)
}

/**
 * Registers a hook to redirect a native function call to a public Pawn function.
 * @param nativeName The name of the native function to intercept.
 * @param publicHookName The name of the public function that will be called instead.
 */
function registerNativeHook(nativeName: string, publicHookName: string): void {
    nativeHookRegistry.set(nativeName, publicHookName)
}

/**
 * Unregisters a previously registered native hook.
 * @param nativeName The name of the native function whose hook should be removed.
 */
function unregisterNativeHook(nativeName: string): void {
    nativeHookRegistry.delete(nativeName)
}

/**
 * Retrieves a copy of the current native hook registry.
 * @returns A map of native function names to their corresponding public hook names.
 */
function getRegisteredNativeHooks(): Map<string, string> {
    return new Map(nativeHookRegistry)
}

/**
 * Clears all registered native hooks from the registry.
 */
function clearNativeHooks(): void {
    nativeHookRegistry.clear()
}

/**
 * Exports the native hooking functionality. This can be used as a drop-in replacement
 * for the standard samp-node native calls.
 */
export const nativeHook = {
    callNative: callNative as typeof samp.callNative,
    callNativeFloat: callNativeFloat as typeof samp.callNativeFloat,
    register: registerNativeHook,
    unregister: unregisterNativeHook,
    getRegisteredHooks: getRegisteredNativeHooks,
    clear: clearNativeHooks,
}
