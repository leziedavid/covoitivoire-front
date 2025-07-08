import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { FC } from 'react';

export type Product = {
    id: number;
    name: string;
    variant: string;
    price: number;
    unit: string;
    quantity: number;
    image: string;
};

type ProductGridShopProps = {
    products: Product[];
};

const ProductGridShop: FC<ProductGridShopProps> = ({ products }) => {
    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Résultats : {products.length}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                        <div className="relative h-48 w-full">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                                Vente en détail
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <h2 className="text-lg font-bold text-green-800">{product.name}</h2>
                            <p className="text-sm text-gray-600">{product.variant}</p>
                            <p className="mt-2 font-semibold">
                                {product.price} F CFA / {product.unit}
                            </p>
                            <p className="text-sm text-gray-600">{product.quantity} {product.unit}</p>
                            <Button className="mt-4 w-full flex items-center justify-center gap-2">
                                <ShoppingCart className="w-4 h-4" />
                                Ajouter au panier
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProductGridShop;
