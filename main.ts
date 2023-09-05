namespace SpriteKind {
    export const ExitKey = SpriteKind.create()
    export const Shovel = SpriteKind.create()
    export const Inmate = SpriteKind.create()
    export const WireTool = SpriteKind.create()
    export const MetalTool = SpriteKind.create()
    export const KnifeTool = SpriteKind.create()
    export const Dealer = SpriteKind.create()
    export const StaffKEY = SpriteKind.create()
    export const GaurdKEY = SpriteKind.create()
    export const Bullet = SpriteKind.create()
    export const Opps = SpriteKind.create()
    export const TowerOpps = SpriteKind.create()
    export const GaurdPlayer = SpriteKind.create()
    export const Map = SpriteKind.create()
    export const MapMann = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    Up = true
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairNorth, function (sprite, location) {
    Doors = false
    tiles.setCurrentTilemap(tilemap`level2`)
    Player1.setPosition(400, 135)
    MapMan.setPosition(1000, 1000)
    if (GaurdKeyActivate == true) {
        GaurdKey.setPosition(Player1.x, Player1.y)
    }
    Key.setPosition(Player1.x, Player1.y)
    YellowKey.setPosition(Player1.x, Player1.y)
    if (Spawn2 == true) {
        game.showLongText("Find A Gaurd And Click \"A\" To PickPocket Them!! ", DialogLayout.Bottom)
        Gaurd1.setPosition(200, 200)
        AnimationGaurd1.setPosition(200, 200)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.StaffKEY, function (sprite, otherSprite) {
    Key.follow(Player1)
})
scene.onOverlapTile(SpriteKind.StaffKEY, assets.tile`myTile140`, function (sprite, location) {
    tiles.setWallAt(tiles.getTileLocation(19, 40), false)
    tiles.setWallAt(tiles.getTileLocation(20, 40), false)
    tiles.setWallAt(tiles.getTileLocation(21, 40), false)
    tiles.setTileAt(tiles.getTileLocation(18, 39), assets.tile`myTile128`)
    tiles.setTileAt(tiles.getTileLocation(18, 41), assets.tile`myTile128`)
    tiles.setTileAt(tiles.getTileLocation(19, 40), assets.tile`myTile`)
    tiles.setTileAt(tiles.getTileLocation(20, 40), assets.tile`myTile`)
    tiles.setTileAt(tiles.getTileLocation(21, 40), assets.tile`myTile`)
})
scene.onOverlapTile(SpriteKind.GaurdKEY, assets.tile`myTile142`, function (sprite, location) {
    tiles.setWallAt(tiles.getTileLocation(6, 20), false)
    tiles.setWallAt(tiles.getTileLocation(6, 21), false)
    tiles.setTileAt(tiles.getTileLocation(6, 20), assets.tile`myTile`)
    tiles.setTileAt(tiles.getTileLocation(6, 21), assets.tile`myTile`)
    Player1.sayText("Run!! The Gaurds Are Coming!", 1000, true)
    Escaping = true
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile65`, function (sprite, location) {
    tiles.setTileAt(tiles.getTileLocation(60, 12), sprites.castle.tilePath5)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Player1.overlapsWith(MapMan)) {
        myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 15)
        MapSprite = sprites.create(minimap.getImage(minimap.minimap(MinimapScale.Sixteenth, 2, 15)), SpriteKind.Map)
        MapSprite.setScale(1.6, ScaleAnchor.Middle)
        MapSprite.setPosition(Player1.x, Player1.y + 18)
        pause(1000)
        sprites.destroy(MapSprite)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Inmate, function (sprite, otherSprite) {
    if (ChatNumber == 1) {
        Chat = false
        Inmate.sayText("Head Over To The Cells, Find The Damaged Toilet And Break It With The Shovel..... ", 5000, true)
        pause(5000)
        pause(1000)
        Chat = true
    } else if (ChatNumber == 2) {
        Chat = false
        Inmate.sayText("To Unlock That Door You Need A Gaurds Key...", 5000, true)
        pause(5000)
        pause(1000)
        Spawn2 = true
        Chat = true
        tiles.setWallAt(tiles.getTileLocation(57, 41), false)
        game.showLongText("Head To The Basment... There Should Be A Gaurd There", DialogLayout.Bottom)
    } else if (ChatNumber == 3) {
        Chat = false
        Inmate.sayText("Bring Me A Shovel From The Yard, Then We Will Talk.....", 5000, true)
        pause(5000)
        pause(1000)
        Chat = true
    } else {
        Chat = false
        if (Craft == 3) {
            Craft += 1
            Shovel = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . e e . . . . . . . . . . . 
                . . . e e e . . . . . . . . . . 
                . . e . e e . . . . . . . . . . 
                . e e . e . . . . . . . . . . . 
                . e . e f f . . . . . . . . . . 
                . e e e . f f . . . . . . . . . 
                . . . . . . f f . . . . . . . . 
                . . . . . . . f f . . f f . . . 
                . . . . . . . . f f . f f f . . 
                . . . . . . . . . f f f f f f . 
                . . . . . . . . . f f f f f f . 
                . . . . . . . . f f f f f f f . 
                . . . . . . . . f f f f f f f . 
                . . . . . . . . f f f f f f f . 
                . . . . . . . . . . f f f f . . 
                `, SpriteKind.Shovel)
            Shovel.setPosition(Player1.x, Player1.y)
            Shovel.follow(Player1)
            ChatNumber += 1
        } else {
            Inmate.sayText("Find Me A Wire, Some Metal, And A Knife...", 5000, true)
            pause(5000)
            Knife.sayText("Knife")
            Wire.sayText("Wire")
            Metal.sayText("Metal")
            pause(1000)
            Chat = true
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.GaurdPlayer, function (sprite, otherSprite) {
    animation.runImageAnimation(
    AnimationGaurd1,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f 1 1 1 1 1 f . . . . . 
        . . . f 1 1 1 1 1 1 1 f . . . . 
        . . f 1 1 f f f f f 1 1 f . . . 
        . . f 1 1 f 1 1 1 f 1 1 f . . . 
        . . f 1 1 f f f f f 1 1 f . . . 
        . . f 1 1 f 1 1 1 f 1 1 f . . . 
        . . f 1 1 f 1 1 1 f 1 1 f . . . 
        . . . f 1 1 1 1 1 1 1 f . . . . 
        . . . . f 1 1 1 1 1 f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f 2 2 2 2 2 f . . . . . 
        . . . f 2 2 2 2 2 2 2 f . . . . 
        . . f 2 2 f f f f f 2 2 f . . . 
        . . f 2 2 f 2 2 2 f 2 2 f . . . 
        . . f 2 2 f f f f f 2 2 f . . . 
        . . f 2 2 f 2 2 2 f 2 2 f . . . 
        . . f 2 2 f 2 2 2 f 2 2 f . . . 
        . . . f 2 2 2 2 2 2 2 f . . . . 
        . . . . f 2 2 2 2 2 f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f 1 1 1 1 1 f . . . . . 
        . . . f 1 1 1 1 1 1 1 f . . . . 
        . . f 1 1 f f f f f 1 1 f . . . 
        . . f 1 1 f 1 1 1 f 1 1 f . . . 
        . . f 1 1 f f f f f 1 1 f . . . 
        . . f 1 1 f 1 1 1 f 1 1 f . . . 
        . . f 1 1 f 1 1 1 f 1 1 f . . . 
        . . . f 1 1 1 1 1 1 1 f . . . . 
        . . . . f 1 1 1 1 1 f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f 2 2 2 2 2 f . . . . . 
        . . . f 2 2 2 2 2 2 2 f . . . . 
        . . f 2 2 f f f f f 2 2 f . . . 
        . . f 2 2 f 2 2 2 f 2 2 f . . . 
        . . f 2 2 f f f f f 2 2 f . . . 
        . . f 2 2 f 2 2 2 f 2 2 f . . . 
        . . f 2 2 f 2 2 2 f 2 2 f . . . 
        . . . f 2 2 2 2 2 2 2 f . . . . 
        . . . . f 2 2 2 2 2 f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f 1 1 1 1 1 f . . . . . 
        . . . f 1 1 1 1 1 1 1 f . . . . 
        . . f 1 1 f f f f f 1 1 f . . . 
        . . f 1 1 f 1 1 1 f 1 1 f . . . 
        . . f 1 1 f f f f f 1 1 f . . . 
        . . f 1 1 f 1 1 1 f 1 1 f . . . 
        . . f 1 1 f 1 1 1 f 1 1 f . . . 
        . . . f 1 1 1 1 1 1 1 f . . . . 
        . . . . f 1 1 1 1 1 f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f 2 2 2 2 2 f . . . . . 
        . . . f 2 2 2 2 2 2 2 f . . . . 
        . . f 2 2 f f f f f 2 2 f . . . 
        . . f 2 2 f 2 2 2 f 2 2 f . . . 
        . . f 2 2 f f f f f 2 2 f . . . 
        . . f 2 2 f 2 2 2 f 2 2 f . . . 
        . . f 2 2 f 2 2 2 f 2 2 f . . . 
        . . . f 2 2 2 2 2 2 2 f . . . . 
        . . . . f 2 2 2 2 2 f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f 1 1 1 1 1 f . . . . . 
        . . . f 1 1 1 1 1 1 1 f . . . . 
        . . f 1 1 f f f f f 1 1 f . . . 
        . . f 1 1 f 1 1 1 f 1 1 f . . . 
        . . f 1 1 f f f f f 1 1 f . . . 
        . . f 1 1 f 1 1 1 f 1 1 f . . . 
        . . f 1 1 f 1 1 1 f 1 1 f . . . 
        . . . f 1 1 1 1 1 1 1 f . . . . 
        . . . . f 1 1 1 1 1 f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f 2 2 2 2 2 f . . . . . 
        . . . f 2 2 2 2 2 2 2 f . . . . 
        . . f 2 2 f f f f f 2 2 f . . . 
        . . f 2 2 f 2 2 2 f 2 2 f . . . 
        . . f 2 2 f f f f f 2 2 f . . . 
        . . f 2 2 f 2 2 2 f 2 2 f . . . 
        . . f 2 2 f 2 2 2 f 2 2 f . . . 
        . . . f 2 2 2 2 2 2 2 f . . . . 
        . . . . f 2 2 2 2 2 f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    200,
    true
    )
    pause(2000)
    animation.stopAnimation(animation.AnimationTypes.All, AnimationGaurd1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Player1.overlapsWith(Gaurd1)) {
        GaurdKey = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 2 . . . . . . 
            . . . 2 2 2 2 2 2 2 2 2 . . . . 
            . . 2 2 2 2 2 2 2 2 2 2 . . . . 
            . . 2 2 2 2 . . . 2 2 2 2 . . . 
            . . 2 2 2 . . . . 2 2 2 2 . . . 
            . . 2 2 2 2 2 2 2 2 2 2 . . . . 
            . . . 2 2 2 2 2 2 2 2 2 . . . . 
            . . . . 2 2 2 2 2 2 2 . . . . . 
            . . . . . 2 2 2 2 2 . . . . . . 
            . . . . . 2 2 2 2 . . . . . . . 
            . . . . . f 2 2 2 . . . . . . . 
            . . . . . f 2 2 2 . . . . . . . 
            . . . . . f 2 2 2 . . . . . . . 
            . . . . . f 2 2 2 . . . . . . . 
            . . . . . . 2 2 . . . . . . . . 
            `, SpriteKind.GaurdKEY)
        GaurdKey.setScale(0.5, ScaleAnchor.Middle)
        GaurdKey.setPosition(200, 200)
        YellowKey.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . . . . . . . . 
            . . . . . f . . . . . . . . . . 
            . . . . . f . . . . . . . . . . 
            . . . . . f . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        GaurdKey.follow(Player1)
        GaurdKeyActivate = true
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ExitKey, function (sprite, otherSprite) {
    YellowKey.follow(Player1)
    Key.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f . . . . . . . . . . 
        . . . . . f . . . . . . . . . . 
        . . . . . f . . . . . . . . . . 
        . . . . . f . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    Helper2()
})
sprites.onOverlap(SpriteKind.Bullet, SpriteKind.Player, function (sprite, otherSprite) {
    statusbar.value += -3
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    Back = false
})
scene.onOverlapTile(SpriteKind.ExitKey, assets.tile`myTile55`, function (sprite, location) {
    tiles.setWallAt(tiles.getTileLocation(18, 20), false)
    tiles.setWallAt(tiles.getTileLocation(18, 21), false)
    tiles.setWallAt(tiles.getTileLocation(18, 22), false)
    tiles.setTileAt(tiles.getTileLocation(18, 23), assets.tile`myTile59`)
    tiles.setTileAt(tiles.getTileLocation(18, 20), assets.tile`myTile`)
    tiles.setTileAt(tiles.getTileLocation(18, 21), assets.tile`myTile`)
    tiles.setTileAt(tiles.getTileLocation(18, 22), assets.tile`myTile`)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Left = true
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    Right = false
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile149`, function (sprite, location) {
	
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    Left = false
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.gameOver(false)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Right = true
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.MetalTool, function (sprite, otherSprite) {
    Craft += 1
    sprites.destroy(Metal)
    pause(500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.KnifeTool, function (sprite, otherSprite) {
    Craft += 1
    sprites.destroy(Knife)
    pause(500)
})
function Helper2 () {
    if (Yap2 == true) {
        Player1.sayText("Hmm... This Unlocks The Exit!!! (Next To The Cafeteria)", 2000, false)
        pause(1000)
        Yap2 = false
    }
}
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    Up = false
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    Back = true
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile148`, function (sprite, location) {
    game.setGameOverMessage(true, "YOU ESCAPED!!!!")
    game.setGameOverEffect(true, effects.starField)
    game.gameOver(true)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile122`, function (sprite, location) {
    Doors = true
    tiles.setCurrentTilemap(tilemap`level1`)
    MapMan.setPosition(310, 275)
    Gaurd1.setPosition(0, 0)
    AnimationGaurd1.setPosition(0, 0)
    Player1.setPosition(920, 700)
    if (GaurdKeyActivate == true) {
        GaurdKey.setPosition(Player1.x, Player1.y)
    }
    Key.setPosition(Player1.x, Player1.y)
    YellowKey.setPosition(Player1.x, Player1.y)
    tiles.setWallAt(tiles.getTileLocation(57, 41), false)
})
scene.onOverlapTile(SpriteKind.Shovel, assets.tile`myTile63`, function (sprite, location) {
    tiles.setTileAt(tiles.getTileLocation(15, 7), assets.tile`myTile7`)
    Key = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . 7 7 7 7 7 7 . . . . . . 
        . . . 7 7 7 7 7 7 7 7 7 . . . . 
        . . 7 7 7 7 7 7 7 7 7 7 . . . . 
        . . 7 7 7 7 . . . 7 7 7 7 . . . 
        . . 7 7 7 . . . . 7 7 7 7 . . . 
        . . 7 7 7 7 7 7 7 7 7 7 . . . . 
        . . . 7 7 7 7 7 7 7 7 7 . . . . 
        . . . . 7 7 7 7 7 7 7 . . . . . 
        . . . . . 7 7 7 7 7 . . . . . . 
        . . . . . 7 7 7 7 . . . . . . . 
        . . . . . f 7 7 7 . . . . . . . 
        . . . . . f 7 7 7 . . . . . . . 
        . . . . . f 7 7 7 . . . . . . . 
        . . . . . f 7 7 7 . . . . . . . 
        . . . . . . 7 7 . . . . . . . . 
        `, SpriteKind.StaffKEY)
    Key.setScale(0.5, ScaleAnchor.Middle)
    Key.setPosition(247, 120)
    sprites.destroy(Shovel)
    Help2()
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile139`, function (sprite, location) {
    if (Yap3 == true) {
        game.showLongText("Hmmm.... We Need To Go See The Dealer.. This Door Is Locked", DialogLayout.Bottom)
        pause(1000)
        ChatNumber += 1
        Yap3 = false
    }
})
function Help2 () {
    pause(2000)
    game.showLongText("Wow! The Green Key... Take This Key To The Staff Room (At The Bottom Of The Map)", DialogLayout.Bottom)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.WireTool, function (sprite, otherSprite) {
    Craft += 1
    sprites.destroy(Wire)
    pause(500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Opps, function (sprite, otherSprite) {
    statusbar.value += -2
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile131`, function (sprite, location) {
    if (Yap == true) {
        game.showLongText("There Should Be A Yellow Key In This Room!!", DialogLayout.Bottom)
        pause(1000)
        Yap = false
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.MapMann, function (sprite, otherSprite) {
    Mapchat = false
    MapMan.sayText("Press B For Map", 1000, false)
    pause(1000)
    Mapchat = true
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile23`, function (sprite, location) {
    tiles.setTileAt(tiles.getTileLocation(37, 33), assets.tile`myTile50`)
    tiles.setTileAt(tiles.getTileLocation(37, 34), assets.tile`myTile51`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile14`, function (sprite, location) {
    tiles.setTileAt(tiles.getTileLocation(25, 50), assets.tile`myTile60`)
    tiles.setTileAt(tiles.getTileLocation(26, 50), assets.tile`myTile61`)
    tiles.setTileAt(tiles.getTileLocation(23, 10), assets.tile`myTile60`)
})
scene.onOverlapTile(SpriteKind.ExitKey, assets.tile`myTile56`, function (sprite, location) {
    tiles.setWallAt(tiles.getTileLocation(18, 20), false)
    tiles.setWallAt(tiles.getTileLocation(18, 21), false)
    tiles.setWallAt(tiles.getTileLocation(18, 22), false)
    tiles.setTileAt(tiles.getTileLocation(18, 23), assets.tile`myTile59`)
    tiles.setTileAt(tiles.getTileLocation(18, 20), assets.tile`myTile`)
    tiles.setTileAt(tiles.getTileLocation(18, 21), assets.tile`myTile`)
    tiles.setTileAt(tiles.getTileLocation(18, 22), assets.tile`myTile`)
})
let Outside_Gaurd: Sprite = null
let Towergaurd2: Sprite = null
let TowerGaurd: Sprite = null
let BULLET2: Sprite = null
let BULLET: Sprite = null
let Right = false
let Left = false
let Back = false
let statusbar: StatusBarSprite = null
let Shovel: Sprite = null
let MapSprite: Sprite = null
let myMinimap: minimap.Minimap = null
let Key: Sprite = null
let GaurdKey: Sprite = null
let GaurdKeyActivate = false
let Up = false
let Escaping = false
let Spawn2 = false
let Yap3 = false
let Yap2 = false
let Yap = false
let Mapchat = false
let ChatNumber = 0
let MapMan: Sprite = null
let AnimationGaurd1: Sprite = null
let Gaurd1: Sprite = null
let YellowKey: Sprite = null
let Knife: Sprite = null
let Metal: Sprite = null
let Wire: Sprite = null
let Craft = 0
let Doors = false
let Chat = false
let Inmate: Sprite = null
let Player1: Sprite = null
game.splash("Prison Game", "Escape the prison!")
tiles.setCurrentTilemap(tilemap`level1`)
Player1 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . f . . . . . . . . . . 
    . . . f . f f . f . f f . . . . 
    . . f f f f f f f f f f f . . . 
    . . f f f f 4 4 4 4 f f f f . . 
    . . f f 4 4 4 4 4 4 4 4 f . . . 
    . . . f f b f e e f b f f . . . 
    . . . f f 1 f b b f 1 f f . . . 
    . . . f f b b b b b b f f . . . 
    . . . e e f e e e e f e e . . . 
    . . e 4 4 4 4 b b 4 4 4 4 e . . 
    . . e e f 4 4 4 4 4 4 f e e . . 
    . . . . c 4 4 4 4 4 4 c . . . . 
    . . . . . f f f f f f . . . . . 
    `, SpriteKind.Player)
Player1.setPosition(135, 130)
controller.moveSprite(Player1)
Inmate = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . f . . . . . . . . . . 
    . . . f . f f . f . f f . . . . 
    . . f f f f f f f f f f f . . . 
    . . f f f f 4 4 4 4 f f f f . . 
    . . f f 4 4 4 4 4 4 4 4 f . . . 
    . . . f f b f e e f b f f . . . 
    . . . f f 1 f b b f 1 f f . . . 
    . . . f f b b b b b b f f . . . 
    . . . e e f e e e e f e e . . . 
    . . e 4 4 4 4 b b 4 4 4 4 e . . 
    . . e e f 4 4 4 4 4 4 f e e . . 
    . . . . c 4 4 4 4 4 4 c . . . . 
    . . . . . f f f f f f . . . . . 
    `, SpriteKind.Inmate)
Inmate.setPosition(455, 230)
scene.cameraFollowSprite(Player1)
Chat = true
Doors = true
Craft = 0
Wire = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . 2 . . . . . . 
    . . . . . . . . 2 2 2 . . . . . 
    . . . . . . . . f 2 . . . . . . 
    . . . . . . . . f f . . . . . . 
    . . . . . . . . f f . . . . . . 
    . . . . . . . f f f . . . . . . 
    . . . . . . f f f . . . . . . . 
    . . . . . f f f . . . . . . . . 
    . . f f f f f . . . . . . . . . 
    . 2 f f f . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    . 2 . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.WireTool)
Wire.setPosition(310, 120)
Wire.startEffect(effects.starField)
Metal = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . c c c c c c . . . . . 
    . . . . c b d d d d c c . . . . 
    . . . . c d d d d d d c c . . . 
    . . . . c d d d d d d d c c . . 
    . . . c b b d d d d d d d c c . 
    . . . c b b d d d d d d d c c . 
    . . . c c b b b b d d d b c . . 
    . . . . c c c b b b b c c . . . 
    . . . . . . c b b b c c . . . . 
    . . . . . . . c c c . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.MetalTool)
Metal.setPosition(480, 470)
Metal.startEffect(effects.starField)
Knife = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . e . . . . . . 
    . . . . . . . . 2 e . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . . 2 2 . . . . . . . . 
    . . . . . 2 e . . . . . . . . . 
    . . . . f e . . . . . . . . . . 
    . . c f c f . . . . . . . . . . 
    . c f c f . . . . . . . . . . . 
    . . c f c . . . . . . . . . . . 
    . . . c . . . . . . . . . . . . 
    `, SpriteKind.KnifeTool)
Knife.setPosition(620, 400)
Knife.startEffect(effects.starField)
YellowKey = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . 5 5 5 5 5 5 . . . . . . 
    . . . 5 5 5 5 5 5 5 5 5 . . . . 
    . . 5 5 5 5 5 5 5 5 5 5 . . . . 
    . . 5 5 5 5 . . . 5 5 5 5 . . . 
    . . 5 5 5 . . . . 5 5 5 5 . . . 
    . . 5 5 5 5 5 5 5 5 5 5 . . . . 
    . . . 5 5 5 5 5 5 5 5 5 . . . . 
    . . . . 5 5 5 5 5 5 5 . . . . . 
    . . . . . 5 5 5 5 5 . . . . . . 
    . . . . . 5 5 5 5 . . . . . . . 
    . . . . . f 5 5 5 . . . . . . . 
    . . . . . f 5 5 5 . . . . . . . 
    . . . . . f 5 5 5 . . . . . . . 
    . . . . . f 5 5 5 . . . . . . . 
    . . . . . . 5 5 . . . . . . . . 
    `, SpriteKind.ExitKey)
YellowKey.setScale(0.5, ScaleAnchor.Middle)
YellowKey.setPosition(515, 950)
Gaurd1 = sprites.create(img`
    ........................
    ........................
    ...ffffffffff...........
    ..ffff5555ffff..........
    ..ff888558888f..........
    ..f888ffff888f..........
    ..ffffeeeeffff..........
    .ffefbf44fbfeff.........
    .ffefbf44fbfeff.........
    .fee4d2222d4eef.........
    fcfeedd22d4eeffe.fffc...
    fcffee4444ee8fddffffc...
    fcf8f888888f8eddff......
    fcf.f888888f88eeff......
    .ff.f888888f............
    ....ffffffff............
    .....ff..ff.............
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.GaurdPlayer)
AnimationGaurd1 = sprites.create(img`
    ........................
    ........................
    ...ffffffffff...........
    ..ffff5555ffff..........
    ..ff888558888f..........
    ..f888ffff888f..........
    ..ffffeeeeffff..........
    .ffefbf44fbfeff.........
    .ffefbf44fbfeff.........
    .fee4d2222d4eef.........
    fcfeedd22d4eeffe.fffc...
    fcffee4444ee8fddffffc...
    fcf8f888888f8eddff......
    fcf.f888888f88eeff......
    .ff.f888888f............
    ....ffffffff............
    .....ff..ff.............
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.GaurdPlayer)
MapMan = sprites.create(img`
    . . . . . . . c c . . . . . . . 
    . . . . . . c c c . . . . . . . 
    . . . . . . c c c c . . . . . . 
    . . . . . c c c c c c . . . . . 
    . . . c c c c c c c c c c . . . 
    . . . f f f f f f f f f f . . . 
    . . f f f f f f f f f f f f . . 
    . f f f f 4 4 4 4 4 4 f f f . . 
    . . f f 4 4 4 4 4 4 4 4 f . . . 
    . . f f e e b f e e e f . . . . 
    . . f f f b 1 f b b e f . . . . 
    . . . f f b b b b b b f . . . . 
    . . e b b e e e e e f . . . . . 
    . . e b b e 4 4 4 4 4 f . . . . 
    . . . e e e 4 4 4 4 4 c . . . . 
    . . . . . f f f f f f . . . . . 
    `, SpriteKind.MapMann)
MapMan.setPosition(310, 275)
Gaurd1.setPosition(0, 0)
AnimationGaurd1.setPosition(0, 0)
ChatNumber = 0
Mapchat = true
let Spawn = false
Yap = true
Yap2 = true
Yap3 = true
let Yap4 = true
Spawn2 = false
let ClickA = false
let Guns = false
Escaping = false
pause(1000)
game.showLongText("Go Find The Dealer In The Laundromat!", DialogLayout.Bottom)
game.onUpdateInterval(5000, function () {
    if (Doors == true) {
        tiles.setWallAt(tiles.getTileLocation(18, 22), true)
        tiles.setWallAt(tiles.getTileLocation(18, 21), true)
        tiles.setWallAt(tiles.getTileLocation(18, 20), true)
        tiles.setWallAt(tiles.getTileLocation(19, 40), true)
        tiles.setWallAt(tiles.getTileLocation(20, 40), true)
        tiles.setWallAt(tiles.getTileLocation(21, 40), true)
        tiles.setTileAt(tiles.getTileLocation(18, 20), assets.tile`myTile21`)
        tiles.setTileAt(tiles.getTileLocation(18, 21), assets.tile`myTile22`)
        tiles.setTileAt(tiles.getTileLocation(18, 22), assets.tile`myTile21`)
        tiles.setTileAt(tiles.getTileLocation(19, 40), assets.tile`myTile34`)
        tiles.setTileAt(tiles.getTileLocation(20, 40), assets.tile`myTile35`)
        tiles.setTileAt(tiles.getTileLocation(21, 40), assets.tile`myTile34`)
        tiles.setTileAt(tiles.getTileLocation(18, 23), assets.tile`myTile57`)
        tiles.setTileAt(tiles.getTileLocation(18, 41), assets.tile`myTile141`)
        tiles.setTileAt(tiles.getTileLocation(18, 39), assets.tile`myTile141`)
    }
})
game.onUpdateInterval(2000, function () {
    if (Doors == true) {
        tiles.setTileAt(tiles.getTileLocation(37, 34), assets.tile`myTile23`)
        tiles.setTileAt(tiles.getTileLocation(37, 33), assets.tile`myTile23`)
        tiles.setTileAt(tiles.getTileLocation(25, 50), assets.tile`myTile14`)
        tiles.setTileAt(tiles.getTileLocation(26, 50), assets.tile`myTile14`)
        tiles.setTileAt(tiles.getTileLocation(23, 10), assets.tile`myTile14`)
    }
})
game.onUpdateInterval(1000, function () {
	
})
forever(function () {
    if (Chat == true) {
        Inmate.sayText("?")
    }
})
forever(function () {
    if (Back == true) {
        Player1.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . . . . . . . . 
            . . . f . f f . f . f f . . . . 
            . . f f f f f f f f f f f . . . 
            . . f f f f 4 4 4 4 f f f f . . 
            . . f f 4 4 4 4 4 4 4 4 f . . . 
            . . . f f b f e e f b f f . . . 
            . . . f f 1 f b b f 1 f f . . . 
            . . . f f b b b b b b f f . . . 
            . . . e e f e e e e f e e . . . 
            . . e 4 4 4 4 b b 4 4 4 4 e . . 
            . . e e f 4 4 4 4 4 4 f e e . . 
            . . . . c 4 4 4 4 4 4 c . . . . 
            . . . . . . f f f f . . . . . . 
            `)
        pause(200)
        Player1.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f . f . f f . . . . 
            . . . . f f f f f f f f f . . . 
            . . . f f f 4 4 4 4 f f f f . . 
            . . f f 4 4 4 4 4 4 4 4 f . . . 
            . . . f f b f e e f b f f . . . 
            . . . f f 1 f b b f 1 f . . . . 
            . . . f f b b b b b b f f . . . 
            . . . e e f e e e e f e e . . . 
            . . e 4 4 4 4 b b 4 4 4 4 e . . 
            . . e e f 4 4 4 4 4 4 f e e . . 
            . . . . c 4 4 4 4 4 4 c . . . . 
            . . . . . f f . . f f . . . . . 
            `)
        pause(200)
    }
})
forever(function () {
    if (Up == true) {
        Player1.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . . . . . . . . 
            . . . f . f f . f . f f . . . . 
            . . f f f f f f f f f f f . . . 
            . . f f f f f f f f f f f f . . 
            . . f f f f f f f f f f f . . . 
            . . e f f f f f f f f f f e . . 
            . . e f f f f f f e e f f e . . 
            . . . f f e e e e e e f f . . . 
            . . . e e e e e e e e e e . . . 
            . . e 4 4 4 4 b b 4 4 4 4 e . . 
            . . e e f 4 4 4 4 4 4 f e e . . 
            . . . . c f f 4 4 f f c . . . . 
            . . . . . . f f f f . . . . . . 
            `)
        pause(200)
        Player1.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f . f f . . . f . . . . . 
            . . . f f f f f . f f f f . . . 
            . . f f f f f f f f f f f f . . 
            . . f f f f f f f f f f f . . . 
            . . e f f f f f f f f f f e . . 
            . . e f f f f f f e e f f e . . 
            . . . f f e e e e e e f f . . . 
            . . . e e e e e e e e e e . . . 
            . . e 4 4 4 4 b b 4 4 4 4 e . . 
            . . e e f 4 4 4 4 4 4 f e e . . 
            . . . . c 4 4 f f 4 4 c . . . . 
            . . . . . f f . . f f . . . . . 
            `)
        pause(200)
    }
})
forever(function () {
    if (Left == true) {
        Player1.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . f . . f f f . f f . . . 
            . . . f f f f f f f f f f f . . 
            . . f f f f f f f f f f f f . . 
            . . . f f f f f f f f f f f f . 
            . . . . f e e e f b e e f f . . 
            . . . . f e b b f 1 b f f f . . 
            . . . . f b b b b b b f f . . . 
            . . . . . f e e e e f e 4 . . . 
            . . . . . f f f f f 4 4 4 . . . 
            . . . . f 4 4 4 4 4 4 4 4 . . . 
            . . . . c 4 4 4 4 4 4 4 . . . . 
            . . . . . f f . . f f . . . . . 
            `)
        pause(200)
        Player1.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . f . . f f f . f . . . 
            . . . . f f f f f f f f f f . . 
            . . f f f f f f f f f f f f . . 
            . . . f f f f f f f f f f f f . 
            . . . . f e e e f b e e f f f . 
            . . . . f e b b f 1 b f f f . . 
            . . . . f b b b b b b f f . . . 
            . . . . . f e e e e f e 4 . . . 
            . . . . . f f f f f 4 4 4 . . . 
            . . . . f 4 4 4 4 4 4 4 4 . . . 
            . . . . c 4 4 4 4 4 4 4 . . . . 
            . . . . . . f f f f . . . . . . 
            `)
        pause(200)
    }
})
forever(function () {
    if (Right == true) {
        Player1.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f . f f f . . f . . . . 
            . . f f f f f f f f f f f . . . 
            . . f f f f f f f f f f f f . . 
            . f f f f f f f f f f f f . . . 
            . . f f e e b f e e e f . . . . 
            . . f f f b 1 f b b e f . . . . 
            . . . f f b b b b b b f . . . . 
            . . . 4 e f e e e e f . . . . . 
            . . . 4 4 4 f f f f f . . . . . 
            . . . 4 4 4 4 4 4 4 4 f . . . . 
            . . . . 4 4 4 4 4 4 4 c . . . . 
            . . . . . . f f f f . . . . . . 
            `)
        pause(200)
        Player1.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . f . f f . f . f . . . . 
            . . . f f f f f f f f f . . . . 
            . . f f f f f f f f f f f . . . 
            . . f f f f f f f f f f f . . . 
            . . f f e e b f e e e f . . . . 
            . . f f f b 1 f b b e f . . . . 
            . . f f f b b b b b b f . . . . 
            . . . 4 e f e e e e f . . . . . 
            . . . 4 4 4 f f f f f . . . . . 
            . . . 4 4 4 4 4 4 4 4 f . . . . 
            . . . . 4 4 4 4 4 4 4 c . . . . 
            . . . . . f f . . f f . . . . . 
            `)
        pause(200)
    }
})
forever(function () {
    if (Mapchat == true) {
        pause(1000)
        MapMan.sayText("Map", 1000, false)
        pause(1000)
        MapMan.sayText("?", 1000, false)
    }
})
forever(function () {
	
})
forever(function () {
    if (Guns == true) {
        pause(1000)
        BULLET = sprites.create(img`
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . 2 2 2 2 . . . . 
            . . . 2 2 2 2 2 2 . . . 
            . . 2 2 2 2 2 2 2 4 . . 
            . . 4 2 2 2 4 4 4 4 . . 
            . . 4 4 4 4 4 4 4 4 . . 
            . . 4 4 4 5 5 5 5 4 . . 
            . . . 4 5 5 5 5 5 . . . 
            . . . . 5 5 5 5 . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            `, SpriteKind.Bullet)
        BULLET2 = sprites.create(img`
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . 2 2 2 2 . . . . 
            . . . 2 2 2 2 2 2 . . . 
            . . 2 2 2 2 2 2 2 4 . . 
            . . 4 2 2 2 4 4 4 4 . . 
            . . 4 4 4 4 4 4 4 4 . . 
            . . 4 4 4 5 5 5 5 4 . . 
            . . . 4 5 5 5 5 5 . . . 
            . . . . 5 5 5 5 . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            `, SpriteKind.Bullet)
        BULLET.follow(Player1, 100)
        BULLET2.follow(Player1, 100)
        BULLET.setPosition(TowerGaurd.x, TowerGaurd.y)
        BULLET2.setPosition(Towergaurd2.x, Towergaurd2.y)
        pause(1000)
        sprites.destroy(BULLET, effects.fire, 500)
        sprites.destroy(BULLET2, effects.fire, 500)
    }
})
forever(function () {
    if (Escaping == true) {
        Escaping = false
        statusbar = statusbars.create(20, 4, StatusBarKind.Health)
        statusbar.attachToSprite(Player1)
        statusbar.setLabel("HP")
        statusbar.setBarBorder(1, 15)
        statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        for (let index = 0; index < 4; index++) {
            Outside_Gaurd = sprites.create(img`
                . . . . f f f f . . . . 
                . . f f f f f f f f . . 
                . f f f f f f f f f f . 
                f f f f f f f f f f f f 
                f f f f f f f f f f f f 
                f f f e e e e e e f f f 
                f e e e e e e e e e e f 
                f e e f f e e f f e e f 
                f e e e e e e e e e e f 
                . f e e e 4 4 e e e f . 
                . f f 8 e e e e 8 f f . 
                8 8 f 8 8 8 8 5 5 f 8 8 
                8 8 f 8 8 8 8 5 5 f 8 8 
                e e f 8 8 8 8 8 8 f e e 
                . . . f f f f f f . . . 
                . . . f f . . f f . . . 
                `, SpriteKind.Opps)
            Outside_Gaurd.setPosition(100, 550)
            Outside_Gaurd.follow(Player1, 95)
            Outside_Gaurd.setPosition(100, 500)
            pause(500)
            TowerGaurd = sprites.create(img`
                . . . . f f f f . . . . 
                . . f f f f f f f f . . 
                . f f f f f f f f f f . 
                f f f f f f f f f f f f 
                f f f f f f f f f f f f 
                f f f e e e e e e f f f 
                f e e e e e e e e e e f 
                f e e f f e e f f e e f 
                f e e e e e e e e e e f 
                . f e e e 4 4 e e e f . 
                . f f 8 e e e e 8 f f . 
                8 8 f 8 8 8 8 5 5 f 8 8 
                8 8 f 8 8 8 8 5 5 f 8 8 
                e e f 8 8 8 8 8 8 f e e 
                . . . f f f f f f . . . 
                . . . f f . . f f . . . 
                `, SpriteKind.TowerOpps)
            TowerGaurd.setPosition(55, 55)
            Towergaurd2 = sprites.create(img`
                . . . . f f f f . . . . 
                . . f f f f f f f f . . 
                . f f f f f f f f f f . 
                f f f f f f f f f f f f 
                f f f f f f f f f f f f 
                f f f e e e e e e f f f 
                f e e e e e e e e e e f 
                f e e f f e e f f e e f 
                f e e e e e e e e e e f 
                . f e e e 4 4 e e e f . 
                . f f 8 e e e e 8 f f . 
                8 8 f 8 8 8 8 5 5 f 8 8 
                8 8 f 8 8 8 8 5 5 f 8 8 
                e e f 8 8 8 8 8 8 f e e 
                . . . f f f f f f . . . 
                . . . f f . . f f . . . 
                `, SpriteKind.TowerOpps)
            Towergaurd2.setPosition(600, 55)
            Guns = true
        }
    }
})
