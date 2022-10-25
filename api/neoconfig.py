
from neo4j import GraphDatabase

uri = "neo4j://localhost:7687"

username = 'neo4j'
password = 'neo'

auth = (username, password)
#Driver instance
driver = GraphDatabase.driver(uri,
    auth=auth)

# Verify the connection details
driver.verify_connectivity()
# end::verifyConnectivity[]


