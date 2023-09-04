
/* ----------------------------------------------------------------- CARGA DEFAULT. */
class Producto {
  constructor(nombre, precio, image) {
    this.nombre = nombre;
    this.precio = precio;
    this.image = image;
  }
}

/* ----------------------------------------------------------------- ARRAYS PRINCIPALES. */
let productos = [];
let carrito = [];
let admin = localStorage.getItem("ADMIN");

/* ----------------------------------------------------------------- CARGA DEFAULT. */
if (localStorage.getItem("Carrito:")) {
  carrito = JSON.parse(localStorage.getItem("Carrito:"));
}else{
  carrito = [];
};

let i = 5;
/* ----------------------------------------------------------------- AGREGAR PRODUCTO. */
async function agregarProducto() {
  i++;
  let a = await fetch(`https://fakestoreapi.com/products/${i}`);
  a  = await a.json();

  let image = a.image;
  let nombre = document.getElementById("ingr-nombre").value;
  let precio = parseFloat(document.getElementById("ingr-precio").value);

  if (nombre.trim() !== "" && !isNaN(precio)) {
    let producto = new Producto(nombre, precio, image);
    productos.push(producto);

    localStorage.setItem("Producto:", JSON.stringify(productos));

    let contenedorCards = document.getElementById("cartitas");
    let card = document.createElement("div");
    card.className = "card";
    card.style.width = "18rem";
    contenedorCards.appendChild(card);

    let img = document.createElement("img");
    img.src = a.image; 
    img.className = "card-img-top";
    card.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);

    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerText = producto.nombre;
    cardBody.appendChild(cardTitle);

    let cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerText = "$" + producto.precio;
    cardBody.appendChild(cardText);

    let cardLink = document.createElement("a");
    cardLink.href = "#"; 
    cardLink.className = "btn aa btn-custom";
    cardLink.setAttribute("data-id", productos.length - 1); 
    cardLink.innerText = "Añadir al Carrito";
    cardBody.appendChild(cardLink);

    /* --------------------------------------------------------------- AGREGAR AL CARRITO */
    cardLink.addEventListener("click", (e) => {
      e.preventDefault();
      let newItem = { nombre: producto.nombre, precio: producto.precio };
      carrito.push(newItem);
      localStorage.setItem("Carrito:", JSON.stringify(carrito));
      alert("Agregaste: " + producto.nombre + " al carrito.");
    });
  }
  document.getElementById("ingr-nombre").value = "";
  document.getElementById("ingr-precio").value = "";
};

async function SiNoHayProduct (){
  console.log("aaaa");
  let a = await fetch('https://fakestoreapi.com/products?limit=3');
    a  = await a.json();

    a.forEach(e => {
      let ee = new Producto(e.title, e.price, e.image);
      productos.push(ee);
    });

  return productos; 
};

async function cargarProductosDesdeAPI() {
  let a = await fetch('https://fakestoreapi.com/products?limit=3');
  a = await a.json();

  a.forEach(product => {
    let ee = new Producto(product.title, product.price, product.image);
    productos.push(ee);
  });
};

async function cargarProductos() {
  if (localStorage.getItem("Producto:")) {
    productos = JSON.parse(localStorage.getItem("Producto:"));
  } else {
    await cargarProductosDesdeAPI();
    localStorage.setItem("Producto:", JSON.stringify(productos));
  }
};


/* ----------------------------------------------------------------- CARGA DE LA PÁGINA. */
document.addEventListener("DOMContentLoaded", async function() {

  /* --------------------------------------------------------------- VERIF LOCALSTORAGE PRODUCTO */
  await cargarProductos();

  /* --------------------------------------------------------------- CREACIÓN CARTAS API PRODUCTO */
  productos.forEach((producto) => {
    console.log(producto);
    let contenedorCards = document.getElementById("cartitas");
    let card = document.createElement("div");
    card.className = "card";
    card.style.width = "18rem";
    contenedorCards.appendChild(card);

    let img = document.createElement("img");
    img.src = producto.image; 
    img.className = "card-img-top";
    card.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);

    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerText = producto.nombre;
    cardBody.appendChild(cardTitle);

    let cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerText = "$" + producto.precio;
    cardBody.appendChild(cardText);

    let cardLink = document.createElement("a");
    cardLink.href = "#"; 
    cardLink.className = "btn aa btn-custom";
    cardLink.setAttribute("data-id", productos.indexOf(producto)); 
    cardLink.innerText = "Añadir al Carrito";
    cardBody.appendChild(cardLink);

    /* --------------------------------------------------------------- AGREGAR AL CARRITO */
    cardLink.addEventListener("click", (e) => {
      e.preventDefault();
      let newItem = { nombre: producto.nombre, precio: producto.precio };
      carrito.push(newItem);
      localStorage.setItem("Carrito:", JSON.stringify(carrito));
      alert("Agregaste: " + producto.nombre + " al carrito.");
    });
  });

  


  /* --------------------------------------------------------------- VERIF ADMIN */
  let rompepelotasDiv = document.querySelector(".rompepelotas");
  if (admin === "true"){
  let div1 = document.createElement("div");
  div1.className = "mb-3 cheche";
  let div2 = document.createElement("div");
  div2.className = "mb-3 cheche";
  
  let labelProducto = document.createElement("label");
  labelProducto.setAttribute("for", "exampleFormControlInput1");
  labelProducto.className = "form-label";
  labelProducto.textContent = "PRODUCTO:";

  let inputProducto = document.createElement("input");
  inputProducto.type = "email";
  inputProducto.className = "form-control";
  inputProducto.id = "ingr-nombre";

  div1.appendChild(labelProducto);
  div1.appendChild(inputProducto);

  let labelPrecio = document.createElement("label");
  labelPrecio.setAttribute("for", "exampleFormControlTextarea1");
  labelPrecio.className = "form-label";
  labelPrecio.textContent = "PRECIO:";

  let inputPrecio = document.createElement("input");
  inputPrecio.type = "number";
  inputPrecio.className = "form-control";
  inputPrecio.id = "ingr-precio";
  inputPrecio.min = "0";
  inputPrecio.setAttribute("oninput", "validity.valid||(value='');");
  inputPrecio.step = "any";
  inputPrecio.required = true;

  div2.appendChild(labelPrecio);
  div2.appendChild(inputPrecio);

  let boton = document.createElement("button");
  boton.className = "btn aa btn-custom";
  boton.id = "BT_1";
  boton.type = "submit";
  boton.textContent = "AGREGAR";

  rompepelotasDiv.appendChild(div1);
  rompepelotasDiv.appendChild(div2);
  rompepelotasDiv.appendChild(boton);

  boton.onclick = (e) => { 
  e.preventDefault();
  agregarProducto();
  };

  let navbarDiv = document.querySelector(".navbar-nav");
  let cerrar = document.createElement("a");
  cerrar.className = "nav-link";
  cerrar.ariaCurrent = "page";
  cerrar.href = "./index.html";
  cerrar.textContent = "Cerrar Sesión";
  navbarDiv.appendChild(cerrar);

  cerrar.onclick= (e) => { 
    localStorage.setItem("ADMIN", false);
  };
 }else{
  rompepelotasDiv.style.display = "none"; 
  rompepelotasDiv.classList.add("deshabilitado");
 };
});









