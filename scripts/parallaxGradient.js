let lastX = 0;
let lastY = 0;
let mouseX = -100;
let mouseY = -100;


const enableMouseMovement = true
if (enableMouseMovement) {
    document.addEventListener("mousemove", (event) => {
        mouseX = event.x
        mouseY = event.y
    })
}