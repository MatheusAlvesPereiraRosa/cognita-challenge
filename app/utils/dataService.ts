import { redirect } from '@remix-run/react';
import { driver } from './neo4'; // Import the database connection
import { Step, StepForm } from '~/interfaces';

/** Function to create steps on a given Trail */
export async function createStep({id, title, content, trailId}: StepForm): Promise<void> {
    const session = driver.session();
    try {
        await session.run(
            'MATCH (t:Trail { id: $trailId }) ' +
            'CREATE (t)-[:HAVE]->(s:Step { id: $id, title: $title, content: $content })',
            { id, title, content, trailId }
        );
    } finally {
        await session.close();
    }
}

/** Function to retrieve steps one especific Trail by its id on the params of the URL */
export async function getOneTrail(trailId: string) {
    const session = driver.session();

    try {
        const result = await session.run(
            'MATCH (t:Trail { id: $trailId }) RETURN t',
            { trailId }
        );

        if (result.records.length === 0) {
            return redirect("/") //Fazer tratamento de
        }

        const trail = result.records[0].get('t').properties;
        return trail;
    } finally {
        await session.close();
    }
}

/** Function to retrieve steps of a given Trail */
export async function getSteps(trailId: string): Promise<Step[]| void> {
    const session = driver.session();

    try {
        const result = await session.run(
            "MATCH (a:Trail { id: $trailId })-[:HAVE]->(b:Step)RETURN b",
            { trailId }
        );

        //console.log(result)

        const steps = result.records.map((record) => {
            const step = record.get("b");
            return step.properties;
        });

        //console.log(steps)

        return steps;
    } catch (error) {
        console.log(error)
    } finally {
        await session.close();
    }
}