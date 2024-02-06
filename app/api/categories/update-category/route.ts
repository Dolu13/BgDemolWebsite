import { Client } from 'pg';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
    if (req.method === 'PUT') {
        const body = await req.json()
        const { id, cat_name, cat_desc, img_path } = body as any;
        // Vérifier que l'ID de la catégorie et les nouvelles données sont fournis
        if (!id || !cat_name || !cat_desc) {
            return NextResponse.json({ error: 'Veuillez fournir l\'ID de la catégorie et les nouvelles données' }, { status: 400 });
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

            // Requête SQL pour mettre à jour une catégorie
            const result = await client.query(
                `
                    UPDATE categories
                    SET cat_name = $1, cat_desc = $2, img_path = CASE WHEN $3 = '' THEN NULL ELSE $3 END
                    WHERE cat_id = $4
                `,
                [cat_name, cat_desc, img_path, id]
            );

            // Vérifier si la mise à jour a réussi
            if (result.rowCount === 0) {
                return NextResponse.json({ error: 'Catégorie non trouvée avec l\'ID fourni' }, { status: 404 });
            } else {
                return NextResponse.json({ success: true }, { status: 200 });
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
