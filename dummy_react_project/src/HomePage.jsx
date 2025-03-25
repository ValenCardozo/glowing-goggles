import { useState, useEffect, handleSubmit } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function HomePage() {
    const [count, setCount] = useState(0)

    const [products, setProducts] = useState([
        { id: 1, nombre: "Monitor", precio: 250, stock: 10 },
        { id: 2, nombre: "Teclado", precio: 50, stock: 25 },
        { id: 3, nombre: "Mouse", precio: 30, stock: 40 }
    ]);

    const [editingProduct, setEditingProduct] = useState(null);

    const [newProduct, setNewProduct] = useState({
        nombre: '',
        precio: '',
        stock: ''
    });

    useEffect(() => {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (newProduct.nombre && newProduct.precio && newProduct.stock) {
            setProducts([
                ...products,
                {
                    id: Date.now(),
                    ...newProduct
                }
            ]);
            setNewProduct({ nombre: '', precio: '', stock: '' });
        }
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleDeleteAll = () => {
        setProducts([]);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        setProducts(products.map(p =>
            p.id === editingProduct.id ? editingProduct : p
        ));
        setEditingProduct(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct({
            ...editingProduct,
            [name]: value
        });
    };

    return (
        <>
            <div className="container">
                <h1>Gestión de Productos</h1>

                {/* Formulario para agregar productos */}
                <form onSubmit={handleAddProduct}>
                    <input
                        type="text"
                        name="nombre"
                        value={newProduct.nombre}
                        onChange={handleInputChange}
                        placeholder="Nombre del producto"
                    />
                    <input
                        type="number"
                        name="precio"
                        value={newProduct.precio}
                        onChange={handleInputChange}
                        placeholder="Precio"
                    />
                    <input
                        type="number"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleInputChange}
                        placeholder="Stock"
                    />
                    <button type="submit">Agregar Producto</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                {editingProduct && editingProduct.id === product.id ? (
                                    <td colSpan="4">
                                        <form onSubmit={handleUpdateProduct}>
                                            <input
                                                type="text"
                                                name="nombre"
                                                value={editingProduct.nombre}
                                                onChange={handleEditInputChange}
                                            />
                                            <input
                                                type="number"
                                                name="precio"
                                                value={editingProduct.precio}
                                                onChange={handleEditInputChange}
                                            />
                                            <input
                                                type="number"
                                                name="stock"
                                                value={editingProduct.stock}
                                                onChange={handleEditInputChange}
                                            />
                                            <button type="submit">Guardar</button>
                                        </form>
                                    </td>
                                ) : (
                                    <>
                                        <td>{product.nombre}</td>
                                        <td>${product.precio}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <button onClick={() => handleEditProduct(product)}>Editar</button>
                                            <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {products.length > 0 && (
                    <button onClick={handleDeleteAll}>Eliminar Todos</button>
                )}
            </div>
        </>
    )
}

export default HomePage
