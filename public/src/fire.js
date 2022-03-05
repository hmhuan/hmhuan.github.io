const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const maxParticles = 10;

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.deltaX = 1;
    this.deltaY = 1;

    this.draw = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    this.update = () => {
        this.draw();
        if (this.x >= (canvas.width - this.radius) || this.x <= this.radius) {
            this.deltaX = -this.deltaX;
        }
        this.x += this.deltaX * 2;

        if (this.y >= canvas.height - this.radius || this.y <= this.radius) {
            this.deltaY = -this.deltaY;
        }
        this.y += this.deltaY * 2;
    }
}

const particles = [];

function getPoint(event) {
    const randomColor = "#"+ Math.floor(Math.random() * 16777215).toString(16);
    return new Particle(event.clientX, event.clientY, 10, randomColor);
}

canvas.onclick = (event) => {
    const newParticle = getPoint(event);
    if (newParticle !== undefined) {
        particles.push(newParticle);
        if (particles.length > maxParticles) {
            particles.shift();
        }
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    particles.forEach(particle => {
        particle.update();        
    });
    console.log(particles);
}


animate();
