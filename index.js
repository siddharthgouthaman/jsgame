function fillCircle(context, x, y, radius, color = "green") {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
}

(() => {
    const canvas = document.getElementById("game");
    const context = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); 

    const radius = 69;
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let dx = 100;
    let dy = 100;
    let lastTimestamp = 0;

    function step(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const dt = (timestamp - lastTimestamp) * 0.001; // Convert ms to seconds
        lastTimestamp = timestamp;

        if (x + radius >= canvas.width || x - radius <= 0) dx = -dx;
        if (y + radius >= canvas.height || y - radius <= 0) dy = -dy;

        x += dx * dt;
        y += dy * dt;

        context.clearRect(0, 0, canvas.width, canvas.height);
        fillCircle(context, x, y, radius, "red");

        window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
    document.addEventListener('keydown',event=>{
     switch(event.code){
        case 'KeyS':{
            console.log("popp");
        }
        break;
     }
    });
})();