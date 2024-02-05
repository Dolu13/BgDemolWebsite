import { Client } from 'pg';
import { NextResponse } from 'next/server';
import {CategoryDetails} from "@/app/type";


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

        // Requête SQL pour récupérer les détails des catégories
        const result = await client.query<CategoryDetails>(
            `
            SELECT
                cat_id AS id,
                cat_name AS name
            FROM
                categories
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
