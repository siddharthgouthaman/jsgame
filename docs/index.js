class V2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(that) {
        return new V2(this.x + that.x, this.y + that.y);
    }
    scale(scalar) {
        return new V2(this.x * scalar, this.y * scalar);
    }
}

function fillCircle(context, x, y, radius, color = "red") {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
}

(() => {
    const canvas = document.getElementById("game");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const radius = 50;
    const speed = 300;
    let lastTimestamp = 0;
    let pos = new V2(200, 200);
    let vel = new V2(0, 0);
    let keysPressed = new Set();

    let dirnmap = {
        "KeyS": new V2(0, speed),
        "KeyW": new V2(0, -speed),
        "KeyA": new V2(-speed, 0),
        "KeyD": new V2(speed, 0),
    };

    function step(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const dt = (timestamp - lastTimestamp) * 0.001;
        lastTimestamp = timestamp;

        vel = new V2(0, 0); // Reset velocity
        keysPressed.forEach((key) => {
            if (dirnmap[key]) vel = vel.add(dirnmap[key]);
        });

        pos = pos.add(vel.scale(dt));

        console.log(`Position: (${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}), Velocity: (${vel.x}, ${vel.y})`);

        context.clearRect(0, 0, canvas.width, canvas.height);
        fillCircle(context, pos.x, pos.y, radius, "red");

        window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);

    document.addEventListener("keydown", (event) => {
        keysPressed.add(event.code);
    });

    document.addEventListener("keyup", (event) => {
        keysPressed.delete(event.code);
    });
})();