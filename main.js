const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = "grind.png";

// Original rects in image coordinates
const Bd_rect = { x: 344, y: 505, w: 390, h: 187, url: "bd.html" };
const Mf_rect = { x: 32, y: 1016, w: 390, h: 187, url: "mf.html" };
const St_rect = { x: 655, y: 1016, w: 390, h: 187, url: "st.html" };

const rects = [Bd_rect, Mf_rect, St_rect];

// Store image's natural size (after load)
let imgWidth, imgHeight;

function drawScene() {
    if (!img.complete) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw image stretched to canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}


// Scale a rect from image coordinates → canvas coordinates
function scaleRect(rect) {
    const scaleX = canvas.width / imgWidth;
    const scaleY = canvas.height / imgHeight;

    return {
        x: rect.x * scaleX,
        y: rect.y * scaleY,
        w: rect.w * scaleX,
        h: rect.h * scaleY,
        url: rect.url
    };
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawScene();
}

img.onload = function() {
    imgWidth = img.width;
    imgHeight = img.height;
    resizeCanvas();
};

window.addEventListener('resize', resizeCanvas);

// Handle clicks
canvas.addEventListener('click', function(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let r of rects) {
        const scaled = scaleRect(r);
        if (
            mouseX >= scaled.x &&
            mouseX <= scaled.x + scaled.w &&
            mouseY >= scaled.y &&
            mouseY <= scaled.y + scaled.h
        ) {
            window.location.href = scaled.url; // redirect
        }
    }
});
