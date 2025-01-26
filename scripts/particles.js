let points = []

const canvas2 = document.getElementById('canvas2');
let size = {
    width: window.innerWidth,
    height: window.innerHeight
}
let maxReach = 200;
const renderPoints = () => {

    if (size.width != window.innerWidth || size.height != window.innerHeight) {
        reloadPoints();
        return;
    }

    const canvasRenderPercentage = 100
    canvas2.width = size.width * canvasRenderPercentage / 100;
    canvas2.height = size.height * canvasRenderPercentage / 100;
    const ctx = canvas2.getContext("2d")
    ctx.clearRect(0, 0, size.width, size.height)

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, size.width, size.height)

    function drawPoint(x, y, radius = 50) {
        radius = maxReach / 5
        x /= 100 / canvasRenderPercentage
        y /= 100 / canvasRenderPercentage
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, radius * canvasRenderPercentage / 100, 0, Math.PI * 2);
        ctx.fill();
    }

    // Render the gradients
    points.forEach(({ x, y }) => {
        drawPoint(x, y);
    });
}

const updatePoints = () => {
    for (let i = 0; i < points.length; i++) {

        const updatePoint = (atIndex) => {
            const curr = points[atIndex]

            let gradientsToTakeIntoAccount = []

            // -1 = mouse
            for (let z = -1; z < points.length; z++) {
                if (z == atIndex) continue;

                let gradient
                if (z != -1) {
                    gradient = points[z]
                }
                else {
                    gradient = {
                        x: mouseX,
                        y: mouseY
                    }
                }

                let distance = Math.sqrt(Math.pow(gradient.x - curr.x, 2) + Math.pow(gradient.y - curr.y, 2))

                let oMaxReach = maxReach
                if (z == -1) {
                    oMaxReach *= 1
                }

                if (distance > oMaxReach) continue;

                let influence = 1 - (distance / oMaxReach);

                gradientsToTakeIntoAccount.push({
                    gradient: gradient,
                    influence: influence * ((z == -1) ? 10 : 1)
                })
            }

            if (gradientsToTakeIntoAccount.length <= 0) return;

            let avgX = 0;
            let avgY = 0;
            for (let z = 0; z < gradientsToTakeIntoAccount.length; z++) {
                let offsetX = curr.x - gradientsToTakeIntoAccount[z].gradient.x
                let offsetY = curr.y - gradientsToTakeIntoAccount[z].gradient.y
                offsetX *= Math.pow(gradientsToTakeIntoAccount[z].influence, 2)
                offsetY *= Math.pow(gradientsToTakeIntoAccount[z].influence, 2)
                avgX += offsetX
                avgY += offsetY
            }
            avgX /= gradientsToTakeIntoAccount.length
            avgY /= gradientsToTakeIntoAccount.length

            const keepInBoundsFactor = 0.1
            const keepinBoundsRange = 0

            if (curr.x < keepinBoundsRange)
                points[atIndex].velocityX += keepInBoundsFactor
            if (curr.x > size.width - keepinBoundsRange)
                points[atIndex].velocityX -= keepInBoundsFactor
            if (curr.y < keepinBoundsRange)
                points[atIndex].velocityY += keepInBoundsFactor
            if (curr.y > size.height - keepinBoundsRange)
                points[atIndex].velocityY -= keepInBoundsFactor

            points[atIndex].velocityX += avgX / 40
            points[atIndex].velocityY += avgY / 40
        }
        updatePoint(i)

        points[i].x += points[i].velocityX
        points[i].y += points[i].velocityY

        const dampeningFactor = 0.95

        points[i].velocityX *= dampeningFactor
        points[i].velocityY *= dampeningFactor
    }
}

const placePoints = (columns) => {
    points = []
    maxReach = size.width / columns * 2
    let columnsX = columns
    let columnsY = Math.floor(columns * size.height / size.width)

    for (let x = 0; x < columnsX; x++) {
        for (let y = 0; y < columnsY; y++) {
            points.push({
                x: (x / (columnsX - 1)) * size.width,
                y: (y / (columnsY - 1)) * size.height,
                velocityX: 0,
                velocityY: 0
            })
        }
    }
}

const reloadPoints = () => {
    placePoints(20)
    size = {
        width: window.innerWidth,
        height: window.innerHeight
    }
}
document.addEventListener("DOMContentLoaded", reloadPoints)
setInterval(updatePoints, 5)
setInterval(renderPoints, 5)