/** @type {HTMLCanvasElement} */      // Enable VSC to show suggestions for built in canvas methods

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");        // For 2D Drawing

// Cover the browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Attach the initial growth points to the current mouse x and y coordinates
class Root {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        // Display in cirle
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;

        // How much it can grow
        this.maxSize = Math.random() * 7 + 5;

        this.size = Math.random() * 1 + 2;
    }

    // Create a random vector(direction and speed of movement for each individual root particle)
    update() {
        // Move the root
        this.x += this.speedX;
        this.y += this.speedY;

        // Increase its size
        this.size += 0.1;

        // Make it grow
        if (this.size < this.maxSize) {
            ctx.beginPath();        // Start drawing
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);     // Draw a circle
            ctx.fillStyle = 'hsl(140, 100%, 50%)';      // Add green color
            ctx.fill();         // Apply color
            ctx.stroke();       // Give it border
        }
    }
}