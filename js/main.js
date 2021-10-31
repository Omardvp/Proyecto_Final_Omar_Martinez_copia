
  //FUNCION QUE SE EJECUTA CUANDO SE CARGA TODA LAS IMAGENES DE LA APLICACION
window.addEventListener('load',()=>{
    //ELIMINAR ELEMENTO DEL DOM
    $('#indicadorCarga').remove();
    //MOSTRAR ELEMENTO CON UN FADE
    $('#productosContenedor').fadeIn("slow",()=>{ console.log('ANIMACION FINALIZADA')});
    
})

$.get("data/productos.json",function (datos, estado) {
    console.log(datos);
    console.log(estado);
    //Usamos un if para preguntar si la llama fue exitosa
    if (estado == "success") {    
        //Transformamos los objetos de tipo "objeto" a tipo "producto"    
        for (const literal of datos) {
            productos.push(new Producto(literal.id, literal.nombre, literal.precio, 1, literal.imagen, literal.cantidad));
                        
        }
        //GENERAR INTERFAZ DE PRODUCTOS CON UNA FUNCION
        productosUI(productos, '#productosContenedor');
        
    }else{
        console.log('No cargaron los datos');
    }
    
});
//-----------Recuperacion de datos del carrito desde el localStorage
$(document).ready(function () {
    //1° Pregunto si existe la clave "carrito" en el local storage
    if("carrito" in localStorage){
        //2° si existe obtengo esos datos en un array y los paso a objetos con JSON.parse()
        const datos= JSON.parse(localStorage.getItem('carrito'));
        //3° Transformamos los objetos de tipo "objeto" a tipo "producto" 
        for (const literal of datos) {
            carrito.push(new Producto(literal.id, literal.nombre, literal.precio, literal.cantidad, literal.imagen));
        }
        //4° Volvemos a generar la interfaz carrito
        carritoUI(carrito);
    }    
});



  $(window).on('load',function () {    
    $("#espera").remove(); 
    // AGREGO FADEIN PARA QUE SE MUESTREN LOS PRODUCTOS OCULTOS 
    $('#productosContenedor').fadeIn(2000, 
        //Agrego una funcion callback
        function () {console.log("Funcionalidad Callback")
        
    });
  });
  
  
  
  //Manejo del metodo Toggle desde un boton
  $("#boton1").on("click", function () {
    $("#ejemplo2").slideToggle(1500);
  })
  //Ejemplo de encadenamiento de animaciones
  $("#ejemplo").animate({fontSize: "30px", opacity: 0.4 },3000).delay(2000).fadeOut(2000);
  //Funcion para crear la interfaz fel select de categorias
  selectUI(categorias,"#selectCategoria");
  //Asocio en evento change al select
  $("#selectCategoria").on("change", buscarCategoria)
  
  
  // Animaciones con jQuery 
  
  $("#fadeIn").click(()=>{
    $("#gr").fadeIn(2000,()=>{
        $("#gr").fadeOut(10000)
    })
  })
  
  