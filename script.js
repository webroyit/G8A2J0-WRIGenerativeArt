/** @type {HTMLCanvasElement} */      // Enable VSC to show suggestions for built in canvas methods

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");        // For 2D Drawing

// Cover the browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;

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
        this.vs = Math.random() * 0.2 + 0.05;          // Velocity of Size
        
        // Velocity of angle on x-axis
        this.angleX = Math.random() * 6.2;
        this.vax = Math.random() * 0.6 - 0.3;

         // Velocity of angle on y-axis
        this.angleY = Math.random() * 6.2;
        this.vay = Math.random() * 0.6 - 0.3;

        this.lightness = 10;
    }

    // Create a random vector(direction and speed of movement for each individual root particle)
    update() {
        // Move the root
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);

        // Increase its size
        this.size += this.vs;       

        // Change direction of its angle
        this.angleX += this.vax;
        this.angleY += this.vay;

        // Change color
        if (this.lightness < 70) this.lightness += 0.6;

        // Make it grow
        if (this.size < this.maxSize) {
            ctx.beginPath();        // Start drawing
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);     // Draw a circle
            ctx.fillStyle = `hsl(140, 100%, ${this.lightness}%)`;      // Add green color
            ctx.fill();         // Apply color
            ctx.stroke();       // Give it border
            requestAnimationFrame(this.update.bind(this));      // Call update() again
        } else {
            // Add flower
            const flower = new Flower(this.x, this.y, this.size);
            flower.grow();
        }
    }
}

class Flower {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.maxFlowerSize = this.size + Math.random() * 50;
        this.image = new Image();
        this.image.src = 'flowers.png';
    }

    grow() {
        if (this.size < this.maxFlowerSize) {
            this.size += 0.3;
        }
        ctx.drawImage(this.image, this.x, this.y);
    }
}

// Animated paintbrush
window.addEventListener('mousemove', function(e){
    if (drawing) {
        for (let i = 0; i < 3; i++) {
            const root = new Root(e.x, e.y);        // Create new root object
            root.update();
        }
    }
})

// Start drawing when right click on the mouse
window.addEventListener('mousedown', function(){
    drawing = true;
})

// Stop drawing when letting go right click of the mouse
window.addEventListener('mouseup', function(){
    drawing = false;
})