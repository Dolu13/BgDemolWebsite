import { Client } from 'pg';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'bgdemol',
        password: 'root',
        port: 5432,
    });

    try {
        await client.connect();

        const result = await client.query(
            `
            SELECT
                color_id AS id,
                color,
                hexa_color AS hexa_color
            FROM
                colors
            `
        );

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête', error);
        return NextResponse.json({ error: 'Erreur interne du serveur' });
    } finally {
        await client.end();
    }
}
