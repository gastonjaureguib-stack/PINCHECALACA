const contenedor = document.getElementById("productos-compartir")

const productos = [

{
nombre:"Degustación de tacos",
descripcion:"Tablita con 10 taquitos",
precio:1390,
tipo:"tacos",
imagen:"../img/pacompartirimg/burrito.png"
},

{
nombre:"Tablita para dos",
descripcion:"5 antojitos a elección",
precio:1590,
tipo:"antojitos",
imagen:"../img/pacompartirimg/burrito.png"
},

{
nombre:"La Pinche Tabla XL",
descripcion:"10 antojitos predeterminados: 2 tacos, 2 quesaharinas, 2 burritos, 2 chimichangas, 2 volcanes",
precio:2590,
tipo:"xl",
imagen:"../img/pacompartirimg/burrito.png"
}

]

const rellenos = [

{nombre:"Al Pastor",descripcion:"Bondiola de cerdo condimentada en salsa de especias + piña"},
{nombre:"Cochinita pibil",descripcion:"Bondiola de cerdo desmechada macerada en jugo de naranja"},
{nombre:"Chicharron prensado",descripcion:"Cueritos de cerdo fritos en salsa de tomate"},
{nombre:"Frijol con chicharrón",descripcion:"Chicharron prensado en salsa de tomate con frijoles negros"},
{nombre:"Birria",descripcion:"Carne de res estofada lentamente en una mezcla de especias"},
{nombre:"Milanesa",descripcion:"Milanesa de pollo cortada en tiras"},
{nombre:"Hongos",descripcion:"Mix de hongos frescos salteados con zucchini y cebolla"},
{nombre:"Rajas poblanas",descripcion:"Pimientos con maíz en salsa cremosa de queso"}

]

const antojitos = [
"Taco",
"Burrito",
"Chimichanga",
"Quesaharina",
"Volcán"
]

let carrito = []

productos.forEach(producto => {

const card = document.createElement("div")
card.classList.add("producto")

let contenido = `

<img src="${producto.imagen}" class="producto-img">

<h3>${producto.nombre}</h3>
<p>${producto.descripcion}</p>

`

/* ======================
   DEGUSTACION TACOS
====================== */

if(producto.tipo === "tacos"){

contenido += `

<label>Elegir 5 rellenos</label>

<div class="rellenos-seleccionados"></div>

<div class="custom-select select-rellenos">
<div class="select-selected">Seleccionar relleno</div>

<div class="select-items">
${rellenos.map(r => `
<div data-nombre="${r.nombre}">
<div class="nombre">${r.nombre}</div>
<div class="descripcion">${r.descripcion}</div>
</div>
`).join("")}
</div>

</div>

`

}

/* ======================
   TABLITA PARA DOS
====================== */

if(producto.tipo === "antojitos"){

contenido += `

<label>Elegir 5 antojitos</label>

<div class="antojitos-elegidos"></div>

<select class="select-antojitos">
<option value="">Seleccionar antojito</option>
${antojitos.map(a => `<option value="${a}">${a}</option>`).join("")}
</select>

`

}

/* BOTON */

contenido += `
<button>Agregar $${producto.precio}</button>
`

card.innerHTML = contenido


/* ======================
   CONTROL TACOS
====================== */

const customSelect = card.querySelector(".select-rellenos")

if(customSelect){

const seleccionadosDiv = card.querySelector(".rellenos-seleccionados")
const options = customSelect.querySelectorAll("[data-nombre]")
const selected = customSelect.querySelector(".select-selected")

let seleccionados = []

options.forEach(op=>{

op.addEventListener("click",()=>{

const nombre = op.getAttribute("data-nombre")

if(seleccionados.includes(nombre)){
alert("Ese relleno ya fue elegido")
return
}

if(seleccionados.length >= 5){
alert("Solo puedes elegir 5 rellenos")
return
}

seleccionados.push(nombre)

seleccionadosDiv.innerHTML = `
<strong>Elegidos:</strong> ${seleccionados.join(", ")}
`

selected.textContent = "Seleccionar relleno"

})

})

}


/* ======================
   CONTROL ANTOJITOS
====================== */

const selectAntojitos = card.querySelector(".select-antojitos")

if(selectAntojitos){

const contenedorElegidos = card.querySelector(".antojitos-elegidos")

let elegidos = []

selectAntojitos.addEventListener("change",()=>{

const antojito = selectAntojitos.value
if(antojito === "") return

if(elegidos.length >= 5){
alert("Solo puedes elegir 5 antojitos")
return
}

elegidos.push(antojito)

const div = document.createElement("div")

div.innerHTML = `
<strong>${antojito}</strong>
<br>

<div class="custom-select relleno-antojito">
<div class="select-selected">Elegir relleno</div>

<div class="select-items">
${rellenos.map(r => `
<div data-nombre="${r.nombre}">
<div class="nombre">${r.nombre}</div>
<div class="descripcion">${r.descripcion}</div>
</div>
`).join("")}
</div>

</div>
`

contenedorElegidos.appendChild(div)

initCustomSelects()

selectAntojitos.value = ""

})

}


/* ======================
   BOTON AGREGAR
====================== */

card.querySelector("button").addEventListener("click",()=>{

let itemPedido = {
nombre: producto.nombre,
precio: producto.precio,
detalles:[]
}

if(producto.tipo === "tacos"){

const rellenosTexto = card.querySelector(".rellenos-seleccionados")

if(rellenosTexto){
itemPedido.detalles.push(rellenosTexto.innerText)
}

}

if(producto.tipo === "antojitos"){

const antojitosDiv = card.querySelectorAll(".antojitos-elegidos > div")

antojitosDiv.forEach(div=>{

const antojito = div.querySelector("strong").innerText
const relleno = div.querySelector(".select-selected").innerText

itemPedido.detalles.push(`${antojito} - ${relleno}`)

})

}

carrito.push(itemPedido)

actualizarCarrito()

})

contenedor.appendChild(card)

})

initCustomSelects()


/* ======================
   CARRITO
====================== */

function actualizarCarrito(){

const carritoHTML = document.getElementById("carrito-items")

carritoHTML.innerHTML=""

let total = 0

carrito.forEach((item,index)=>{

const div = document.createElement("div")

div.classList.add("carrito-item")

div.innerHTML = `
${item.nombre} - $${item.precio}
<br>
${item.detalles.join("<br>")}
<button class="borrar-item">❌</button>
`

div.querySelector(".borrar-item").addEventListener("click",()=>{

carrito.splice(index,1)

actualizarCarrito()

})

carritoHTML.appendChild(div)

total += item.precio

})

document.getElementById("total").innerText = `Total: $${total}`

}


/* ======================
   CUSTOM SELECT
====================== */

function initCustomSelects(){

const selects = document.querySelectorAll('.custom-select')

selects.forEach(sel=>{

const selected = sel.querySelector('.select-selected')
const items = sel.querySelector('.select-items')

selected.addEventListener('click',(e)=>{

e.stopPropagation()

document.querySelectorAll('.select-items').forEach(menu=>{
menu.style.display = 'none'
})

items.style.display =
items.style.display === 'block'
? 'none'
: 'block'

})

items.querySelectorAll('[data-nombre]').forEach(option=>{

option.addEventListener('click',function(){

const nombre = this.getAttribute('data-nombre')

selected.textContent = nombre

items.style.display = 'none'

})

})

})

document.addEventListener('click',function(){

document.querySelectorAll('.select-items').forEach(menu=>{
menu.style.display = 'none'
})

})

}


/* ======================
   WHATSAPP
====================== */

const formulario = document.getElementById("formulario")

formulario.addEventListener("submit", function(e){

e.preventDefault()

if(carrito.length === 0){
alert("Agrega productos al carrito")
return
}

const nombre = document.getElementById("nombre").value
const direccion = document.getElementById("direccion").value
const pago = document.getElementById("pago").value

let mensaje = `Hola! Pedido de ${nombre}%0A%0A`

let total = 0

carrito.forEach(item=>{

mensaje += `• ${item.nombre} - $${item.precio}%0A`

item.detalles.forEach(det=>{
mensaje += `   - ${det}%0A`
})

mensaje += "%0A"

total += item.precio

})

mensaje += `Total: $${total}%0A`
mensaje += `Dirección: ${direccion}%0A`
mensaje += `Método de pago: ${pago}`

const telefono = "59898021777"

const url = `https://wa.me/${telefono}?text=${mensaje}`

window.open(url,"_blank")

})

carrito = []
actualizarCarrito()
formulario.reset()