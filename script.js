const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

let time = 0;

function animate() {
    ctx.clearRect(0, 0, width, height);
    time += 0.0010;
    
    const numLines = 4;
    
    for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        
        const baseY = height * 0.12; 
        
        for (let x = 0; x <= width; x += 15) {
            const wave1 = Math.sin(x * 0.0015 + time) * 150;
            const wave2 = Math.cos(x * 0.002 - time * 0.8) * 80;
            // O phase shift dependendo do 'i' cria o efeito de fita 3D
            const wave3 = Math.sin(x * 0.004 + time * 1.2 + i * 0.08) * 40;
            
            const y = baseY + wave1 + wave2 + wave3;
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        const alpha = 0.4 + (i / numLines) * 0.08;
        ctx.strokeStyle = `rgba(145, 155, 125, ${alpha})`;  
        ctx.lineWidth = 0.3;
        ctx.stroke();
    }
    
    requestAnimationFrame(animate);
}

animate();

// Animação de entrada ao rolar a página
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.portfolio-soon').forEach(el => {
    observer.observe(el);
});
