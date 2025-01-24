const gradient = (color, size, x, y) => {
    return `
    
<div class="fx-gradient" parallaxAmt="${Math.random()}" style="width: ${size}px; height: ${size}px; left: calc(${x} * 100vw - ${size}px / 2); top: calc(${y} * 100vh - ${size}px / 2);">
    <svg viewBox="0 0 100 100">
        <filter id="blur-plus-grain" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur"/>
        </filter>
        
        <circle cx="50" cy="50" r="25" fill="#${color}" filter="url(#blur-plus-grain)" />
    </svg>
</div>

    `
}

module.exports = { gradient }