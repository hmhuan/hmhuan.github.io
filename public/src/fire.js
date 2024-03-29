const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// const maxParticles = 32;

function Particle(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.ttl = 200;

    this.draw = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    this.update = () => {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

function Star(numberOfParticles, x, y) {
    this.numberOfParticles = numberOfParticles;
    this.particles = [];
    this.ttl = 200;
    const color = randomColor();
    const radians = Math.PI * 2 / this.numberOfParticles;

    for (let i = 0; i < this.numberOfParticles; i++) {
        const velocity = {
            x: Math.cos(radians * i),
            y: Math.sin(radians * i),
        }
        this.particles.push(new Particle(x, y, 5, color, velocity));
    }

    this.update = () => {
        this.particles.forEach(particle => {
            particle.update();
        });
        this.ttl -= 1;
    }
}

const stars = [];

function randomColor() {
    return  "#"+ Math.floor(Math.random() * 16777215).toString(16);
}

function getPoint(event) {
    const numberOfParticles = Math.floor(Math.random() * 20) + 10;
    return new Star(numberOfParticles, event.clientX, event.clientY);
}

canvas.onclick = (event) => {
    const newStar= getPoint(event);
    if (newStar !== undefined) {
        stars.push(newStar);
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star, index) => {
        if (star.ttl == 0) {
            stars.splice(index, 1);
        }
        star.update();      
    });
    console.log(stars.length);
}

animate();
