import { Client } from 'pg';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
    if (req.method === 'DELETE') {
        const body = await req.json();
        const colorId = body as number;

        if (!colorId) {
            return NextResponse.json({ error: 'L\'ID de la couleur est manquant dans la requête' });
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

            // Requête SQL pour supprimer une couleur
            const result = await client.query(
                `
                DELETE FROM colors
                WHERE color_id = $1
                `,
                [colorId]
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
