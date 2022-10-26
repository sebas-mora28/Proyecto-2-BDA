from py2neo import Graph
from flask import Flask, request

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
    return graph.run("")

# ___________READ___________________
@app.route('/clients', methods=['GET'])
def get_clients():
    return graph.run("").data()

@app.route('/client', methods=['GET'])
def get_client():
    return graph.run("").data()

# ___________UPDATE_________________
@app.route('/client', methods=['PUT'])
def update_client():
    return graph.run("")

# ___________DELETE_________________
@app.route('/client', methods=['DELETE'])
def delete_client():
    return graph.run("")

#           _____________________________
# _________/ CATALOG/PRODUCT QUERIES

# ___________CREATE_________________
@app.route('/product', methods=['POST'])
def create_product():
    return graph.run("")

# ___________READ___________________
@app.route('/products', methods=['GET'])
def get_products():
    return graph.run("").data()

@app.route('/product', methods=['GET'])
def get_product():
    return graph.run("").data()

# ___________UPDATE_________________
@app.route('/product', methods=['PUT'])
def update_product():
    return graph.run("")

# ___________DELETE_________________
@app.route('/product', methods=['DELETE'])
def delete_product():
    return graph.run("")

#           _____________________________
# _________/ SHOPPING QUERIES

@app.route('/buy', methods=['POST'])
def buy():
    return graph.run("")

#           _____________________________
# _________/ GENERAL QUERIES

#1.
# Top 5 de productos más vendidos. Se debe mostrar el nombre 
# del producto y la cantidad de unidades vendidas para los cinco 
# productos con más unidades vendidas. Mostrar ordenado 
# descendentemente por cantidad.
@app.route('/top5Products', methods=['GET'])
def top_5_products():
    return graph.run("").data()

#2.
# Top 5 de marcas más vendidas. Se debe mostrar el nombre de la 
# marca, el país de origen y la cantidad de unidades vendidas para 
# las cinco marcas con más unidades vendidas. Mostrar ordenado 
# descendentemente por cantidad.
@app.route('/top5Brands', methods=['GET'])
def top_5_brands():
    return graph.run("").data()

# #3.
# Top 5 de clientes con más compras. En este caso se mostrará el 
# nombre de aquellos(as) clientes que hayan comprado la mayor 
# cantidad de productos. Debe presentarse el nombre y la cantidad 
# de unidades totales adquiridas. Mostrar ordenado 
# descendentemente por cantidad.
@app.route('/top5Brands', methods=['GET'])
def top_5_brands():
    return graph.run("").data()

# #4.
# Búsqueda de un cliente: se digitará o seleccionará el nombre del 
# cliente y se mostrar en pantalla el detalle de cada una de sus 
# compras
@app.route('/searchClient', methods=['GET'])
def search_client():
    return graph.run("").data()


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
    return graph.run("").data() 

# #2.
# Clientes compras en común: en este caso se digitará o seleccionará el 
# nombre de un cliente y se deben mostrar en pantalla los nombres de 
# todos los clientes que tengan al menos dos productos en común con el 
# cliente inicial. También debe mostrarse el nombre de los productos en 
# común
@app.route('/commonPurchases', methods=['GET'])
def common_purchases():
    return graph.run("").data() 

# ______________________________________________________

if __name__ == '__main__':
    PORT = '5000'
    app.run(host='localhost', port=PORT, debug=True)