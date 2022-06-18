input.onButtonPressed(Button.A, function () {
    OnButtonPressedHandler("A")
})
function OnRadioReceivedHandler (name: string, value: number) {
    parsedName = name.split(":")
    seqNum = parseFloat(parsedName[0])
    radioID = parsedName[1]
    sensorID = parseFloat(parsedName[2])
    if (radioID != RADIO_ID || sensorID != SENSOR_ID) {
        return
    }
    successNotification(2)
    if (parsedName.length == 3 && dataSeqNum != seqNum) {
        dataSeqNum = seqNum
        radioNameBuffer.shift()
        radioValueBuffer.shift()
        if (radioNameBuffer.length != 0) {
            releaseBuffer()
        }
    }
    if (parsedName.length == 4) {
        dataType = parsedName[3]
        radio.sendValue("" + (1 - seqNum) + ":" + RADIO_ID + ":" + SENSOR_ID, -1)
        successNotification(1)
        showLedOnCmd(value)
    }
}
function releaseBuffer () {
    radio.sendValue("" + dataSeqNum + ":" + radioNameBuffer[0], radioValueBuffer[0])
    lastRelease = control.millis()
    successNotification(0)
}
input.onButtonPressed(Button.B, function () {
    OnButtonPressedHandler("B")
})
function successNotification (_type: number) {
    if (_type == 0) {
        basic.showLeds(`
            # # # # #
            # . . . .
            # # # # #
            . . . . #
            # # # # #
            `)
    } else if (_type == 1) {
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            # # # # #
            # . . . #
            `)
    } else {
        basic.showLeds(`
            # # # # .
            # . . . #
            # # # # .
            # . . . #
            # . . . #
            `)
    }
    basic.pause(100)
    basic.clearScreen()
}
radio.onReceivedValue(function (name, value) {
    OnRadioReceivedHandler(name, value)
})
function OnButtonPressedHandler (cmd: string) {
    msg = "" + RADIO_ID + ":" + SENSOR_ID
    value = 0
    if (cmd == "A") {
        msg = "" + msg + ":" + "0"
        value = input.temperature()
    }
    if (cmd == "B") {
        msg = "" + msg + (":" + "1")
        value = input.lightLevel()
    }
    radioNameBuffer.push(msg)
    radioValueBuffer.push(value)
    if (radioNameBuffer.length == 1) {
        releaseBuffer()
    }
}
function showLedOnCmd (cmd: number) {
    if (cmd == 0) {
        basic.showLeds(`
            . # # # .
            . # . # .
            . # . # .
            . # . # .
            . # # # .
            `)
    }
    if (cmd == 1) {
        basic.showLeds(`
            . . # . .
            . # # . .
            . . # . .
            . . # . .
            . # # # .
            `)
    }
    if (cmd == 2) {
        basic.showLeds(`
            . # # # .
            . . . # .
            . # # # .
            . # . . .
            . # # # .
            `)
    }
    if (cmd == 3) {
        basic.showLeds(`
            . # # # .
            . . . # .
            . # # # .
            . . . # .
            . # # # .
            `)
    }
    if (cmd == 4) {
        basic.showLeds(`
            . # . # .
            . # . # .
            . # # # .
            . . . # .
            . . . # .
            `)
    }
    if (cmd == 5) {
        basic.showLeds(`
            . # # # .
            . # . . .
            . # # # .
            . . . # .
            . # # # .
            `)
    }
    if (cmd == 6) {
        basic.showLeds(`
            . # # # .
            . # . . .
            . # # # .
            . # . # .
            . # # # .
            `)
    }
    if (cmd == 7) {
        basic.showLeds(`
            . # # # .
            . . . # .
            . . . # .
            . . . # .
            . . . # .
            `)
    }
}
let value = 0
let msg = ""
let dataType = ""
let sensorID = 0
let radioID = ""
let seqNum = 0
let parsedName: string[] = []
let RADIO_ID = ""
let SENSOR_ID = 0
let lastRelease = 0
let dataSeqNum = 0
let radioValueBuffer: number[] = []
let radioNameBuffer: string[] = []
radioNameBuffer = []
radioValueBuffer = []
dataSeqNum = 0
lastRelease = 0
SENSOR_ID = 1
radio.setGroup(244)
RADIO_ID = "55"
let TIMEOUT = 5000
basic.forever(function () {
    if (radioNameBuffer.length != 0 && control.millis() - lastRelease >= TIMEOUT) {
        releaseBuffer()
    }
})
