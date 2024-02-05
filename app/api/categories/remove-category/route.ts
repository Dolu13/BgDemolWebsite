import { Client } from 'pg';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
    if (req.method === 'DELETE') {
        const catId = req.body;

        if (!catId) {
            return NextResponse.json({ error: 'L\'ID de la catégorie est manquant dans la requête' });
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

            // Requête SQL pour supprimer une catégorie
            const result = await client.query(
                `
                DELETE FROM categories
                WHERE cat_id = $1
                `,
                [catId]
            );

            if (result.rowCount === 0) {
                return NextResponse.json({ error: 'Catégorie non trouvée avec l\'ID fourni' }, { status: 200 });
            } else {
                return NextResponse.json({ success: true },  { status: 200 });
            }
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la requête', error);
            return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
        } finally {
            await client.end();
        }
    } else {
        return NextResponse.json({ error: 'Méthode non autorisée' }, { status: 405 });
    }
}
