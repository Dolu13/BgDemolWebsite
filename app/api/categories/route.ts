import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {Category} from "@/components/DashBoard/categories/category-dash";

const prisma = new PrismaClient();


export async function POST(req: Request) {
    if (req.method === 'POST') {
        const body = await req.json()
        const {cat_name, cat_desc, img_path} = body as any;

        if (cat_name && cat_desc) {
            try {
                const newCategory = await prisma.category.create({
                    data: {
                        cat_name: cat_name,
                        cat_desc: cat_desc,
                        img_path: img_path,
                    },
                    select: {
                        cat_id: true,
                        cat_name: true,
                        cat_desc: true,
                        img_path: true,
                    },
                });

                return NextResponse.json(newCategory);
            } catch (error) {
                console.error('Erreur lors de l\'exécution de la requête', error);
                return NextResponse.json({error: 'Erreur interne du serveur'});
            } finally {
                await prisma.$disconnect();
            }
        } else {
            return NextResponse.json({error: 'Données manquantes pour ajouter la catégorie'});
        }
    } else {
        return NextResponse.json({error: 'Méthode non autorisée'});
    }
}
export async function GET(req: Request) {
    try {
        // Utilisez Prisma pour récupérer les catégories
        const categories = await prisma.category.findMany({
            select: {
                cat_id: true,
                cat_name: true,
                cat_desc: true,
                img_path: true,
            },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête', error);
        return NextResponse.json({ error: 'Erreur interne du serveur' });
    } finally {
        await prisma.$disconnect();
    }
}
export async function DELETE(req: Request) {
    if (req.method === 'DELETE') {
        const body = await req.json()
        const catId = body  as any;
        if (!catId) {
            return NextResponse.json({ error: 'L\'ID de la catégorie est manquant dans la requête' });
        }

        try {
            // Utilisez Prisma pour supprimer une catégorie
            const result = await prisma.category.delete({
                where: {
                    cat_id: catId,
                },
            });

            return NextResponse.json({ success: true },  { status: 200 });
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la requête', error);
            return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        return NextResponse.json({ error: 'Méthode non autorisée' }, { status: 405 });
    }
}
export async function PUT(req: Request) {
    if (req.method === 'PUT') {
        const body = await req.json()
        const { cat_id, cat_name, cat_desc, img_path } = body as Category

        if (!cat_id || !cat_name || !cat_desc) {
            return NextResponse.json({ error: 'Veuillez fournir l\'ID de la catégorie et les nouvelles données' }, { status: 400 });
        }

        try {
            // Utilisez Prisma pour mettre à jour une catégorie
            const updatedCategory = await prisma.category.update({
                where: {
                    cat_id: cat_id,
                },
                data: {
                    cat_name: cat_name,
                    cat_desc: cat_desc,
                    img_path: img_path || null,
                },
                select: {
                    cat_id: true,
                    cat_name: true,
                    cat_desc: true,
                    img_path: true,
                },
            });

            return NextResponse.json(updatedCategory, { status: 200 });
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la requête', error);
            return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        return NextResponse.json({ error: 'Méthode non autorisée' }, { status: 405 });
    }
}