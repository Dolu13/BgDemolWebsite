import { Client } from 'pg';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
    if (req.method === 'PUT') {
        const body = await req.json();
        const { id, color, hexa_color } = body as { id: number; color: string, hexa_color: string };

        if (!id || !color) {
            return NextResponse.json({ error: 'ID de la couleur ou couleur manquante dans la requête' });
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

            // Requête SQL pour mettre à jour une couleur
            const result = await client.query(
                `
                UPDATE colors
                SET color = $1, hexa_color = $2
                WHERE color_id = $2
                `,
                [color, hexa_color, id]
            );

            if (result.rowCount === 0) {
                return NextResponse.json({ error: 'Couleur non trouvée avec l\'ID fourni' });
            } else {
                return NextResponse.json({ success: true });
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
