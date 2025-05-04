let valorSlide = document.getElementById("sliderValue");
let slider = document.getElementById("slider");
let mostrarPassword = document.getElementById("password");
let botonGenerar = document.getElementById("generate");
let spans = document.querySelectorAll(".check");
let check = document.querySelector(".box_checked");
let password;
let oneChecked;
let copied = document.querySelector(".password_img");
let contraseña = document.querySelector(".password_copied");


slider.addEventListener("input", () => {
    valorSlide.textContent = slider.value;
});

// Color del slider según la posición del puntero
function updateSliderBackground() {
    const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(to right, #A4FFAF ${val}%, #18171F ${val}%)`;
};

slider.addEventListener("input", updateSliderBackground);
updateSliderBackground(); // inicializa el color



// Funcion para crear la contraseña aleatoria
function generarContraseña() {
    let caracteres = "";
    password = "";
    let longitud = parseInt(slider.value);

    // Condiciones
    if (config.uppercaseLetters) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (config.lowercaseLetters) caracteres += "abcdefghijklmnopqrstuvwxyz";
    if (config.numbers) caracteres += "0123456789";
    if (config.symbols) caracteres += "!@#$%^&*()_+-=[]{}|;:,.<>?";


    // Creamos al contraseña
    for(let i = 0; i < longitud; i++) {
        let index = Math.floor(Math.random() * caracteres.length);
        password += caracteres[index];
    }

    if (oneChecked) {
        mostrarPassword.textContent = password;
        mostrarPassword.style.color = "#E6E5EA";
        comprobarContraseña(password);
    }
    

};

// Generamos la contraseña al hacer click en el boton Generate
botonGenerar.addEventListener("click", generarContraseña);


config = {
    uppercaseLetters: false,
    lowercaseLetters: false,
    numbers: false,
    symbols: false,
};

// Iteramos entre las casillas del checkbox
spans.forEach(span => {
    const type = span.dataset.type;

    let casillaMarcada = document.createElement("div");
    casillaMarcada.classList.add("box-checked");
    casillaMarcada.style.display = "none";
    span.appendChild(casillaMarcada);
    

    // Marcar/desmarcar check del checkbox
    span.addEventListener("click", () => {
        const isChecked = casillaMarcada.style.display === "block";
        casillaMarcada.style.display = isChecked ? "none" : "block";

        config[type] = !isChecked;

        // Verificamos si al menos una de las opciones está marcada
        oneChecked = Object.values(config).some(option => option === true);

        if (!oneChecked) {
            alert("Debes marcar al menos una de las opciones");
        }
    });
});




// Comprobar la seguridad de la contraseña
function comprobarContraseña(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;


    let boxes = document.querySelectorAll(".segura_content-box");
    let aviso = document.getElementById("texto_seguridad");

    for(let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = "#18171F"; 
        boxes[i].style.border = "2px solid #E6E5EA";

        if (score <= 1 && i === 0) {
            boxes[i].style.backgroundColor = '#F64A4A';
            boxes[i].style.border = 0;
            aviso.textContent = "TOO WEAK!"
        }else if (score === 2 && (i === 0 || i === 1) ) {
            boxes[i].style.backgroundColor = '#FB7C58';
            boxes[i].style.border = 0;
            aviso.textContent = "WEAK";
        } else if (score === 3 && i <= 2) {
            boxes[i].style.backgroundColor = '#F8CD65';
            boxes[i].style.border = 0;
            aviso.textContent = "MEDIUM";
        } else if ((score === 3 || score === 4) && i <= 3) {
            boxes[i].style.backgroundColor = '#F8CD65';
            boxes[i].style.border = 0;
            aviso.textContent = "MEDIUM";
        } else if (score === 5 && i <= 4) {
            boxes[i].style.backgroundColor = '#A4FFAF';
            boxes[i].style.border = 0;
            aviso.textContent = "STRONG";
        }
    }
}


mensajeCopied = document.createElement("p");
mensajeCopied.textContent = "COPIED";
mensajeCopied.classList.add("text-preset-3");


// Copiar la contraseña
copied.addEventListener("click", () => {
    contraseña.appendChild(mensajeCopied);
    let passwd = mostrarPassword.textContent;
    navigator.clipboard.writeText(passwd); 
})


