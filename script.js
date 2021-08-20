/** @type {HTMLCanvasElement} */      // Enable VSC to show suggestions for built in canvas methods

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");        // For 2D Drawing

// Cover the browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;