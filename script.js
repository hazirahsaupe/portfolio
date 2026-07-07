// ══ Read More ══
function showMore() {
    document.getElementById("short-text").style.display = "none";
    document.getElementById("full-text").style.display = "block";
    document.getElementById("readBtn").style.display = "none";
}

// ══ Skill Bars Animation ══
const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.skill-fill').forEach(bar => {
                bar.style.width = bar.dataset.w + '%';
            });
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(el => skillObs.observe(el));

// ══ Back to Top ══
window.addEventListener('scroll', () => {
    const btn = document.getElementById('backtop');
    if (btn) {
        if (window.scrollY > 400) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    }
});

// ══ Active Nav Link ══
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    navLinks.forEach(a => {
        a.style.color = 'white';
        if (a.getAttribute('href') === '#' + cur) {
            a.style.color = '#00ff99';
        }
    });
});

// Contact Form
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = document.querySelector('.contact-btn');
    const success = document.getElementById('formSuccess');
    const error = document.getElementById('formError');

    success.style.display = 'none';
    error.style.display = 'none';
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    try {
        const res = await fetch('https://formspree.io/f/xrewozkg', {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
            success.style.display = 'block';
            this.reset();
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                btn.disabled = false;
            }, 3000);
        } else {
            error.style.display = 'block';
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.disabled = false;
        }
    } catch {
        error.style.display = 'block';
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
    }
});