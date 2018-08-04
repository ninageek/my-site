class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")
const DEGREE = Math.PI / 180
const X_POS = 432
const Y_POS = 432
const R_LENGTH = 216
const FONT_SIZE = R_LENGTH / 5
const POINT_0 = new Point(432, 216)
const CIRCLE_CENTER = new Point(X_POS, Y_POS)
ctx.beginPath()
ctx.arc(X_POS, Y_POS, R_LENGTH, 0, 2 * Math.PI)
ctx.stroke()
drawDigits(X_POS, Y_POS, R_LENGTH)
const paragraph = document.getElementById("euler")
const e = paragraph.innerText;
let edges = new Map()
edges.set("27", 1)

for (let i = 2; i < e.length; i++) {
    let k = i + 1
    //drawLine(e.charAt(i), e.charAt(k))
    let a = e.charAt(i)
    let b = e.charAt(k)
    if (a > b) {
        let temp = a
        a = b
        b = temp
    }
    let key = a + b
    if (edges.has(key)) {
        edges.set(key, edges.get(key) + 1)
    } else {
        edges.set(key, 1)
    }

}


edges.forEach((value, key, map) => {
    drawLine(key.charAt(0), key.charAt(1), value * 1.2)
})

function drawDigits(x, y, r) {
    ctx.font = FONT_SIZE + "px Arial";
    for (let i = 0; i < 10; i++) {
        let digitR = r + FONT_SIZE
        let angleT = ((36 * DEGREE) * i) - 90 * DEGREE
        let digitX = digitR * Math.cos(angleT)
        let digitY = digitR * Math.sin(angleT)
        ctx.fillText(i, digitX + x, digitY + y);
    }

}

// function drawLine(start, end) {
//     ctx.moveTo(start.x, start.y);
//     ctx.lineTo(end.x, end.y);
//     ctx.stroke();
//
// }

function shiftPoint(point, r, angle, circleCenter) {
    let x = point.x - circleCenter.x
    let y = point.y - circleCenter.y
    let sinOfStartAngle = y / r
    let startAngle = Math.asin(sinOfStartAngle)
    let destAngle = startAngle + angle
    x = r * Math.cos(destAngle)
    y = r * Math.sin(destAngle)

    x = x + circleCenter.x
    y = y + circleCenter.y
    return new Point(x, y)
}

function drawLine(from, to, width) {
    const start = shiftPoint(POINT_0, R_LENGTH, 36 * DEGREE * from, CIRCLE_CENTER)
    const end = shiftPoint(POINT_0, R_LENGTH, 36 * DEGREE * to, CIRCLE_CENTER)
    ctx.lineWidth = width
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();


}

