// Selecciona el elemento del navbar
const navbar = document.getElementById('navbar');
const navLinks = document.querySelector('.nav-links')

// Escucha el evento de scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white', 'shadow');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.add('bg-transparent');
        navbar.classList.remove('bg-white', 'shadow');
    }
});

function onToggleMenu(e) {
    e.name = e.name === 'menu' ? 'close' : 'menu'
    if (e.name === 'close') {
        navLinks.classList.remove('-top-[100vh]')
        navLinks.classList.add('top-0')
    } else {
        navLinks.classList.add('-top-[100vh]')
        navLinks.classList.remove('top-0')
    }
}

const text = "30 DÍAS";
const typewriterElement = document.getElementById("typewriter");
let index = 0;

function typeEffect() {
    if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 300); // Velocidad del efecto
    }
}

// Inicia el efecto cuando se carga la página
window.onload = typeEffect;

function selectMenuItem(selectedId) {
    const menuItems = document.querySelectorAll('li[id^="li"]');
    const slider = document.getElementById('menu-slider');
    const selectedItem = document.getElementById(selectedId);
    const menuList = document.querySelector('.subtitulo__1');

    // Obtener el índice del elemento seleccionado
    const index = Array.from(menuItems).indexOf(selectedItem);

    if (window.innerWidth < 768) {
        // Calcula la posición real del li
        const selectedRect = selectedItem.getBoundingClientRect();
        const menuRect = menuList.getBoundingClientRect();
        const newTop = selectedRect.top - menuRect.top;
        slider.style.transform = `translateY(${newTop}px)`;
        slider.style.height = `${selectedRect.height}px`;

        // --- CIERRE AUTOMÁTICO DEL MENÚ EN MÓVIL (DESCOMENTA SI LO QUIERES ACTIVAR) ---
        // navLinks.classList.add('-top-[100vh]');
        // navLinks.classList.remove('top-0');
    } else {
        const selectedRect = selectedItem.getBoundingClientRect();
        const menuRect = menuList.getBoundingClientRect();
        const newLeft = selectedRect.left - menuRect.left;
        slider.style.transform = `translateX(${newLeft}px)`;
        slider.style.width = `${selectedRect.width}px`;
    }

    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (item.id === selectedId) {
            link.classList.remove('font-normal');
            link.classList.add('font-bold', 'text-white', 'hover:text-white');
        } else {
            link.classList.remove('font-bold', 'text-white', 'hover:text-white');
            link.classList.add('font-normal');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    selectMenuItem('li1');
});

// --- ACTUALIZACIÓN AUTOMÁTICA DEL MENÚ SEGÚN LA SECCIÓN VISIBLE ---
const sectionToMenu = {
    hero: 'li1',
    beneficios: 'li2',
    resultados: 'li4',
    funcionamiento: 'li3',
    garantia: 'li5'
};

const sections = Object.keys(sectionToMenu).map(id => document.getElementById(id));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Para la sección de beneficios usamos un umbral más bajo
        const threshold = entry.target.id === 'beneficios' ? 0.3 : 0.8;
        
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            const menuId = sectionToMenu[entry.target.id];
            if (menuId) {
                selectMenuItem(menuId);
            }
        }
    });
}, {
    // Ajustamos los thresholds para cubrir tanto el caso de beneficios como los demás
    threshold: [0.3, 0.5, 0.7, 0.8, 0.9, 1.0],
    // Agregamos un margen para mejorar la detección
    rootMargin: '-5% 0px'
});

sections.forEach(section => {
    if (section) observer.observe(section);
});

