let lastX = 0;
let lastY = 0;
let mouseX = 0;
let mouseY = 0;

let gradients = []

const hexToRgba = (hex, alpha = 1) => {
    hex = hex.replace('#', '');
    let r, g, b;
    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else {
        throw new Error('Invalid HEX color.');
    }

    return [ r, g, b ];
}

const getCssVariable = (varName, alpha = 1) => {
    const rootStyles = getComputedStyle(document.body);
    const hexColor = rootStyles.getPropertyValue(varName).trim();
    try {
        return hexToRgba(hexColor, alpha);
    } catch (error) {
        console.error(`Error converting CSS variable ${varName} to RGBA:`, error);
        return null;
    }
}

const canvas = document.getElementsByTagName('canvas')[0];
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}
const canvasRenderPercent = 8
const renderGradients = () => {
    canvas.width = size.width * canvasRenderPercent / 100;
    canvas.height = size.height * canvasRenderPercent / 100;
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, size.width, size.height)

    function drawRadialGradient(x, y, radius, color, colorTransparent) {
        x /= 100 / canvasRenderPercent
        y /= 100 / canvasRenderPercent
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * canvasRenderPercent / 100);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, colorTransparent);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    // Render the gradients
    gradients.forEach(({ currX, currY, radius, color, colorTransparent }) => {
        drawRadialGradient(currX, currY, radius, color, colorTransparent);
    });
}

const updateGradients = () => {

    const steps = 150
    for (let i = 0; i < gradients.length; i++) {
        gradients[i].currX = gradients[i].startingX + lastX * gradients[i].parallaxAmt * 400
        gradients[i].currY = gradients[i].startingY + lastY * gradients[i].parallaxAmt * 400
    }
    lastX += (mouseX - lastX) / steps
    lastY += (mouseY - lastY) / steps

}

const placeGradients = (columns) => {

    let columnsX = columns
    let columnsY = columns * size.height / size.width

    const accentColor = getCssVariable("--accent-color")
    for (let x = 0; x < columnsX; x++) {
        for (let y = 0; y < columnsY; y++) {
            const parallax = Math.pow(Math.random(), 3)
            const rngX = Math.random() * (size.width / columnsX)
            const rngY = Math.random() * (size.width / columnsY)
            gradients.push({
                startingX: (x / (columnsX - 1)) * size.width + rngX,
                startingY: (y / (columnsY - 1)) * size.height + rngY,
                currX: (x / (columnsX - 1)) * size.width,
                currY: (y / (columnsY - 1)) * size.height,
                color: `rgba(${accentColor[0]},${accentColor[1]},${accentColor[2]},${Math.min(parallax / 2, 0.75)})`,
                colorTransparent: `rgba(${accentColor[0]},${accentColor[1]},${accentColor[2]},0)`,
                radius: (1 - parallax) * 400 + 100,
                parallaxAmt: parallax
            })
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    placeGradients(10)
})

const enableMouseMovement = true
if (enableMouseMovement) {
    document.addEventListener("mousemove", (event) => {
        mouseX = event.x
        mouseY = event.y

        // Coordinate translation
        mouseX /= size.width
        mouseY /= size.height
        mouseX -= 0.5
        mouseY -= 0.5
        mouseX *= 2
        mouseY *= 2
    })
    setInterval(updateGradients, 5)
    setInterval(renderGradients, 5)
}