import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function POST(req: Request) {
    if (req.method === 'POST') {
        const body = await req.json();
        const { product_name, product_desc, product_price, category_id, length_ids = [], color_ids = [], img_path = '' } = body;

        // Vérification des données obligatoires
        if (!product_name || !product_desc || !product_price || !category_id) {
            return NextResponse.json({ error: 'Des données sont manquantes pour ajouter le produit' });
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

            // Ajout du produit dans la table products
            const productQuery = `
                INSERT INTO products (product_name, product_desc, product_price, category_id, img_path)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING product_id
            `;
            const productValues = [product_name, product_desc, product_price, category_id, img_path];
            const productResult = await client.query(productQuery, productValues);
            const productId = productResult.rows[0].product_id;

            // Ajout des longueurs associées au produit dans la table product_lengths
            if (length_ids.length > 0) {
                const lengthQuery = `
                    INSERT INTO product_lengths (product_id, length_id)
                    SELECT $1, unnest($2::int[])
                `;
                await client.query(lengthQuery, [productId, length_ids]);
            }

            // Ajout des couleurs associées au produit dans la table product_colors
            if (color_ids.length > 0) {
                const colorQuery = `
                    INSERT INTO product_colors (product_id, color_id)
                    SELECT $1, unnest($2::int[])
                `;
                await client.query(colorQuery, [productId, color_ids]);
            }

            return NextResponse.json({ success: true });
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
