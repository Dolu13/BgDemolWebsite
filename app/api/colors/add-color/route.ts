import { Client } from 'pg';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    if (req.method === 'POST') {
        const body = await req.json();
        const { color, hexa_color } = body as any;

        if (color && /^RAL\s\d{1,4}$/.test(color)) {
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
                    INSERT INTO colors (color, hexa_color)
                    VALUES ($1, $2)
                    RETURNING color_id, color
                `;

                const result = await client.query(query, [color, hexa_color]);

                if (result.rows.length === 0) {
                    return NextResponse.json({ error: 'Erreur lors de l\'ajout de la couleur' });
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
            return NextResponse.json({ error: 'Couleur invalide. Veuillez saisir une couleur au format RAL suivi d\'un espace et d\'un nombre entre 1 et 9999.' });
        }
    } else {
        return NextResponse.json({ error: 'Méthode non autorisée' });
    }
}
