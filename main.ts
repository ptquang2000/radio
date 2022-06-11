input.onButtonPressed(Button.A, function () {
    radio.sendValue("TEMP1813678", input.temperature())
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue("LIGHT1813678", input.lightLevel())
})
radio.onReceivedValue(function (name, value) {
    if (name == "LED1813678") {
        if (value == 0) {
            basic.showLeds(`
                . # # # .
                . # . # .
                . # . # .
                . # . # .
                . # # # .
                `)
        }
        if (value == 1) {
            basic.showLeds(`
                . . # . .
                . # # . .
                . . # . .
                . . # . .
                . # # # .
                `)
        }
        if (value == 2) {
            basic.showLeds(`
                . # # # .
                . . . # .
                . # # # .
                . # . . .
                . # # # .
                `)
        }
        if (value == 3) {
            basic.showLeds(`
                . # # # .
                . . . # .
                . # # # .
                . . . # .
                . # # # .
                `)
        }
    }
})
basic.forever(function () {
	
})
