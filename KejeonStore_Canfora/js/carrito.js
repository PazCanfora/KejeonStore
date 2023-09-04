
var admin = localStorage.getItem("ADMIN");
let carrito = [];

if (localStorage.getItem("Carrito:")) {
  carrito = JSON.parse(localStorage.getItem("Carrito:"));
  let divcarrito = document.getElementById("carrito");
  let divfin = document.getElementById("fin");
  
  carrito.forEach((item) => {
  let producto = document.createElement("h3");
  producto.innerText = item.nombre;
  divcarrito.appendChild(producto);
  });

  var boton = document.createElement("button");
  boton.className = "btn aa btn-custom";
  boton.type = "submit";
  boton.textContent = "FINALIZAR COMPRA";

  var boton2 = document.createElement("button");
  boton2.className = "btn aa btn-custom";
  boton.id= "mi";
  boton2.type = "submit";
  boton2.textContent = "BORRAR CARRITO";

  divfin.appendChild(boton);
  divfin.appendChild(boton2);

  
  boton2.onclick= (e) => { 
    e.preventDefault();
    Swal.fire({
      title: '¿ESTÁ SEGURO QUE QUIERE BORRAR?',
      text: "No va a poder modificarlo después.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'BORRAR'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("Carrito:");
        location.reload();
      }
    })
  };


  boton.onclick= (e) => { 
    e.preventDefault();
    Swal.fire({
      title: '¿ESTÁ SEGURO QUE QUIERE COMPRAR?',
      text: "No va a poder cancelar la compra después.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'COMPRAR'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("Carrito:");
        location.reload();
      }
    })
  };

}else{

  console.log("no encontré nada en carrito.");
  let divcarrito = document.getElementById("carrito");
  let divfin = document.getElementById("fin");
  let titulo = document.createElement("h3");
    titulo.className = "Mensaje";
    titulo.innerText = "CARRITO VACÍO";

    let img = document.createElement("img");
    img.id= "fotocarrito"
    img.src = "../img/u.png";

    divcarrito.appendChild(titulo);
    divfin.appendChild(img);
}

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





