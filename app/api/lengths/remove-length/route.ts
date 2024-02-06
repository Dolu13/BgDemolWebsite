import { Client } from 'pg';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
    if (req.method === 'DELETE') {
        const body = await req.json();
        const lengthId = body as number;

        if (!lengthId) {
            return NextResponse.json({ error: "L'ID de la longueur est manquant dans la requête" });
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

            // Requête SQL pour supprimer une longueur
            const result = await client.query(
                `
                DELETE FROM lengths
                WHERE length_id = $1
                `,
                [lengthId]
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
