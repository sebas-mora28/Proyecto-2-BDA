from py2neo import Graph
from flask import Flask, request, abort

graph = Graph('bolt://localhost:7687', auth=('neo4j', 'password'))
app = Flask(__name__)


@app.route('/')
def home():
    return "<p>API service is running</p>"


@app.route('/allData', methods=['GET'])
def all_data():
    return graph.run("MATCH(n) RETURN n").data()

#           _____________________________
# _________/ CLIENT QUERIES

# ___________CREATE_________________


@app.route('/client', methods=['POST'])
def create_client():

    id = request.json['id']
    first_name = request.json['first_name']
    last_name = request.json['last_name']

    #TODO: Verification

    command = 'CREATE (c:Client{{id:{id}, first_name:"{first_name}",last_name:"{last_name}"}})'.format(
        id=id, first_name=first_name, last_name=last_name)

    return graph.run(command).summary()

# ___________READ___________________


@app.route('/clients', methods=['GET'])
def get_clients():

    return graph.run("MATCH(c:Client) RETURN (c)").data()


@app.route('/client', methods=['GET'])
def get_client():

    id = request.json['id']

    command = 'MATCH(c:Client{{id:{id}}}) RETURN (c)'.format(id=id)

    res = graph.run(command).data()

    if(res == []):
        abort(404)
    else:
        return res

# ___________UPDATE_________________


@app.route('/client', methods=['PUT'])
def update_client():

    id = request.json['id']
    first_name = request.json['first_name']
    last_name = request.json['last_name']

    #TODO: Verification

    command = 'MATCH(c:Client{{id:{id}}}) SET c.first_name = "{first_name}", c.last_name = "{last_name}" RETURN (c)'.format(
        id=id, first_name=first_name, last_name=last_name)

    return graph.run(command).summary()

# ___________DELETE_________________


@app.route('/client', methods=['DELETE'])
def delete_client():

    id = request.json['id']

    command = 'MATCH(c:Client{{id:{id}}}) DETACH DELETE c'.format(id=id)

    return graph.run(command).summary()

#           _____________________________
# _________/ CATALOG/PRODUCT QUERIES

# ___________CREATE_________________


@app.route('/product', methods=['POST'])
def create_product():

    id = request.json['id']
    Nombre = request.json['Nombre']
    Marca = request.json['Marca']
    Precio = request.json['Precio']

    #TODO: Verification

    command = 'CREATE (p:Product{{id:{id}, Nombre:"{Nombre}",Marca:"{Marca}",Precio:{Precio}}})'.format(
        id=id, Nombre=Nombre, Marca=Marca, Precio=Precio)

    return graph.run(command).summary()

# ___________READ___________________


@app.route('/products', methods=['GET'])
def get_products():

    return graph.run("MATCH(p:Product) RETURN (p)").data()


@app.route('/product', methods=['GET'])
def get_product():

    id = request.json['id']

    command = 'MATCH(p:Product{{id:{id}}}) RETURN (p)'.format(id=id)

    res = graph.run(command).data()

    if(res == []):
        abort(404)
    else:
        return res

# ___________UPDATE_________________


@app.route('/product', methods=['PUT'])
def update_product():

    id = request.json['id']
    Nombre = request.json['Nombre']
    Marca = request.json['Marca']
    Precio = request.json['Precio']

    #TODO: Verification

    command = 'MATCH (p:Product{{id:{id}}}) SET p.Nombre = "{Nombre}", p.Marca = "{Marca}", p.Precio = {Precio} RETURN (p)'.format(
        id=id, Nombre=Nombre, Marca=Marca, Precio=Precio)

    return graph.run(command).summary()


# ___________DELETE_________________


@app.route('/product', methods=['DELETE'])
def delete_product():

    id = request.json['id']

    command = 'MATCH(p:Product{{id:{id}}}) DETACH DELETE p'.format(id=id)

    return graph.run(command).summary()


#           _____________________________
# _________/ BRAND QUERIES

# ___________CREATE_________________


@app.route('/brand', methods=['POST'])
def create_brand():

    id = request.json['id']
    Nombre = request.json['Nombre']
    Pais = request.json['Pais']

    #TODO: Verification

    command = 'CREATE (b:Brand{{id:{id}, Nombre:"{Nombre}",Pais:"{Pais}"}})'.format(
        id=id, Nombre=Nombre, Pais = Pais)

    return graph.run(command).summary()

# ___________READ___________________


@app.route('/brands', methods=['GET'])
def get_brands():

    return graph.run("MATCH(b:Brand) RETURN (b)").data()


@app.route('/brand', methods=['GET'])
def get_brand():

    id = request.json['id']

    command = 'MATCH(b:Brand{{id:{id}}}) RETURN (b)'.format(id=id)

    res = graph.run(command).data()

    if(res == []):
        abort(404)
    else:
        return res

# ___________UPDATE_________________

# ___________DELETE_________________

#           _____________________________
# _________/ SHOPPING QUERIES


@app.route('/buy', methods=['POST'])
def buy():

    IdCliente = request.json['IdCliente']
    IdProducto = request.json['IdProducto']
    Cantidad = request.json['Cantidad']

    command = 'MATCH(c:Client{{id:{IdCliente}}}),(p:Product{{id:{IdProducto}}}) CREATE (c)-[r:Buys{{Cantidad:{Cantidad}}}]->(p)'.format(
        IdCliente=IdCliente, IdProducto=IdProducto, Cantidad=Cantidad)
    return graph.run(command).summary()

#           _____________________________
# _________/ GENERAL QUERIES

# 1.
# Top 5 de productos más vendidos. Se debe mostrar el nombre
# del producto y la cantidad de unidades vendidas para los cinco
# productos con más unidades vendidas. Mostrar ordenado
# descendentemente por cantidad.


@app.route('/top5Products', methods=['GET'])
def top_5_products():

    command = 'MATCH (c:Client)-[r:Buys]->(p:Product) RETURN p.Nombre AS Nombre_Producto, SUM(r.Cantidad) AS Unidades_Vendidas ORDER BY (Unidades_Vendidas) DESC LIMIT 5'
    return graph.run(command).data()

# 2.
# Top 5 de marcas más vendidas. Se debe mostrar el nombre de la
# marca, el país de origen y la cantidad de unidades vendidas para
# las cinco marcas con más unidades vendidas. Mostrar ordenado
# descendentemente por cantidad.


@app.route('/top5Brands', methods=['GET'])
def top_5_brands():

    command = 'MATCH (c:Client)-[r:Buys]->(p:Product) MATCH (b:Brand) WHERE b.Nombre = p.Marca RETURN b.Nombre AS Nombre_Marca, b.Pais AS Pais_Origen, SUM(r.Cantidad) AS Unidades_Vendidas ORDER BY (Unidades_Vendidas) DESC LIMIT 5'
    return graph.run(command).data()

# #3.
# Top 5 de clientes con más compras. En este caso se mostrará el
# nombre de aquellos(as) clientes que hayan comprado la mayor
# cantidad de productos. Debe presentarse el nombre y la cantidad
# de unidades totales adquiridas. Mostrar ordenado
# descendentemente por cantidad.


@app.route('/top5Consumers', methods=['GET'])
def top_5_consumers():

    command = 'MATCH (c:Client)-[r:Buys]->(p:Product) RETURN c.first_name + " " + c.last_name AS Nombre_Cliente, SUM(r.Cantidad) AS Unidades_Adquiridas ORDER BY (Unidades_Adquiridas) DESC LIMIT 5'
    return graph.run(command).data()

# #4.
# Búsqueda de un cliente: se digitará o seleccionará el nombre del
# cliente y se mostrar en pantalla el detalle de cada una de sus
# compras


@app.route('/searchClient', methods=['GET'])
def search_client():

    id = request.json['id']

    command = 'MATCH (c:Client)-[r:Buys]->(p:Product) WHERE c.id = {id} RETURN p.Nombre AS Nombre_Producto, r.Cantidad AS Cantidad_Comprada ORDER BY (Cantidad_Comprada) DESC'.format(id = id)
    return graph.run(command).data()


#           _____________________________
# _________/ SPECIAL QUERIES

# #1.
# Clientes y producto común: en este caso se digitará o seleccionará el
# nombre del cliente y se seleccionará el nombre de un producto adquirido
# por ese cliente. Dado lo anterior, sólo deben mostrarse productos
# adquiridos por el cliente (no todo el catálogo de productos existentes).
# En este caso, se debe mostrar en pantalla el nombre completo de todos
# los clientes que también hayan adquirido ese mismo producto.
@app.route('/commonProduct', methods=['GET'])
def common_product():

    command = ''
    return graph.run(command).data()

# #2.
# Clientes compras en común: en este caso se digitará o seleccionará el
# nombre de un cliente y se deben mostrar en pantalla los nombres de
# todos los clientes que tengan al menos dos productos en común con el
# cliente inicial. También debe mostrarse el nombre de los productos en
# común


@app.route('/commonPurchases', methods=['GET'])
def common_purchases():
    return graph.run('').data()

# ______________________________________________________


if __name__ == '__main__':
    PORT = '5000'
    app.run(host='localhost', port=PORT, debug=True)
