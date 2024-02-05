import { Client } from 'pg';
import { NextResponse } from 'next/server';
import {CategoryDetails} from "@/app/type";



export async function POST(req: Request) {
    if (req.method === 'POST') {
        const { cat_name, cat_desc, img_path } = req.body  as any;
        console.log(cat_name, cat_desc, img_path)
        if (cat_name && cat_desc && img_path) {
            const client = new Client({
                user: 'postgres',
                host: 'localhost',
                database: 'bgdemol',
                password: 'root',
                port: 5432,
            });

            try {
                await client.connect();

                // Requête SQL pour insérer une nouvelle catégorie
                const result = await client.query<CategoryDetails>(
                    `
                    INSERT INTO categories (cat_name, cat_desc, img_path)
                    VALUES ($1, $2, $3)
                    RETURNING cat_id, cat_name, cat_desc, img_path
                    `,
                    [cat_name, cat_desc, img_path]
                );

                if (result.rows.length === 0) {
                    return NextResponse.json({ error: 'Erreur lors de l\'ajout de la catégorie' });
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
            return NextResponse.json({ error: 'Données manquantes pour ajouter la catégorie' });
        }
    } else {
        return NextResponse.json({ error: 'Méthode non autorisée' });
    }
}
