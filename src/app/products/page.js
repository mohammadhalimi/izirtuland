import TempContact from "@/components/contact";
import ListTitle from "@/components/list";
import ListFertilizer from "@/components/listfetilizer";
export const metadata = {
    title: 'محصولات'
}

const Products = () => {
    return (
        <TempContact>
            <ListTitle />
            <ListFertilizer />
        </TempContact>
    )
}

export default Products;