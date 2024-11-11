import { GameEntity } from "@/lib/entity/game"
import {
    gameNatives,
    INVALID_TEXTDRAW_ID,
    TEXT_DRAW_ALIGNMENTS,
    TEXT_DRAW_FONTS,
    type TextDrawAlignment,
    type TextDrawFont,
} from "@/wrapper/game"
import { type Player } from "../entity"
import { Position2, type Position3 } from "@/lib/vector3"

export class PlayerTextdraw extends GameEntity {
    private _text: string
    private _position: Position2

    constructor(
        private readonly player: Player,
        gameId: number,
        text: string,
        position: Position2,
    ) {
        super(gameId, INVALID_TEXTDRAW_ID)

        this._text = text
        this._position = position
    }

    show() {
        gameNatives.playerTextDrawShow(this.player.id, this.id)
    }

    hide() {
        gameNatives.playerTextDrawHide(this.player.id, this.id)
    }

    setLetterSize(width: number, height: number) {
        gameNatives.playerTextDrawLetterSize(this.player.id, this.id, width, height)
    }

    setTextSize(width: number, height: number) {
        gameNatives.playerTextDrawTextSize(this.player.id, this.id, width, height)
    }

    setAlignment(alignment: TextDrawAlignment) {
        gameNatives.playerTextDrawAlignment(this.player.id, this.id, TEXT_DRAW_ALIGNMENTS[alignment])
    }

    setColor(color: string) {
        gameNatives.playerTextDrawColor(this.player.id, this.id, color)
    }

    setUseBox(useBox: boolean) {
        gameNatives.playerTextDrawUseBox(this.player.id, this.id, useBox ? 1 : 0)
    }

    setBoxColor(color: string) {
        gameNatives.playerTextDrawBoxColor(this.player.id, this.id, color)
    }

    setShadow(size: number) {
        gameNatives.playerTextDrawSetShadow(this.player.id, this.id, size)
    }

    setOutline(size: number) {
        gameNatives.playerTextDrawSetOutline(this.player.id, this.id, size)
    }

    setBackgroundColor(color: string) {
        gameNatives.playerTextDrawBackgroundColor(this.player.id, this.id, color)
    }

    setFont(font: TextDrawFont) {
        gameNatives.playerTextDrawFont(this.player.id, this.id, TEXT_DRAW_FONTS[font])
    }

    setProportional(proportional: boolean) {
        gameNatives.playerTextDrawSetProportional(this.player.id, this.id, proportional ? 1 : 0)
    }

    setSelectable(selectable: boolean) {
        gameNatives.playerTextDrawSetSelectable(this.player.id, this.id, selectable ? 1 : 0)
    }

    setPreviewModel(modelIndex: number) {
        gameNatives.playerTextDrawSetPreviewModel(this.player.id, this.id, modelIndex)
    }

    setPreviewRotation(rotation: Position3, zoom: number) {
        gameNatives.playerTextDrawSetPreviewRot(this.player.id, this.id, rotation.x, rotation.y, rotation.z, zoom)
    }

    setPreviewVehicleColor(primaryColor: number, secondaryColor: number) {
        gameNatives.playerTextDrawSetPreviewVehCol(this.player.id, this.id, primaryColor, secondaryColor)
    }

    setPosition(position: Position2) {
        this._position = position
        gameNatives.playerTextDrawSetPos(this.player.id, this.id, position.x, position.y)
    }

    get position() {
        return this._position
    }

    set text(value: string) {
        this._text = value
        gameNatives.playerTextDrawSetString(this.player.id, this.id, value)
    }

    get text() {
        return this._text
    }
}
