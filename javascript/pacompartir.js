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
"Al Pastor (Bondiola de cerdo condimentada en salsa de especias + piña)",
"Cochinita pibil (Bondiola de cerdo desmechada macerada en jugo de naranja.)",
"Chicharron prensado (Cueritos de cerdo fritos en salsa de tomate.)",
"Frijol con chicharrón (Chicharron prensado en salsa de tomate con frijoles negros)",
"Birria (Carne de res estofada lentamente en una mezcla de especias)",
"Milanesa (Milanesa de pollo cortada en tiras)",
"Hongos (Mix de hongos frescos salteados con succhini y cebolla)",
"Rajas poblabas (pimientos con maíz en salsa cremosa de queso.)",
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

<select class="select-rellenos">
<option value="">Seleccionar relleno</option>
${rellenos.map(r => `<option value="${r}">${r}</option>`).join("")}
</select>

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

const selectTacos = card.querySelector(".select-rellenos")

if(selectTacos){

const seleccionadosDiv = card.querySelector(".rellenos-seleccionados")
let seleccionados = []

selectTacos.addEventListener("change",()=>{

const valor = selectTacos.value
if(valor === "") return

const nombreRelleno = valor.split("(")[0].trim()

if(seleccionados.includes(nombreRelleno)){
alert("Ese relleno ya fue elegido")
return
}

if(seleccionados.length >= 5){
alert("Solo puedes elegir 5 rellenos")
return
}

seleccionados.push(nombreRelleno)

seleccionadosDiv.innerHTML = `
<strong>Elegidos:</strong> ${seleccionados.join(", ")}
`

selectTacos.value = ""

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
<select class="relleno-antojito">
<option value="">Elegir relleno</option>
${rellenos.map(r => `<option value="${r}">${r}</option>`).join("")}
</select>
`

contenedorElegidos.appendChild(div)

selectAntojitos.value = ""

})

}


/* ======================
   BOTON AGREGAR
====================== */

card.querySelector("button").addEventListener("click",()=>{

carrito.push(producto)
actualizarCarrito()

})

contenedor.appendChild(card)

})


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