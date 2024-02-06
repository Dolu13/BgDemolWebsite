import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function PUT(req: Request) {
    if (req.method === 'PUT') {
        const body = await req.json();
        const { product_id, product_name, product_desc, product_price, category_id, length_ids = [], color_ids = [], img_path = '' } = body;

        // Vérification des données obligatoires
        if (!product_id || !product_name || !product_desc || !product_price || !category_id) {
            return NextResponse.json({ error: 'Des données sont manquantes pour modifier le produit' });
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

            // Démarrez une transaction
            await client.query('BEGIN');

            // Mettre à jour les informations de base du produit dans la table products
            const updateProductQuery = `
                UPDATE products
                SET product_name = $1, product_desc = $2, product_price = $3, category_id = $4, img_path = $5
                WHERE product_id = $6
            `;
            const updateProductValues = [product_name, product_desc, product_price, category_id, img_path, product_id];
            await client.query(updateProductQuery, updateProductValues);

            // Supprimer toutes les entrées de longueur associées au produit
            await client.query('DELETE FROM product_lengths WHERE product_id = $1', [product_id]);
            // Insérer de nouvelles entrées de longueur associées au produit
            if (length_ids.length > 0) {
                const insertLengthQuery = `
                    INSERT INTO product_lengths (product_id, length_id)
                    SELECT $1, unnest($2::int[])
                `;
                await client.query(insertLengthQuery, [product_id, length_ids]);
            }

            // Supprimer toutes les entrées de couleur associées au produit
            await client.query('DELETE FROM product_colors WHERE product_id = $1', [product_id]);
            // Insérer de nouvelles entrées de couleur associées au produit
            if (color_ids.length > 0) {
                const insertColorQuery = `
                    INSERT INTO product_colors (product_id, color_id)
                    SELECT $1, unnest($2::int[])
                `;
                await client.query(insertColorQuery, [product_id, color_ids]);
            }

            // Validez et confirmez la transaction
            await client.query('COMMIT');

            return NextResponse.json({ success: true });
        } catch (error) {
            // En cas d'erreur, annulez la transaction
            await client.query('ROLLBACK');
            console.error('Erreur lors de l\'exécution de la requête', error);
            return NextResponse.json({ error: 'Erreur interne du serveur' });
        } finally {
            await client.end();
        }
    } else {
        return NextResponse.json({ error: 'Méthode non autorisée' });
    }
}
