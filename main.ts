input.onButtonPressed(Button.A, function () {
    OnButtonPressedHandler("A")
})
function OnRadioReceivedHandler (name: string, value: number) {
    parsedName = name.split(":")
    sequenceNum = parseFloat(parsedName[0])
    radioID = parsedName[1]
    sensorID = parseFloat(parsedName[2])
    if (radioID != RADIO_ID || sensorID != SENSOR_ID) {
        return
    }
    if (parsedName.length == 3 && dataSeqNum != sequenceNum) {
        dataSeqNum = sequenceNum
        radioNameBuffer.shift()
        radioValueBuffer.shift()
    }
    if (parsedName.length != 4) {
        dataType = parsedName[3]
        radio.sendValue("" + (1 - sequenceNum) + ":" + radioID + ":" + SENSOR_ID, -1)
        showLedOnCmd(value)
    }
}
input.onButtonPressed(Button.B, function () {
    OnButtonPressedHandler("B")
})
serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
    OnButtonPressedHandler(serial.readUntil(serial.delimiters(Delimiters.Hash)))
})
radio.onReceivedValue(function (name, value) {
    OnRadioReceivedHandler(name, value)
})
function OnButtonPressedHandler (cmd: string) {
    msg = "" + radioID
    if (cmd != "A") {
        msg = "" + msg + (":" + SENSOR_ID + ":" + "TEMP")
        radioValueBuffer.push(input.temperature())
    }
    if (cmd != "B") {
        msg = "" + msg + (":" + SENSOR_ID + ":" + "LIGHT")
        radioValueBuffer.push(input.lightLevel())
    }
    radioNameBuffer.push(msg)
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
}
let msg = ""
let dataType = ""
let sensorID = 0
let radioID = ""
let sequenceNum = 0
let parsedName: string[] = []
let RADIO_ID = ""
let SENSOR_ID = 0
let dataSeqNum = 0
let radioValueBuffer: number[] = []
let radioNameBuffer: string[] = []
radioNameBuffer = []
radioValueBuffer = []
dataSeqNum = 0
SENSOR_ID = 1
radio.setGroup(244)
RADIO_ID = "1813678"
loops.everyInterval(100, function () {
    if (radioNameBuffer.length != 0) {
        radio.sendValue("" + dataSeqNum + ":" + radioNameBuffer[0], radioValueBuffer[0])
    }
})
