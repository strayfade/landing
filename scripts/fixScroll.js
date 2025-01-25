document.body.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
})

document.addEventListener('touchstart', (e) => {
    if (e.target.nodeName !== 'INPUT') {
        e.preventDefault();
    }
});

document.addEventListener('touchmove', (e) => {
    if (e.target.nodeName == 'INPUT') {
        e.preventDefault();
    }
});