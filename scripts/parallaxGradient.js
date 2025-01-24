let lastX = 0;
let lastY = 0;
let mouseX = 0;
let mouseY = 0;
const doParallaxGradients = () => {
    let newX = lastX;
    let newY = lastY;
    newX /= window.innerWidth
    newY /= window.innerHeight
    newX -= 0.5;
    newY -= 0.5;
    newX *= 400;
    newY *= 400;

    let allGradients = document.getElementsByClassName("fx-gradient")
    for (let i = 0; i < allGradients.length; i++) {
        allGradients[i].style.transform = `translateX(${newX * allGradients[i].getAttribute("parallaxamt")}px) translateY(${newY * allGradients[i].getAttribute("parallaxamt")}px)`
    }
    lastX += (mouseX - lastX) / 75
    lastY += (mouseY - lastY) / 75
}
document.addEventListener("DOMContentLoaded", () => {
    let allGradients = document.getElementsByClassName("fx-gradient")
    for (let i = 0; i < allGradients.length; i++) {
        (async (gradient) => {
            await new Promise(r => setTimeout(r, Math.random() * 5000));
            gradient.parentNode.style.animation = `fadeInOut 5s infinite`
        })(allGradients[i])
    }
})
document.addEventListener("mousemove", (event) => {
    mouseX = event.x
    mouseY = event.y
})
setInterval(doParallaxGradients, 10)