const gradient = (color, size, x, y) => {
    return `
    
<div class="fx-gradient" parallaxAmt="${Math.random()}" style="width: ${size}px; height: ${size}px; left: calc(${x} * 100vw - ${size}px / 2); top: calc(${y} * 100vh - ${size}px / 2); background-color: #${color};">
</div>

    `
}

module.exports = { gradient }