export default function DashboardHeader() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo ou nom de votre entreprise */}
                <div className="text-xl font-bold">BGDEMOL</div>

                {/* Menu de navigation */}
                <nav className="hidden md:flex space-x-4">
                    <a href="/dashboard/products" className="hover:text-gray-300">Produits</a>
                    <a href="/dashboard/categories" className="hover:text-gray-300">Catégories</a>
                    <a href="/dashboard/lengths" className="hover:text-gray-300">Longueurs de Stock</a>
                    {/* Ajoutez d'autres liens pour d'autres parties du tableau de bord */}
                </nav>

                {/* Menu de navigation pour les écrans plus petits */}
                <div className="md:hidden">
                    {/* Ajoutez un bouton ou un élément pour activer/désactiver le menu sur les écrans plus petits */}
                </div>
            </div>
        </header>
    );
}