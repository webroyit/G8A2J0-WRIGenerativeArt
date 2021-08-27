/** @type {HTMLCanvasElement} */      // Enable VSC to show suggestions for built in canvas methods

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");        // For 2D Drawing

// Cover the browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
ctx.lineWidth = 0.4;
//ctx.globalCompositeOperation = 'lighten';         // Watercolors effect

// Attach the initial growth points to the current mouse x and y coordinates
class Root {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        // Display in cirle
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;

        // How much it can grow
        this.maxSize = Math.random() * 7 + 20;

        this.size = Math.random() * 1 + 2;
        this.vs = Math.random() * 0.2 + 0.5;          // Velocity of Size
        
        // Velocity of angle on x-axis
        this.angleX = Math.random() * 6.2;
        this.vax = Math.random() * 0.6 - 0.3;

         // Velocity of angle on y-axis
        this.angleY = Math.random() * 6.2;
        this.vay = Math.random() * 0.6 - 0.3;
        
        this.angle = 0;         // Initial rotation
        this.va = Math.random() * 0.02 - 0.05;      // Velocity of Angle
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
        this.angle += this.va;

        // Change color
        if (this.lightness < 70) this.lightness += 0.25;

        // Make it grow
        if (this.size < this.maxSize) {
            ctx.save();     // Save the current canvas setting
            ctx.translate(this.x, this.y);      // Move the rectangle based on coordinates
            ctx.rotate(this.angle);     // Rotate the flowers
            ctx.fillStyle = "#FFF5DE";      // Color
            ctx.fillRect(0, 0, this.size, this.size);
            ctx.strokeStyle = "#3c5186";
            ctx.strokeRect(0, 0, this.size, this.size);
            requestAnimationFrame(this.update.bind(this));      // Call update() again
            ctx.restore();      // Reset the canvas setting to what they were initially
        }
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
window.addEventListener('mousedown', function(e){
    drawing = true;
    for (let i = 0; i < 30; i++) {
        const root = new Root(e.x, e.y);        // Create new root object
        root.update();
    }
})

// Stop drawing when letting go right click of the mouse
window.addEventListener('mouseup', function(){
    drawing = false;
})