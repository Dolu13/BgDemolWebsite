import TolesBardage from "@/public/images/bardage.png";
import ProductCategory from "@/components/product-categorie";

export default function Page() {
    const width = 320;
    const height = 462;

    return (
        <div className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 "  data-aos="zoom-y-out" data-aos-delay="150" >
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                <div className="text-center pb-12 md:pb-16">
                <h1 className="text-2xl md:text-4xl font-extrabold leading-tighter tracking-tighter mb-4"> Nos Produits</h1>
                </div>
        <div className="flex justify-center items-center">
            <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
                <div className="flex flex-col jusitfy-center items-center space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 md:gap-x-8 w-full">
                        <ProductCategory id={1} src={TolesBardage.src} width={width} height={height} libelle={"Tôles imitation tuiles"} category={"TolesBacAcier"}/>

                        <div className="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0">
                            <ProductCategory id={2} src={TolesBardage.src} width={width} height={height} libelle={"Accesoires"} category={"TolesBacAcier"}/>
                            <ProductCategory id={3} src={TolesBardage.src} width={width} height={height} libelle={"Profils spécifiques"} category={"TolesBacAcier"}/>
                        </div>


                        <ProductCategory id={4} src={TolesBardage.src} width={width} height={height} libelle={"Tôles Bac Acier"} category={"TolesBacAcier"}/>

                    </div>

                </div>
            </div>
        </div>
        </div>
            </div>
        </div>
    );
}