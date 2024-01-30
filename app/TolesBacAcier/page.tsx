import ProductList, {Product} from "@/components/product-list";

export default function Page(){
    const products : Product[] = [
        {libelle : "Bac Acier", details : "isolation 40mm"},
        {libelle : "Bac Acier", details : "isolation 40mm"},
        {libelle : "Bac Acier", details : "isolation 40mm"},
        {libelle : "Bac Acier", details : "isolation 40mm"},
        {libelle : "Bac Acier", details : "isolation 40mm"},
        {libelle : "Bac Acier", details : "isolation 40mm"}
    ]

    return(
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <h2 className="text-2xl font-bold text-gray-900">Bac acier</h2>

                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                        {products.map(product =>
                            <ProductList libelle={product.libelle} details={product.details} />
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}