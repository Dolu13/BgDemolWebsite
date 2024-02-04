import ProductDetail from "@/components/product-detail";
import TolesBardage from "@/public/images/bardage.png";

export default function Page() {

    return(
        <div className="mt-10" data-aos="zoom-y-out">
            <ProductDetail id={1} name={"truc"} details={"mush"} color={["RAL8012","RAL7016"]} price={17.99} category={"Bac Acier"} img={TolesBardage.src}/>
        </div>
    );
}