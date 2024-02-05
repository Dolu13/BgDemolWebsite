
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';
import {ProductDetails} from "@/app/type";



export default async (req: NextApiRequest, res: NextApiResponse<ProductDetails | { error: string }>) => {
    const productId = req.query.productId; // Assurez-vous d'avoir une route paramétrée pour l'ID du produit

    const client = new Client({
        user: 'votre_utilisateur',
        host: 'votre_hôte',
        database: 'votre_base_de_données',
        password: 'votre_mot_de_passe',
        port: 5432,
    });

    try {
        await client.connect();

        // Requête SQL pour récupérer les détails du produit avec les couleurs et les longueurs
        const result = await client.query<ProductDetails>(
            `
            SELECT
                p.name,
                p.product_desc,
                c.name AS category,
                p.product_price,
                ARRAY_AGG(DISTINCT col.name) AS colors,
                ARRAY_AGG(DISTINCT len.name) AS lengths
            FROM
                products p
                JOIN categories c ON p.category_id = c.cat_id
                LEFT JOIN product_colors pc ON p.product_id = pc.product_id
                LEFT JOIN product_lengths pl ON p.product_id = pl.product_id
                LEFT JOIN colors col ON pc.color_id = col.color_id
                LEFT JOIN stock_lengths len ON pl.length_id = len.length_id
            WHERE
                p.product_id = $1
            GROUP BY
                p.product_id, c.cat_id
            `,
            [productId]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Produit non trouvé' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    } finally {
        await client.end();
    }
};