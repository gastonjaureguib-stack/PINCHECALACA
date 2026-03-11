// ========================
// DATOS
// ========================
const productos = [
  {
    nombre: "Orden de tacos",
    precio: 320,
    descripcion: "Dos tortillas de maíz + relleno",
    imagen: "../img/antojitosimg/tacos.png"
  },
  {
    nombre: "Orden de dorados",
    precio: 340,
    descripcion: "Dos tortillas de maíz fritas + relleno",
    imagen: "../img/antojitosimg/dorados.png"
  },
  {
    nombre: "Orden de volcanes",
    precio: 360,
    descripcion: "Dos tortillas de maíz + costra de queso + relleno",
    imagen: "../img/antojitosimg/volcanes.png"
  },
  {
    nombre: "Quesaharina",
    precio: 390,
    descripcion: "Tortilla de trigo + queso + relleno",
    imagen: "../img/antojitosimg/quesaharina.png"
  },
  {
    nombre: "Burritos",
    precio: 390,
    descripcion: "Tortilla de trigo + relleno",
    imagen: "../img/antojitosimg/burrito.png"
  },
  {
    nombre: "Chimichangas",
    precio: 390,
    descripcion: "Tortilla de trigo frita + relleno",
    imagen: "../img/antojitosimg/chimichangas.png"
  }
];

const rellenos = [
    { nombre: "Al Pastor", descripcion: "Bondiola de cerdo condimentada en salsa de especias + piña" },
    { nombre: "Cochinita pibil", descripcion: "Bondiola de cerdo desmechada macerada en jugo de naranja" },
    { nombre: "Chicharron prensado", descripcion: "Cueritos de cerdo fritos en salsa de tomate" },
    { nombre: "Frijol con chicharrón", descripcion: "Chicharron prensado en salsa de tomate con frijoles negros" },
    { nombre: "Birria", descripcion: "Carne de res estofada lentamente en una mezcla de especias" },
    { nombre: "Milanesa", descripcion: "Milanesa de pollo cortada en tiras" },
    { nombre: "Hongos", descripcion: "Mix de hongos frescos salteados con zucchini y cebolla" },
    { nombre: "Rajas poblabas", descripcion: "Pimientos con maíz en salsa cremosa de queso" }
];

let carrito = [];

const productosContainer = document.getElementById('productos-container');
const carritoItems = document.getElementById('carrito-items');
const totalDiv = document.getElementById('total');

// ========================
// FUNCIONES
// ========================

function renderProductos() {
    productos.forEach((prod, index) => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
  <img 
    src="${prod.imagen}" 
    alt="${prod.nombre}" 
    class="producto-img"
  >

  <h3>${prod.nombre} — $${prod.precio}</h3>
  <p>${prod.descripcion}</p>

  <p> Elija su relleno:</p>

  <div class="custom-select" id="custom-select-${index}">
    <div class="select-selected">${rellenos[0].nombre}</div>
    <div class="select-items">
      ${rellenos.map(r => `
        <div data-nombre="${r.nombre}">
          <div class="nombre">${r.nombre}</div>
          <div class="descripcion">${r.descripcion}</div>
        </div>
      `).join('')}
    </div>
  </div>

  <button onclick="agregarCarrito(${index})">Agregar</button>
`;
        productosContainer.appendChild(div);
    });

    // Inicializa los dropdowns
    initCustomSelects();
}

function agregarCarrito(index) {
    // Tomamos el relleno desde el custom-select
    const selectedDiv = document.querySelector(`#custom-select-${index} .select-selected`);
    const rellenoSeleccionado = selectedDiv.textContent;

    const existente = carrito.find(item => item.nombre === productos[index].nombre && item.relleno === rellenoSeleccionado);
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ 
            nombre: productos[index].nombre, 
            precio: productos[index].precio, 
            relleno: rellenoSeleccionado, 
            cantidad: 1 
        });
    }
    renderCarrito();
}

function renderCarrito() {
    carritoItems.innerHTML = '';
    let total = 0;
    carrito.forEach((item, idx) => {
        total += item.precio * item.cantidad;
        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <span>${item.nombre} (${item.relleno}) x ${item.cantidad}</span>
            <span>
                <button class="cantidad-btn" onclick="cambiarCantidad(${idx}, -1)">-</button>
                <button class="cantidad-btn" onclick="cambiarCantidad(${idx}, 1)">+</button>
                $${item.precio * item.cantidad}
            </span>
        `;
        carritoItems.appendChild(div);
    });
    totalDiv.textContent = `Total: $${total}`;
}

function cambiarCantidad(idx, delta) {
    carrito[idx].cantidad += delta;
    if (carrito[idx].cantidad <= 0) {
        carrito.splice(idx, 1);
    }
    renderCarrito();
}

// ========================
// DROPDOWN CUSTOM
// ========================
function initCustomSelects() {
    const selects = document.querySelectorAll('.custom-select');
    selects.forEach(sel => {
        const selected = sel.querySelector('.select-selected');
        const items = sel.querySelector('.select-items');

        // Abrir/cerrar dropdown
        selected.addEventListener('click', () => {
            items.style.display = items.style.display === 'block' ? 'none' : 'block';
        });

        // Seleccionar opción
        items.querySelectorAll('div').forEach(option => {
            option.addEventListener('click', function() {
                const nombre = this.getAttribute('data-nombre');
                selected.textContent = nombre;
                items.style.display = 'none';
            });
        });
    });

    // Cerrar dropdown si se hace click afuera
    document.addEventListener('click', function(e) {
        selects.forEach(sel => {
            if (!sel.contains(e.target)) {
                sel.querySelector('.select-items').style.display = 'none';
            }
        });
    });
}

// ========================
// WHATSAPP
// ========================
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    if(carrito.length === 0){
        alert("Agrega al menos un producto al carrito");
        return;
    }
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const pago = document.getElementById('pago').value;
    
    let mensaje = `Hola! Pedido de ${nombre}%0A%0A`;
    carrito.forEach(item => {
        mensaje += `${item.nombre} (${item.relleno}) x ${item.cantidad} = $${item.precio * item.cantidad}%0A`;
    });
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    mensaje += `%0ATotal: $${total}%0A`;
    mensaje += `Dirección: ${direccion}%0AMétodo de pago: ${pago}`;

    const numero = "59898021777"; // reemplaza con tu número de WhatsApp
    window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
});

// ========================
// INICIO
// ========================
renderProductos();
renderCarrito();