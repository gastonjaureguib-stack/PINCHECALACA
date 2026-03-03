const productos = [
    { nombre: "Orden de tacos", precio: 320 },
    { nombre: "Orden de dorados", precio: 340 },
    { nombre: "Orden de volcanes", precio: 360 },
    { nombre: "Quesaharina", precio: 390 },
    { nombre: "Burrito", precio: 390 },
    { nombre: "Chimichanga", precio: 390 }
];

const rellenos = [
    "Al Pastor",
    "Cochinita pibil",
    "Chicharron prensado",
    "Frijol con chicharrón",
    "Birria",
    "Milanesa",
    "Hongos",
    "Rajas poblabas"
];

let carrito = [];

const productosContainer = document.getElementById('productos-container');
const carritoItems = document.getElementById('carrito-items');
const totalDiv = document.getElementById('total');

function renderProductos() {
    productos.forEach((prod, index) => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <h3>${prod.nombre} — $${prod.precio}</h3>
            <label>Relleno:
                <select id="relleno-${index}">
                    ${rellenos.map(r => `<option value="${r}">${r}</option>`).join('')}
                </select>
            </label>
            <button onclick="agregarCarrito(${index})">Agregar</button>
        `;
        productosContainer.appendChild(div);
    });
}

function agregarCarrito(index) {
    const select = document.getElementById(`relleno-${index}`);
    const rellenoSeleccionado = select.value;
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

// WhatsApp
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

    const numero = "598XXXXXXXX"; // reemplaza con tu número de WhatsApp
    window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
});

renderProductos();
renderCarrito();