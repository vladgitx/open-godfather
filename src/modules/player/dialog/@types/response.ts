export type DialogResponse =
	| {
			button: "main" | "second"
			item: number | undefined
			input: string
	  }
	| undefined
