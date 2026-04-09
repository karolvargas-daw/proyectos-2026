const productos = [
  { id: 1, nombre: "Camiseta", precio: 20, imagen: href="camisa.jpg"},
  { id: 2, nombre: "Pantalón", precio: 40, imagen: href="pantalon.jpg" },
  { id: 3, nombre: "Zapatillas", precio: 60, imagen: href="zapatillas.jpg" }
];

let carrito = [];

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>${p.precio}€</p>
        <button onclick="agregarAlCarrito(${p.id})">
          Añadir al carrito
        </button>
      </div>
    `;
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);

  guardarCarrito();
  actualizarCarrito();
}
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);

  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito");
  const total = document.getElementById("total");

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((p, index) => {
    lista.innerHTML += `
      <li>
        ${p.nombre} - ${p.precio}€
        <button onclick="eliminarDelCarrito(${index})">❌</button>
      </li>
    `;
    suma += p.precio;
  });

  total.textContent = suma;
}

function comprar() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  alert("¡Compra realizada!");
  carrito = [];
  actualizarCarrito();
}
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  const data = localStorage.getItem("carrito");
  if (data) {
    carrito = JSON.parse(data);
  }
}

mostrarProductos();