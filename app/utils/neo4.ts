import neo4j from 'neo4j-driver';

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'neo4j'));

try {
    // Use the driver to execute database operations
    const session = driver.session();

    // Example: Run a Cypher query
    const result = await session.run('MATCH (n) RETURN count(n)');
    const count = result.records[0].get(0).toNumber();
    console.log('Success! Count:', count);

    // Close the session
    await session.close();
} catch (error) {
    console.error('Error executing database operation:', error.message);
} finally {
    // Close the driver
    await driver.close();
}

await driver.close()

export { driver }