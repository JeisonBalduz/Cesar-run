
function ajustarTamanoLetras() {
    const anchoVentana = window.innerWidth;
    const nt1Elements = document.querySelectorAll('.nt1');
    const nt2Elements = document.querySelectorAll('.nt2');
    const nt3Elements = document.querySelectorAll('.nt3');
    const nt4Elements = document.querySelectorAll('.nt4');

    let tamanoNt1 = 70; // Tamaño base
    let tamanoNt2 = 40; // Tamaño base

    if (anchoVentana >= 1920) {
        tamanoNt1 = 125; // Tamaño para pantallas grandes
        tamanoNt2 = 90; // Tamaño para pantallas grandes
    } else if (anchoVentana < 768) {
        tamanoNt1 = 40; // Tamaño para pantallas pequeñas
        tamanoNt2 = 25; // Tamaño para pantallas pequeñas
    } else {
        // Puedes definir rangos intermedios y calcular tamaños basados en el ancho
        tamanoNt1 = 70 + (anchoVentana - 768) * 0.02; // Ejemplo de interpolación lineal
        tamanoNt2 = 40 + (anchoVentana - 768) * 0.01; // Ejemplo de interpolación lineal
    }

    nt1Elements.forEach(element => element.style.fontSize = `${tamanoNt1}px`);
    nt2Elements.forEach(element => element.style.fontSize = `${tamanoNt2}px`);
    nt3Elements.forEach(element => element.style.fontSize = `${tamanoNt1}px`);
    nt4Elements.forEach(element => element.style.fontSize = `${tamanoNt2}px`);
}

// Llama a la función al cargar la página y al redimensionar la ventana
window.onload = ajustarTamanoLetras;
window.addEventListener('resize', ajustarTamanoLetras);