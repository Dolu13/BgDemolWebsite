import { Client } from 'pg';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    if (req.method === 'POST') {
        const body = await req.json();
        const { length } = body as any;

        const lengthRegex = /^\d{1,8}(\.\d{1,2})?$/; // Numéro entre 0 et 99999999.99
        if (!lengthRegex.test(length)) {
            return NextResponse.json({ error: 'Longueur invalide. Veuillez saisir une longueur au format numérique (maximum 8 chiffres avant la virgule et 2 chiffres après la virgule).' });
        }

        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'bgdemol',
            password: 'root',
            port: 5432,
        });

        try {
            await client.connect();

            const query = `
                INSERT INTO lengths (length)
                VALUES ($1)
                RETURNING length_id, length
            `;

            const result = await client.query(query, [length]);

            if (result.rows.length === 0) {
                return NextResponse.json({ error: 'Erreur lors de l\'ajout de la longueur' });
            } else {
                return NextResponse.json(result.rows[0]);
            }
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la requête', error);
            return NextResponse.json({ error: 'Erreur interne du serveur' });
        } finally {
            await client.end();
        }
    } else {
        return NextResponse.json({ error: 'Méthode non autorisée' });
    }
}
