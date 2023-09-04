

let email = document.getElementById("email");
let password = document.getElementById("password");
let boton = document.getElementById("boton");

function Verificacion() {
    let emailverif = email.value;
    let passwordverif = password.value;
    if(emailverif=="roberto.canfora@gmail.com" && passwordverif=="aaaa"){
        localStorage.setItem("ADMIN", true);
        window.location.href = "../index.html";
    }
    else{
        localStorage.setItem("ADMIN", false);
        window.location.href = "../index.html";
    }
};


boton.onclick = (e) => { 
    e.preventDefault();
    Verificacion();
};

var admin = localStorage.getItem("ADMIN");

if(admin === "true"){
    var navbarDiv = document.querySelector(".navbar-nav");
    var cerrar = document.createElement("a");
    cerrar.className = "nav-link";
    cerrar.ariaCurrent = "page";
    cerrar.href = "../index.html";
    cerrar.textContent = "Cerrar Sesión";
    navbarDiv.appendChild(cerrar);
  
    cerrar.onclick= (e) => { 
      localStorage.setItem("ADMIN", false);
    };
};