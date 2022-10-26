from neoconfig import *

with driver.session(database='proyecto') as session:

    
    def insert_marcas(tx, id, nombre, pais):
        return tx.run("CREATE (m:Marca {id:$id, nombre:$nombre , pais:$pais})", 
        nombre=nombre, id=id, pais=pais)

    def insert_clientes(tx, id, first_name, last_name):
        return tx.run("CREATE (c:Cliente {id:$id, first_name:$first_name , last_name:$last_name})", 
        first_name=first_name, id=id, last_name=last_name)

    def insert_productos(tx, id, nombre, marca, precio):
        return tx.run("CREATE (p:Producto {id:$id, nombre:$nombre , marca:$marca, precio:$precio})", 
        nombre=nombre, id=id, marca=marca, precio=precio)

    def insert_compras(tx, idCliente, idProducto, cantidad):
        return tx.run("CREATE (cr:Compras {idCliente:$idCliente, idProducto:$idProducto, cantidad:$cantidad})", 
        idCliente=idCliente, idProducto=idProducto, cantidad=cantidad)


    
    #session.execute_write(insert_marcas, id=1,nombre="Eazzy",pais="South Africa")
    #session.execute_write(insert_clientes, id=1,first_name="Abigail",last_name="O'Flynn")
    #session.execute_write(insert_productos, id=2,nombre="Potatoes - Mini Red",marca="Eazzy", precio=252)
    session.execute_write(insert_compras, idCliente=1,idProducto=54,cantidad=5)

    