//FUNCION PARA GENERAR LA INTERFAZ DE PRODUCTOS CON JQUERY
function productosUI(productos, id){
  $(id).empty();
  for (const producto of productos) {
     $(id).append(`<div class="card" style="width: 18rem;">
     <img src="${producto.imagen}" class="card-img-top" alt="..." width="120px" height="230px">
     <div class="card-body">
       <h5 class="card-title">${producto.nombre}</h5>
       <p class="card-text">${producto.precio}</p>                      
       <a href="#" id='${producto.id}' class="btn btn-primary btn-compra">COMPRAR</a>
     </div>
   </div>`);
  }
  $('.btn-compra').on("click", comprarProducto);
}
//MANEJADOR DE COMPRA DE PRODUCTOS
function comprarProducto(e){
  //PREVENIR REFRESCO AL PRESIONAR ENLACES
  e.preventDefault();
  //OBTENER ID DEL BOTON PRESIONADO
  const idProducto   = e.target.id;
  //BUSCAR PRIMERO EL OBJETO EN EL CARRITO (SI FUE SELECCIONADO);
  const seleccionado = carrito.find(p => p.id == idProducto);
  //SI NO SE ENCONTRO BUSCAR EN ARRAY DE PRODUCTOS
  if(seleccionado == undefined){
    carrito.push(productos.find(p => p.id == idProducto));
  }else{
    //SI SE ENCONTRO AGREGAR UN CANTIDAD
    seleccionado.agregarCantidad(1);
  } 
  //---------Almacenamiento en localstorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  //GENERAR SALID PRODUCTO
  carritoUI(carrito);
}
//FUNCION PARA RENDERIZAR LA INTERFAZ DEL CARRITO
function carritoUI(productos){
  //CAMBIAR INTERIOR DEL INDICADOR DE CANTIDAD DE PRODUCTOS;
  $('#carritoCantidad').html(productos.length);
  //VACIAR EL INTERIOR DEL CUERPO DEL CARRITO;
  $('#carritoProductos').empty();
  for (const producto of productos) {
    $('#carritoProductos').append(registroCarrito(producto));
  }
  //----------Agrego eventos a los botones de agregar, restar y eliminar
  $('.btn-delete').on('click', eliminarCarrito);
  $('.btn-add').on('click', agregraCarrito);
  $('.btn-sub').on('click', restarCarrito);

}
//FUNCION PARA GENERAR LA ESTRUCTURA DEL REGISTO HTML
function registroCarrito(producto){
  return `<p> ${producto.nombre} 
  <span class="badge badge-warning">$ ${producto.precio}</span>
  <span class="badge badge-dark">${producto.cantidad}</span>
  <span class="badge badge-success"> $ ${producto.subtotal()}</span>
  <a id="${producto.id}" class="btn btn-info btn-add" >+</a> 
  <a id="${producto.id}" class="btn btn-warning btn-sub" >-</a>  
  <a id="${producto.id}" class="btn btn-danger btn-delete" >x</a>         
  </p>`
}
//Funcion Eliminar
function eliminarCarrito(event) {
  //Uso event.stopPropagation() para que no se cierre la interfaz de carrito cuando hago click
  event.stopPropagation();
  //Filtro todos los productos menos el precionado para "eliminarlo"
  //Para hacer esto carrito debe ser declarado con let
  carrito = carrito.filter(producto => producto.id != event.target.id);
  //Vuelvo a generar la interfaz de carrito actualizada
  carritoUI(carrito);
  //Almaceno en el storage el carrito actualizado
  localStorage.setItem('carrito', JSON.stringify(carrito));
  
}

function agregraCarrito(event) {
  //Uso event.stopPropagation() para que no se cierre la interfaz de carrito cuando hago click
  event.stopPropagation();
  //Uso find para encontrar el producto al que hice click
  let producto= carrito.find(p => p.id == event.target.id);
  //Uso el metodo agregar cantidad
  producto.agregarCantidad(1);
  //Uso (this).parent().children() para acceder a todos los hijos del carrito y poder editarlos
  $(this).parent().children()[1].innerHTML = producto.cantidad;
  $(this).parent().children()[2].innerHTML = producto.subtotal();
  //Almaceno en el storage el carrito actualizado
  localStorage.setItem('carrito', JSON.stringify(carrito));  
}

function restarCarrito(event) {
  //Uso event.stopPropagation() para que no se cierre la interfaz de carrito cuando hago click
  event.stopPropagation();
  //Uso find para encontrar el producto al que hice click
  let producto= carrito.find(p => p.id == event.target.id);
  //Verifico que el numero sea mayor a 1 para restar
  if(producto.cantidad > 1){
    //Uso el metodo agregar cantidad con -1 para restar
    producto.agregarCantidad(-1);
    //Uso (this).parent().children() para acceder a todos los hijos del carrito y poder editarlos
    $(this).parent().children()[1].innerHTML = producto.cantidad;
    $(this).parent().children()[2].innerHTML = producto.subtotal(); 
    //Almaceno en el storage el carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(carrito));

  }  
};




