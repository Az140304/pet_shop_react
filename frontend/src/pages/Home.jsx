import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/Product/ProductCard";
import { BASE_URL } from "../utils";

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/products`)
            .then((res) => {
                // Ambil 6 produk pertama sebagai featured
                setFeaturedProducts(res.data.slice(0, 6));
            })
            .catch((err) => {
                setFeaturedProducts([]);
                console.error("Error fetching products:", err);
            });

        axios
            .get(`${BASE_URL}/categories`)
            .then((res) => setCategories(res.data))
            .catch((err) => {
                setCategories([]);
                console.error("Error fetching categories:", err);
            });
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 rounded-lg mb-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-4">
                        Welcome to PCC PetShop
                    </h1>
                    <p className="text-xl mb-8">
                        Everything your furry friends need, in one place
                    </p>
                    <Link
                        to="/products"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <div className="text-4xl mb-4">🐕</div>
                        <h3 className="text-xl font-semibold mb-2">
                            Quality Products
                        </h3>
                        <p className="text-gray-600">
                            Only the best for your beloved pets
                        </p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <div className="text-4xl mb-4">🚚</div>
                        <h3 className="text-xl font-semibold mb-2">
                            Fast Delivery
                        </h3>
                        <p className="text-gray-600">
                            Quick and safe delivery to your doorstep
                        </p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <div className="text-4xl mb-4">💰</div>
                        <h3 className="text-xl font-semibold mb-2">
                            Best Prices
                        </h3>
                        <p className="text-gray-600">
                            Competitive prices with great value
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Featured Products</h2>
                    <Link
                        to="/products"
                        className="text-blue-600 hover:underline"
                    >
                        View All Products →
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProducts.map((product) => {
                        const category = categories.find(
                            (cat) => String(cat.id) === String(product.category_id)
                        );
                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                                categoryName={category ? category.nama_jenis : ""}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Home;
