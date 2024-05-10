import neo4j from 'neo4j-driver';
import dotenv from "dotenv"

/** Load environment variables from .env file */
dotenv.config();

/** Retrieve configuration values from environment variables */
const NEO4J_URI = process.env.NEO4J_URI || 'bolt://localhost:7687';
const NEO4J_USER = process.env.NEO4J_USER || 'remixUser';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || 'admin123';

/** Creating a driver for using database query and conections */
const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));

await driver.close()

export { driver }