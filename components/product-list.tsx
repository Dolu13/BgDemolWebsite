export interface Product{
    libelle: string;
    details: string;
}

export default function ProductList({libelle, details} : Product){
    return(

            <div className="group relative">
                <div
                    className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
                         alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                         className="h-full w-full object-cover object-center"/>
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                    <a href="#">
                        <span className="absolute inset-0"></span>
                        {libelle}
                    </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{details}</p>
            </div>
    );
}