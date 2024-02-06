import { Client } from 'pg';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
    if (req.method === 'PUT') {
        const body = await req.json();
        const { id, length } = body as { id: number; length: string };

        if (!id || !length) {
            return NextResponse.json({ error: "ID de la longueur ou longueur manquante dans la requête" });
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

            // Requête SQL pour mettre à jour une longueur
            const result = await client.query(
                `
                UPDATE lengths
                SET length = $1
                WHERE length_id = $2
                `,
                [length, id]
            );

            if (result.rowCount === 0) {
                return NextResponse.json({ error: "Longueur non trouvée avec l'ID fourni" });
            } else {
                return NextResponse.json({ success: true });
            }
        } catch (error) {
            console.error("Erreur lors de l'exécution de la requête", error);
            return NextResponse.json({ error: "Erreur interne du serveur" });
        } finally {
            await client.end();
        }
    } else {
        return NextResponse.json({ error: "Méthode non autorisée" });
    }
}
