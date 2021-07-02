class Productos {
    constructor ( id, nombre, tipo, marca, precio, stock) {
        this.id = id
        this.nombre = nombre,
        this.tipo = tipo,
        this.marca = marca,
        this.precio = precio + (precio * 21/100), //IVA
        this.stock = stock;
    }

    

}

function ID() {
    let resultado = 0
    for( let i=1 ; i<=arrayProductos.length; i++)
    
    resultado = i
    return resultado
}

function ingresoVendedorProducto () { 

    let productoVendedor = new Productos (ID(),prompt("Ingresa el nombre del producto"), prompt("Ingresa el tipo de producto"), prompt("Ingresa la marca"), Number(prompt("Ingresa el precio del producto")), Number(prompt("Ingresa la cantidad de productos")));
    
    return productoVendedor
}


const arrayProductos = []


arrayProductos.push(ingresoVendedorProducto());
arrayProductos.push(new Productos (ID(),"Remera XL".toLowerCase(), "Remera".toLowerCase(), "nike".toLowerCase(), 765.99, 3))
arrayProductos.push(new Productos (ID(),"Zapatillas Deportivas".toLowerCase(), "zapatillas".toLowerCase(), "addidas".toLowerCase(), 2000, 2))
arrayProductos.push(new Productos (ID(),"Boxer deprtivo".toLowerCase(), "boxer".toLowerCase(), "stone".toLowerCase(), 900, 1))
arrayProductos.push(new Productos (ID(),"boxer confort".toLowerCase(), "boxer".toLowerCase(), "stone".toLowerCase(), 800, 3))
arrayProductos.push(new Productos (ID(),"Buzo deportivo".toLowerCase(), "buzo".toLowerCase(), "nike".toLowerCase(), 4000, 8))
arrayProductos.push(new Productos (ID(),"medias deportivas".toLowerCase(), "medias".toLowerCase(), "addidas".toLowerCase(), 600, 6))
arrayProductos.push(new Productos (ID(),"Remera L".toLowerCase(), "Remera".toLowerCase(), "nike".toLowerCase(), 2100, 14))
arrayProductos.push(new Productos (ID(),"Remera M".toLowerCase(), "Remera".toLowerCase(), "addidas".toLowerCase(), 543, 20))
arrayProductos.push(new Productos (ID(),"Remera S".toLowerCase(), "Remera".toLowerCase(), "puma".toLowerCase(), 3234, 17))
arrayProductos.push(new Productos (ID(),"zapatillas runner".toLowerCase(), "zapatillas".toLowerCase(), "puma".toLowerCase(), 6000, 6))
arrayProductos.push(new Productos (ID(),"gorra nike".toLowerCase(), "gorra".toLowerCase(), "nike".toLowerCase(), 1232, 15))
arrayProductos.push(ingresoVendedorProducto());




console.log(arrayProductos);

console.log(ID());

console.log(Productos.iva);