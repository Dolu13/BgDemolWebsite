
import { Client } from 'pg';
import {NextResponse} from "next/server";
import {ProductDetails} from "@/app/type";



export async function GET(req: Request){

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'bgdemol',
        password: 'root',
        port: 5432,
    });

    try {
        await client.connect();

        // Requête SQL pour récupérer les détails du produit avec les couleurs et les longueurs
        const result = await client.query<ProductDetails>(
            `
            SELECT
                p.product_id,
                p.product_name,
                p.product_desc,
                c.cat_name AS category,
                p.product_price,
                p.img_path,
                ARRAY_AGG(DISTINCT col.color) AS colors,
                ARRAY_AGG(DISTINCT len.length) AS lengths
            FROM
                products p
                JOIN categories c ON p.category_id = c.cat_id
                LEFT JOIN product_colors pc ON p.product_id = pc.product_id
                LEFT JOIN product_lengths pl ON p.product_id = pl.product_id
                LEFT JOIN colors col ON pc.color_id = col.color_id
                LEFT JOIN stock_lengths len ON pl.length_id = len.length_id
            GROUP BY
                p.product_id, c.cat_id
            `
        );
        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Produits non trouvé' });
        } else {
            return NextResponse.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête', error);
        return NextResponse.json({ error: 'Erreur interne du serveur' });
    } finally {
        await client.end();
    }
};