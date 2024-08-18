document.addEventListener('DOMContentLoaded', function() {
    const outputTextArea = document.getElementById('output-text');
    outputTextArea.style.display = 'none'; // Oculta el área de salida al cargar la página
});

function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto'; // Restablece la altura a auto para recalcular
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta la altura según el contenido
}

document.getElementById('input_text').addEventListener('input', function() {
    adjustTextareaHeight(this); // Expande el textarea de entrada al escribir
});

document.getElementById('encrypt-btn').addEventListener('click', function() {
    const inputText = document.getElementById('input_text').value; 
    if (!isValidText(inputText)) {
        alert('El texto debe contener solo letras minúsculas sin acentos.');
        return; // Salir de la función si el texto no es válido
    }
    const encryptedText = encryptText(inputText);
    const outputTextArea = document.getElementById('output-text');
    
    outputTextArea.value = encryptedText;
    outputTextArea.style.display = 'block'; // Muestra el área de salida
    adjustTextareaHeight(outputTextArea); // Ajusta la altura según el contenido
    document.querySelector('.dibujo').style.display = 'none'; // Oculta la imagen del muñeco
});

document.getElementById('decrypt-btn').addEventListener('click', function() {
    const inputText = document.getElementById('input_text').value; 
    if (!isValidText(inputText, true)) { // Permite texto encriptado para validación
        alert('El texto debe contener solo letras minúsculas sin acentos.');
        return; // Salir de la función si el texto no es válido
    }
    const decryptedText = decryptText(inputText);
    const outputTextArea = document.getElementById('output-text');
    
    outputTextArea.value = decryptedText;
    outputTextArea.style.display = 'block'; // Muestra el área de salida
    adjustTextareaHeight(outputTextArea); // Ajusta la altura según el contenido
    document.querySelector('.dibujo').style.display = 'none'; // Oculta la imagen del muñeco
});

document.getElementById('copy-btn').addEventListener('click', function() {
    const outputText = document.getElementById('output-text');
    outputText.select();
    document.execCommand('copy');
    
    // Oculta el área de salida y muestra la imagen del muñeco nuevamente
    outputText.style.display = 'none';
    document.querySelector('.dibujo').style.display = 'block';
});

function encryptText(text) {
    // Esta función toma un texto como entrada y lo encripta reemplazando vocales por secuencias específicas.
    return text
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
}

function decryptText(text) {
    // Esta función toma un texto encriptado y lo desencripta reemplazando secuencias específicas por vocales.
    return text
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
}

function isValidText(text, allowEncrypted = false) {
    // Validar solo letras minúsculas y sin acentos
    const validCharacters = /^[a-z\s]*$/;
    if (!allowEncrypted) {
        return validCharacters.test(text);
    } else {
        // Permitir texto encriptado que incluye palabras como 'enter', 'imes', etc.
        return validCharacters.test(text.replace(/enter|imes|ai|ober|ufat/g, ''));
    }
}
