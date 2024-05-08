import neo4j from 'neo4j-driver';

const URI = 'bolt://localhost:7687'
const USER = 'remixUser'
const PASSWORD = 'admin123'

const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

await driver.close()

export { driver }