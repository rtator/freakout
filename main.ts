namespace SpriteKind {
    export const Breakable = SpriteKind.create()
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    if (isBallInPlay <= 0) {
        offsetX = randint(ballSpeed * -1, ballSpeed)
        offsetY = randint(ballSpeed * -1, -1)
        magnitude = Math.sqrt(offsetX * offsetX + offsetY * offsetY)
        Ball.setVelocity(offsetX / magnitude * ballSpeed, offsetY / magnitude * ballSpeed)
        isBallInPlay = 1
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    offsetX = sprite.x - otherSprite.x
    offsetY = sprite.y - otherSprite.y
    magnitude = Math.sqrt(offsetX * offsetX + offsetY * offsetY)
    sprite.setVelocity(offsetX / magnitude * ballSpeed, offsetY / magnitude * ballSpeed)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Breakable, function (sprite, otherSprite) {
    offsetX = sprite.x - otherSprite.x
    offsetY = sprite.y - otherSprite.y
    magnitude = Math.sqrt(offsetX * offsetX + offsetY * offsetY)
    sprite.setVelocity(offsetX / magnitude * ballSpeed, offsetY / magnitude * ballSpeed)
    bricks.removeAt(bricks.indexOf(otherSprite)).destroy()
})
let magnitude = 0
let currentIndex = 0
let offsetY = 0
let offsetX = 0
let bricks: Sprite[] = []
let ballSpeed = 0
let Ball: Sprite = null
let isBallInPlay = 0
isBallInPlay = 0
let Breaker = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . 6 9 6 6 6 6 6 6 6 6 6 6 9 6 . 
    6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 
    6 9 8 8 8 8 8 8 8 8 8 8 8 8 9 6 
    . 6 9 6 6 6 6 6 6 6 6 6 6 9 6 . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
Breaker.setPosition(80, 100)
Breaker.setFlag(SpriteFlag.StayInScreen, true)
let playerSpeed = 40
Ball = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . d d . . . . . . . 
    . . . . . . d 1 d d . . . . . . 
    . . . . . . d d d d . . . . . . 
    . . . . . . . d d . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Projectile)
Ball.setPosition(80, 96)
Ball.setFlag(SpriteFlag.StayInScreen, true)
Ball.setFlag(SpriteFlag.BounceOnWall, true)
ballSpeed = 60
bricks = sprites.allOfKind(SpriteKind.Breakable)
let rows = 3
let columns = 12
offsetX = 25
offsetY = 20
let currentRow = 0
let currentColumn = 0
for (let index = 0; index < rows; index++) {
    for (let index = 0; index < columns; index++) {
        bricks.push(sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . a a c c c c c c b b . . . 
            . . . a a c c c c c c b b . . . 
            . . . 8 8 9 9 9 9 9 9 a a . . . 
            . . . 8 8 9 1 1 9 9 9 a a . . . 
            . . . 8 8 9 1 9 9 9 9 a a . . . 
            . . . 8 8 9 9 9 9 9 9 a a . . . 
            . . . 8 8 9 9 9 9 9 9 a a . . . 
            . . . 8 8 9 9 9 9 9 9 a a . . . 
            . . . a a c c c c c c b b . . . 
            . . . a a c c c c c c b b . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Breakable))
        currentIndex = bricks.length - 1
        bricks[currentIndex].setPosition(currentColumn * 10 + offsetX, currentRow * 10 + offsetY)
        currentColumn = currentColumn + 1
    }
    currentColumn = 0
    currentRow = currentRow + 1
}
game.onUpdate(function () {
    Breaker.setVelocity(controller.dx() * playerSpeed, 0)
    if (isBallInPlay > 0 && Ball.vy == 0) {
        offsetX = Ball.vx
        offsetY = -20
        magnitude = Math.sqrt(offsetX * offsetX + offsetY * offsetY)
        Ball.setVelocity(offsetX / magnitude * ballSpeed, offsetY / magnitude * ballSpeed)
    }
    if (bricks.length <= 0) {
        game.over(true)
    }
    if (Ball.y >= 111) {
        game.over(false)
    }
})
