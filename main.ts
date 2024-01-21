enum SpriteKindLegacy {
    Player,
    Projectile,
    Food,
    Enemy,
    Spaceship,
    AlienShot,
    Fortress
}
function moveAliensDown () {
    for (let value of sprites.allOfKind(SpriteKindLegacy.Enemy)) {
        value.y += aliensShiftAmt
        if (value.y > scene.screenHeight() - value.height / 2) {
            game.over(false)
        }
    }
}
function spawnSpaceship () {
    spaceship = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . 7 . . . 7 . . . . . . 
        . . . 7 7 7 7 7 7 7 7 7 . . . . 
        . . . 7 . 7 . . . 7 . . . . . . 
        . . . 7 . 7 . . . 7 . . . . . . 
        . . . 7 . 7 . . . 7 . . . . . . 
        . . . 7 . 7 . . . 7 . . . . . . 
        . . . 7 7 7 7 7 7 7 7 7 . . . . 
        . . . . . 7 . . . 7 . 7 . . . . 
        . . . . . 7 . . . 7 . 7 . . . . 
        . . . . . 7 . . . 7 . 7 . . . . 
        . . . . . 7 . . . 7 . 7 . . . . 
        . . . 7 7 7 7 7 7 7 7 7 . . . . 
        . . . . . 7 . . . 7 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKindLegacy.Spaceship)
    if (Math.percentChance(50)) {
        spaceship.setPosition(scene.screenWidth(), 12)
        spaceship.vx = 0 - spaceshipSpeed
    } else {
        spaceship.setPosition(0, 12)
        spaceship.vx = spaceshipSpeed
    }
    spaceship.setFlag(SpriteFlag.AutoDestroy, true)
}
sprites.onOverlap(SpriteKindLegacy.Projectile, SpriteKindLegacy.Spaceship, function (sprite, otherSprite) {
    sprite.destroy()
    destroyedAlien = otherSprite
    destroyAlien()
})
sprites.onOverlap(SpriteKindLegacy.Projectile, SpriteKindLegacy.Fortress, function (sprite, otherSprite) {
    sprite.destroy()
    struckFortress = otherSprite
    degradeFortress()
})
sprites.onOverlap(SpriteKindLegacy.AlienShot, SpriteKindLegacy.Player, function (sprite, otherSprite) {
    sprite.destroy()
    destroyPlayer()
})
function degradeFortress () {
    fortressImage = struckFortress.image
    if (fortressImage.getPixel(6, 6) == 7) {
        struckFortress.setImage(img`
            c 6 6 . 6 6 c 6 6 . 6 6 c . . . 
            6 c 6 6 . 6 6 c 6 6 . 6 6 c . . 
            6 6 c 6 6 . 6 6 c 6 6 . 6 6 c . 
            . 6 6 c c c c c c c c c c c c c 
            6 . 6 c . 7 7 7 . c . 7 7 7 . c 
            6 6 . c 7 . 7 . 7 c 7 . 7 . 7 c 
            c 6 6 c 7 7 . 7 7 c 7 7 . 7 7 c 
            6 c 6 c 7 . 7 . 7 c 7 . 7 . 7 c 
            6 6 c c . 7 7 7 . c . 7 7 7 . c 
            6 6 6 c c c c c c c c c c c c c 
            . 6 6 c . 7 7 7 . c . 7 7 7 . c 
            6 . 6 c 7 . 7 . 7 c 7 . 7 . 7 c 
            6 6 . c 7 7 . 7 7 c 7 7 . 7 7 c 
            c 6 6 c 7 . 7 . 7 c 7 . 7 . 7 c 
            . c 6 c . 7 7 7 . c . 7 7 7 . c 
            . . c c c c c c c c c c c c c c 
            `)
    } else if (fortressImage.getPixel(8, 6) == 7) {
        struckFortress.setImage(img`
            c 6 6 . 6 . c 6 6 . 6 . c . . . 
            6 c 6 6 . 6 6 c 6 6 . 6 6 c . . 
            6 6 c . 6 . 6 6 c . 6 . 6 6 c . 
            . 6 . c c c c c c c c c c c c c 
            6 . 6 c . 7 . 7 . c . 7 . 7 . c 
            . 6 . c 7 . 7 . 7 c 7 . 7 . 7 c 
            c 6 6 c . 7 . 7 . c . 7 . 7 . c 
            6 c 6 c 7 . 7 . 7 c 7 . 7 . 7 c 
            6 6 c c . 7 . 7 . c . 7 . 7 . c 
            6 . 6 c c c c c c c c c c c c c 
            . 6 . c . 7 . 7 . c . 7 . 7 . c 
            6 . 6 c 7 . 7 . 7 c 7 . 7 . 7 c 
            . 6 . c . 7 . 7 . c . 7 . 7 . c 
            c 6 6 c 7 . 7 . 7 c 7 . 7 . 7 c 
            . c 6 c . 7 . 7 . c . 7 . 7 . c 
            . . c c c c c c c c c c c c c c 
            `)
    } else if (fortressImage.getPixel(6, 5) == 7) {
        struckFortress.setImage(img`
            c . 6 . 6 . c . 6 . 6 . c . . . 
            . c . 6 . 6 . c . 6 . 6 . c . . 
            6 . c . 6 . 6 . c . 6 . 6 . c . 
            . 6 . c c c c c c c c c c c c c 
            6 . 6 c . 7 . 7 . c . 7 . 7 . c 
            . 6 . c 7 . . . 7 c 7 . . . 7 c 
            c . 6 c . 7 . 7 . c . 7 . 7 . c 
            6 c . c 7 . . . 7 c 7 . . . 7 c 
            . 6 c c . 7 . 7 . c . 7 . 7 . c 
            6 . 6 c c c c c c c c c c c c c 
            . 6 . c . 7 . 7 . c . 7 . 7 . c 
            6 . 6 c 7 . . . 7 c 7 . . . 7 c 
            . 6 . c . 7 . 7 . c . 7 . 7 . c 
            c . 6 c 7 . . . 7 c 7 . . . 7 c 
            . c . c . 7 . 7 . c . 7 . 7 . c 
            . . c c c c c c c c c c c c c c 
            `)
    } else {
        struckFortress.destroy(effects.spray, 500)
    }
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    if (attractMode == 1) {
        startGame()
    }
})
function destroyAlien () {
    alienImage = destroyedAlien.image
    if (alienImage.getPixel(8, 0) == 2) {
        scoreDelta = spaceshipScoreIncrement * randint(1, spaceshipMaxIncrements)
    } else if (alienImage.getPixel(2, 4) == 15) {
    	
    } else if (alienImage.getPixel(1, 3) == 15) {
        scoreDelta = alienType1Score
    } else {
        scoreDelta = alienType2Score
    }
    changeScore()
    destroyedAlien.destroy(effects.spray, 500)
    numAliensCurr = sprites.allOfKind(SpriteKindLegacy.Enemy).length
    if (numAliensCurr <= numAliensNextSpeedup) {
        currAlienPause = currAlienPause / 2
        numAliensNextSpeedup = numAliensNextSpeedup / 2
        // Double heartbeat tempo.
        music.changeTempoBy(music.tempo())
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (attractMode == 0) {
        if (noUpdates == 0) {
            if (playerDestroyed == 0) {
                playerShoot()
            }
        }
    } else {
        startGame()
    }
})
function startGame () {
    attractMode = 0
    for (let value of sprites.allOfKind(SpriteKindLegacy.Enemy)) {
        value.destroy()
    }
    initScreen()
    initAliens()
    initSpaceship()
    initPlayer()
    noUpdates = 0
}
sprites.onOverlap(SpriteKindLegacy.Projectile, SpriteKindLegacy.AlienShot, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKindLegacy.Player, SpriteKindLegacy.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
function alienShoot () {
    sprite_list = sprites.allOfKind(SpriteKindLegacy.Enemy)
    for (let value of sprites.allOfKind(SpriteKindLegacy.Spaceship)) {
        sprite_list.push(value)
    }
    if (sprite_list.length > 0) {
        firingAlien = sprite_list[randint(0, sprite_list.length - 1)]
        alienShot = sprites.create(img`
            . . 1 . 1 . 1 . 
            . . . 1 1 1 . . 
            . . . . 1 . . . 
            . . . . 1 . . . 
            . . . . 1 . . . 
            . . . . 1 . . . 
            . . . . 1 . . . 
            . . . . 1 . . . 
            `, SpriteKindLegacy.AlienShot)
        alienShot.setPosition(firingAlien.x, firingAlien.y)
        alienShot.setVelocity(0, shotSpeed)
        alienShot.setFlag(SpriteFlag.AutoDestroy, true)
    }
}
function initPlayer () {
    info.setScore(0)
    info.setLife(1)
    maxShots = 1
    // Time in milliseconds after player is destroyed before it will respawn.
    playerSpawnDelay = 2500
    extraLifeScore = 1500
    nextLifeScore = extraLifeScore
    resetPlayer()
}
function startNewLevel () {
    currLevel += 1
    if (spaceshipChance < maxSpaceshipChance) {
        spaceshipChance += spaceshipChance
        if (spaceshipChance > maxSpaceshipChance) {
            spaceshipChance = maxSpaceshipChance
        }
    }
    if (alienShotChance < maxAlienShotChance) {
        alienShotChance += 1
    }
    currAlienPause = initAlienPause - alienPauseDelta * currLevel
    if (currAlienPause < minAlienPause) {
        currAlienPause = minAlienPause
    }
    initScreen()
    resetAliens()
    resetPlayer()
    noUpdates = 0
}
sprites.onOverlap(SpriteKindLegacy.Projectile, SpriteKindLegacy.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    destroyedAlien = otherSprite
    destroyAlien()
})
sprites.onOverlap(SpriteKindLegacy.Enemy, SpriteKindLegacy.Fortress, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray, 500)
})
function createSplashBase () {
    splashBase = image.create(scene.screenWidth(), scene.screenHeight())
    splashBase.fill(15)
    text_list = ["FIGHT", "FIAT!"]
    currFont = drawStrings.createFontInfo(FontName.Font8, 2)
    drawStrings.writeMultipleCenter(
    text_list,
    splashBase,
    2,
    5,
    currFont
    )
    headlinesY = text_list.length * drawStrings.height(currFont) + 4
    currFont = drawStrings.createFontInfo(FontName.Font8)
    drawStrings.writeCenter(
    "Press any button to start",
    splashBase,
    scene.screenHeight() - (drawStrings.height(currFont) + 2),
    1,
    currFont
    )
    text_list = ["= " + alienType1Score + " points", "= " + alienType2Score + " points"]
    drawStrings.writeMultiple(
    text_list,
    splashBase,
    scene.screenWidth() / 2,
    scene.screenHeight() / 2 + 0,
    1,
    currFont,
    8
    )
}
function showSplashScreen () {
    splashScreensBuilt = 0
    createSplashBase()
    buildSplashScreens()
    currSplashScreen = 0
    splashRotateInterval = 5000
    nextSplashRotate = game.runtime() + splashRotateInterval
    scene.setBackgroundImage(splashScreens[0])
    addGhostEnemies()
    splashScreensBuilt = 1
}
function addGhostEnemies () {
    attractSprite = sprites.create(img`
        . . . . . . . . 
        . . . . 1 . . . 
        . . 1 1 1 1 . . 
        . . 1 . . . . . 
        . . 1 . . . . . 
        . . 1 1 1 1 . . 
        . . . . 1 . . . 
        . . . . . . . . 
        `, SpriteKindLegacy.Enemy)
    currX = scene.screenWidth() / 2 - 10
    currY = scene.screenHeight() / 2 + 4
    attractSprite.setPosition(currX, currY)
    attractSprite.setFlag(SpriteFlag.Ghost, true)
    attractSprite.setPosition(currX, currY)
    attractSprite.setFlag(SpriteFlag.Ghost, true)
    attractSprite.setPosition(currX, currY)
    attractSprite.setFlag(SpriteFlag.Ghost, true)
    attractSprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . 7 . . . 7 . . . . . . 
        . . . 7 7 7 7 7 7 7 7 7 . . . . 
        . . . 7 . 7 . . . 7 . . . . . . 
        . . . 7 . 7 . . . 7 . . . . . . 
        . . . 7 . 7 . . . 7 . . . . . . 
        . . . 7 . 7 . . . 7 . . . . . . 
        . . . 7 7 7 7 7 7 7 7 7 . . . . 
        . . . . . 7 . . . 7 . 7 . . . . 
        . . . . . 7 . . . 7 . 7 . . . . 
        . . . . . 7 . . . 7 . 7 . . . . 
        . . . . . 7 . . . 7 . 7 . . . . 
        . . . 7 7 7 7 7 7 7 7 7 . . . . 
        . . . . . 7 . . . 7 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKindLegacy.Enemy)
    currY += 16
    attractSprite.setPosition(currX, currY)
    attractSprite.setFlag(SpriteFlag.Ghost, true)
}
function resetAliens () {
    heartbeatNote = 0
    music.setTempo(initHeartbeatTempo)
    tempAlienShotChance = alienShotChance
    // Do not allow aliens to shoot until all have been drawn.
    alienShotChance = 0
    aliensMoveLeft = 1
    for (let row = 0; row <= numRows - 1; row++) {
        for (let col = 0; col <= numCols - 1; col++) {
            alien = sprites.create(img`
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
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKindLegacy.Enemy)
            alien.setImage(img`
                . . . . . . . . 
                . . . . 1 . . . 
                . . 1 1 1 1 . . 
                . . 1 . . . . . 
                . . 1 . . . . . 
                . . 1 1 1 1 . . 
                . . . . 1 . . . 
                . . . . . . . . 
                `)
            alienX = col * (alien.width + spacing) + spacing + leftMargin
            alienY = row * (alien.height + spacing) + topMargin
            alien.setPosition(alienX, alienY)
        }
    }
    calcNextAlienMove()
    numAliensNextSpeedup = numAliensStart / 2
    // Allow aliens to shoot.
    alienShotChance = tempAlienShotChance
}
function moveAliens () {
    sprite_list = sprites.allOfKind(SpriteKindLegacy.Enemy)
    aliensMoveDown = 0
    // Should only need to look through the first row's worth of aliens to find left or right limit.
    for (let index = 0; index <= numCols; index++) {
        // Ensure we're within the bounds of the list.
        if (index < sprite_list.length) {
            if (aliensMoveLeft == 1 && sprite_list[index].x <= aliensShiftAmt) {
                aliensMoveDown = 1
            } else if (aliensMoveLeft == 0 && sprite_list[index].x >= scene.screenWidth() - aliensShiftAmt) {
                aliensMoveDown = 1
            }
        }
    }
    if (aliensMoveDown == 1) {
        // Change direction.
        aliensMoveLeft = 1 - aliensMoveLeft
        moveAliensDown()
    } else {
        if (aliensMoveLeft == 1) {
            alienDelta = 0 - aliensShiftAmt
        } else {
            alienDelta = aliensShiftAmt
        }
        moveAliensHoriz()
    }
    music.playTone(heartbeatNotes[heartbeatNote], music.beat(BeatFraction.Quarter))
    heartbeatNote += 1
    if (heartbeatNote >= heartbeatNotes.length) {
        heartbeatNote = 0
    }
}
function playerShoot () {
    if (sprites.allOfKind(SpriteKindLegacy.Projectile).length < maxShots) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . 1 . . . . 
            . . . 1 . . . . 
            . . . 1 . . . . 
            . . . 1 . . . . 
            . . . 1 . . . . 
            . . . 1 . . . . 
            . . 1 1 1 . . . 
            . 1 . 1 . 1 . . 
            `, player2, 0, 0 - shotSpeed)
        projectile.setPosition(player2.x, player2.y)
    }
}
function startAttractMode () {
    noUpdates = 1
    attractMode = 1
    showSplashScreen()
}
function initScreen () {
    createStarfield()
    fortressPositions = [
    1,
    2,
    4,
    5,
    7,
    8
    ]
    for (let value of fortressPositions) {
        for (let index = 0; index <= 1; index++) {
            fortress = sprites.create(img`
                c 6 6 6 6 6 c 6 6 6 6 6 c . . . 
                6 c 6 6 6 6 6 c 6 6 6 6 6 c . . 
                6 6 c 6 6 6 6 6 c 6 6 6 6 6 c . 
                6 6 6 c c c c c c c c c c c c c 
                6 6 6 c 7 7 7 7 7 c 7 7 7 7 7 c 
                6 6 6 c 7 7 7 7 7 c 7 7 7 7 7 c 
                c 6 6 c 7 7 7 7 7 c 7 7 7 7 7 c 
                6 c 6 c 7 7 7 7 7 c 7 7 7 7 7 c 
                6 6 c c 7 7 7 7 7 c 7 7 7 7 7 c 
                6 6 6 c c c c c c c c c c c c c 
                6 6 6 c 7 7 7 7 7 c 7 7 7 7 7 c 
                6 6 6 c 7 7 7 7 7 c 7 7 7 7 7 c 
                c 6 6 c 7 7 7 7 7 c 7 7 7 7 7 c 
                . c 6 c 7 7 7 7 7 c 7 7 7 7 7 c 
                . . c c 7 7 7 7 7 c 7 7 7 7 7 c 
                . . . c c c c c c c c c c c c c 
                `, SpriteKindLegacy.Fortress)
            fortress.setPosition(value * 16 + 8, 82 + index * 16)
        }
    }
}
function testForNewLevel () {
    numEnemies = sprites.allOfKind(SpriteKindLegacy.Enemy).length
    numEnemies += sprites.allOfKind(SpriteKindLegacy.Spaceship).length
    if (numEnemies == 0) {
        noUpdates = 1
        music.powerUp.play()
        game.splash("Level " + (currLevel + 1) + " cleared!")
        startNewLevel()
    }
}
function moveAliensHoriz () {
    for (let value of sprites.allOfKind(SpriteKindLegacy.Enemy)) {
        value.x += alienDelta
    }
}
function initSpaceship () {
    spaceshipScoreIncrement = 50
    spaceshipMaxIncrements = 6
    initSpaceshipChance = 1
    maxSpaceshipChance = 25
    spaceshipChance = initSpaceshipChance / 2
    spaceshipSpeed = 25
}
function changeScore () {
    info.changeScoreBy(scoreDelta)
    if (info.score() >= nextLifeScore) {
        nextLifeScore += extraLifeScore
        info.changeLifeBy(1)
        music.magicWand.play()
    }
}
function calcNextAlienMove () {
    nextAlienMove = game.runtime() + currAlienPause
}
function initAliens () {
    numRows = 4
    numCols = 9
    numAliensStart = numRows * numCols
    spacing = 4
    topMargin = 20
    leftMargin = (scene.screenWidth() - (8 * numCols + spacing * (numCols + 1))) / 2 + 4
    // Number of pixels to move aliens each time.
    aliensShiftAmt = 4
    // Initial amount of time in milliseconds to pause before alien movement.
    initAlienPause = 2000
    // Amount to decrease alien pause at the start of each level.
    alienPauseDelta = 200
    minAlienPause = 500
    shotSpeed = 100
    currAlienPause = initAlienPause
    initAlienShotChance = 1
    maxAlienShotChance = 10
    alienShotChance = initAlienShotChance
    currLevel = 0
    heartbeatNotes = [
    196,
    175,
    165,
    147
    ]
    initHeartbeatTempo = 60
    resetAliens()
}
function buildSplashScreens () {
    splashScreens = []
    headlines = [["Powered By Starcada"]]
    currFont = drawStrings.createFontInfo(FontName.Font5)
    for (let value of headlines) {
        splashScreen = splashBase.clone()
        drawStrings.writeMultipleCenter(
        value,
        splashScreen,
        headlinesY,
        14,
        currFont
        )
        splashScreens.push(splashScreen)
    }
}
function destroyPlayer () {
    player2.destroy(effects.spray, 500)
    playerRespawnTime = game.runtime() + playerSpawnDelay
    playerDestroyed = 1
    info.changeLifeBy(-1)
    if (info.life() > 0) {
        music.powerDown.play()
    } else {
        game.setGameOverMessage(false, "GAME OVER custom!")
        web.open(info.score().toString())
    }
}
function resetPlayer () {
    for (let value of sprites.allOfKind(SpriteKindLegacy.Player)) {
        value.destroy()
    }
    player2 = sprites.create(img`
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
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        `, SpriteKindLegacy.Player)
    player2.setPosition(scene.screenWidth() / 2, scene.screenHeight() - player2.height / 2)
    player2.setFlag(SpriteFlag.StayInScreen, true)
    controller.moveSprite(player2, 50, 0)
    playerDestroyed = 0
}
function rotateSplashScreen () {
    if (splashScreensBuilt == 1) {
        currSplashScreen += 1
        if (currSplashScreen >= splashScreens.length) {
            currSplashScreen = 0
        }
        nextSplashRotate = game.runtime() + splashRotateInterval
        scene.setBackgroundImage(splashScreens[currSplashScreen])
    }
}
function createStarfield () {
    numStars = 80
    background = image.create(scene.screenWidth(), scene.screenHeight())
    background.fill(15)
    for (let row = 0; row <= numStars - 1; row++) {
        background.setPixel(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()), randint(3, 14))
    }
    scene.setBackgroundImage(background)
}
sprites.onOverlap(SpriteKindLegacy.AlienShot, SpriteKindLegacy.Fortress, function (sprite, otherSprite) {
    sprite.destroy()
    struckFortress = otherSprite
    degradeFortress()
})
let background: Image = null
let numStars = 0
let playerRespawnTime = 0
let splashScreen: Image = null
let headlines: string[][] = []
let initAlienShotChance = 0
let nextAlienMove = 0
let initSpaceshipChance = 0
let numEnemies = 0
let fortress: Sprite = null
let fortressPositions: number[] = []
let player2: Sprite = null
let projectile: Sprite = null
let heartbeatNotes: number[] = []
let alienDelta = 0
let aliensMoveDown = 0
let numAliensStart = 0
let topMargin = 0
let alienY = 0
let leftMargin = 0
let spacing = 0
let alienX = 0
let alien: Sprite = null
let numCols = 0
let numRows = 0
let aliensMoveLeft = 0
let tempAlienShotChance = 0
let initHeartbeatTempo = 0
let heartbeatNote = 0
let currY = 0
let currX = 0
let attractSprite: Sprite = null
let splashScreens: Image[] = []
let nextSplashRotate = 0
let splashRotateInterval = 0
let currSplashScreen = 0
let splashScreensBuilt = 0
let headlinesY = 0
let currFont: FontInfo = null
let text_list: string[] = []
let splashBase: Image = null
let minAlienPause = 0
let alienPauseDelta = 0
let initAlienPause = 0
let maxAlienShotChance = 0
let alienShotChance = 0
let maxSpaceshipChance = 0
let spaceshipChance = 0
let currLevel = 0
let nextLifeScore = 0
let extraLifeScore = 0
let playerSpawnDelay = 0
let maxShots = 0
let shotSpeed = 0
let alienShot: Sprite = null
let firingAlien: Sprite = null
let sprite_list: Sprite[] = []
let playerDestroyed = 0
let noUpdates = 0
let currAlienPause = 0
let numAliensNextSpeedup = 0
let numAliensCurr = 0
let spaceshipMaxIncrements = 0
let spaceshipScoreIncrement = 0
let scoreDelta = 0
let alienImage: Image = null
let attractMode = 0
let fortressImage: Image = null
let struckFortress: Sprite = null
let destroyedAlien: Sprite = null
let spaceshipSpeed = 0
let spaceship: Sprite = null
let aliensShiftAmt = 0
let alienType2Score = 0
let alienType1Score = 0
alienType1Score = 10
alienType2Score = 30
startAttractMode()
game.onUpdate(function () {
    if (noUpdates == 0) {
        if (playerDestroyed == 1 && game.runtime() >= playerRespawnTime) {
            resetPlayer()
        }
        if (game.runtime() >= nextAlienMove) {
            calcNextAlienMove()
            moveAliens()
        }
        if (Math.percentChance(alienShotChance)) {
            alienShoot()
        }
        if (sprites.allOfKind(SpriteKindLegacy.Spaceship).length == 0 && Math.percentChance(spaceshipChance)) {
            spawnSpaceship()
        }
        testForNewLevel()
    } else if (attractMode == 1 && game.runtime() >= nextSplashRotate) {
        rotateSplashScreen()
    }
})
