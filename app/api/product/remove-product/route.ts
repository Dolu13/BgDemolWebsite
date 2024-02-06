import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function DELETE(req: Request) {
    if (req.method === 'DELETE') {
        const body = await req.json();
        const productId = body as number;

        if (!productId) {
            return NextResponse.json({ error: 'L\'ID du produit est manquant dans la requête' });
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

            // Supprimer les entrées correspondantes dans la table product_lengths
            await client.query(
                `
                DELETE FROM product_lengths
                WHERE product_id = $1
                `,
                [productId]
            );

            // Supprimer les entrées correspondantes dans la table product_colors
            await client.query(
                `
                DELETE FROM product_colors
                WHERE product_id = $1
                `,
                [productId]
            );

            // Supprimer le produit de la table products
            const result = await client.query(
                `
                    DELETE FROM products
                    WHERE product_id = $1
                `,
                [productId]
            );

            if (result.rowCount === 0) {
                return NextResponse.json({ error: 'Produit non trouvé avec l\'ID fourni' });
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
