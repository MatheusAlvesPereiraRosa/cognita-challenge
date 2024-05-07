import driver from './neo4'; // Import the database connection

export async function createStep(id: string, title: string, content: string) {
    const session = driver.session();
    try {
        await session.run(
            'CREATE (s:Step { id: $id, title: $title, content: $content })',
            { id, title, content }
        );
    } finally {
        await session.close();
    }
}

export async function getSteps() {
    const session = driver.session();
    try {
        const result = await session.run(
            'MATCH (s:Step) RETURN s.title AS title, s.content AS content'
        );
        return result.records.map((record: any) => ({
            id: record.get('id'),
            title: record.get('title'),
            content: record.get('content')
        }));
    } finally {
        await session.close();
    }
}