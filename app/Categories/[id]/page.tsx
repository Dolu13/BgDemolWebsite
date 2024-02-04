import ProductItem, {Product} from "@/components/product-item";

export default function Page(){
    const products : Product[] = [
        {id: 1, libelle : "Toles Bac Acier", details : "isolation 40mm", categoryId : 1},
        {id: 2, libelle : "Imitation tuiles", details : "isolation 50mm", categoryId : 2},
        {id: 3, libelle : "Bac Acier", details : "isolation 50mm", categoryId : 1},
        {id: 4, libelle : "Bac Acier", details : "isolation 50mm", categoryId : 1},
        {id: 5, libelle : "Bac Acier", details : "isolation 50mm", categoryId : 1},
        {id: 6, libelle : "Bac Acier", details : "isolation 50mm", categoryId : 1},
    ]

    return(
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <div className="text-center pb-12 md:pb-16">
                        <h1 className="text-2xl md:text-4xl font-extrabold leading-tighter tracking-tighter mb-4">Bac acier</h1>
                    </div>
                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-3">
                        {products.map(product =>
                            <ProductItem id={product.id} libelle={product.libelle} details={product.details} categoryId={product.categoryId} />
                        )}
                  </div>
                </div>
            </div>
        </div>
    )
}