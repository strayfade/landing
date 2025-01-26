let lastX = 0;
let lastY = 0;
let mouseX = -100;
let mouseY = -100;

let gradients = []

const hexToRgba = (hex) => {
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

const getCssVariable = (varName) => {
    const rootStyles = getComputedStyle(document.body);
    const hexColor = rootStyles.getPropertyValue(varName).trim();
    try {
        return hexToRgba(hexColor);
    } catch (error) {
        console.error(`Error converting CSS variable ${varName} to RGBA:`, error);
        return null;
    }
}

const canvas = document.getElementById('canvas1');
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
    gradients.forEach(({ currX, currY, radius, color, colorTransparent, maxOpacity, animationCycle }) => {
        let opacity = Math.abs(animationCycle - 0.5) * 2
        let outColor = `rgba(${color[0]},${color[1]},${color[2]},${opacity * maxOpacity})`
        drawRadialGradient(currX, currY, radius, outColor, colorTransparent);
    });
}

const updateGradients = () => {
    const steps = 150
    for (let i = 0; i < gradients.length; i++) {
        gradients[i].currX = gradients[i].startingX + lastX * gradients[i].parallaxAmt * 400
        gradients[i].currY = gradients[i].startingY + lastY * gradients[i].parallaxAmt * 400
        gradients[i].animationCycle += 0.001
        if (gradients[i].animationCycle >= 1)
            gradients[i].animationCycle = 0;
    }
    let nmouseX = mouseX / size.width
    let nmouseY = mouseY / size.height
    nmouseX -= 0.5
    nmouseY -= 0.5
    nmouseX *= 2
    nmouseY *= 2
    lastX += (nmouseX - lastX) / steps
    lastY += (nmouseY - lastY) / steps

    renderGradients()

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
                color: accentColor,
                maxOpacity: Math.min(parallax / 2, 0.75),
                colorTransparent: `rgba(${accentColor[0]},${accentColor[1]},${accentColor[2]},0)`,
                radius: (1 - parallax) * 400 + 100,
                parallaxAmt: parallax,
                animationCycle: Math.random()
            })
        }
    }
    lastX = 0
    lastY = 0
}

document.addEventListener("DOMContentLoaded", () => {
    placeGradients(10)
})

const enableMouseMovement = true
if (enableMouseMovement) {
    document.addEventListener("mousemove", (event) => {
        mouseX = event.x
        mouseY = event.y
    })
    setInterval(updateGradients, 5)
}