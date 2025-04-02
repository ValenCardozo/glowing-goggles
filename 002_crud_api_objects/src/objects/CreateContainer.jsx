import { useState, useEffect } from 'react';

function CreateContainer() {
    const [newProduct, setNewProduct] = useState({
        name: '',
        data: {
            price: '',
            year: '',
            cpuModel: '',
            hardDiskSize: '',
        }
    });
    const [savedProducts, setSavedProducts] = useState([]);

    useEffect(() => {
        const products = localStorage.getItem('savedProducts');
        if (products) {
            setSavedProducts(JSON.parse(products));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'name') {
            setNewProduct(prev => ({ ...prev, [name]: value }));
        } else {
            setNewProduct(prev => ({
                ...prev,
                data: {
                    ...prev.data,
                    [name]: value
                }
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const productData = {
            "name": newProduct.name,
            "data": {
                "year": Number(newProduct.data.year),
                "price": Number(newProduct.data.price),
                "CPU model": newProduct.data.cpuModel,
                "Hard disk size": newProduct.data.hardDiskSize
            }
        };

        try {
            const response = await fetch('https://api.restful-api.dev/objects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });

            const data = await response.json();
            console.log('Producto creado:', data);

            setNewProduct({
                name: '',
                data: {
                    price: '',
                    year: '',
                    cpuModel: '',
                    hardDiskSize: '',
                }
            });

            const updatedProducts = [
                ...savedProducts,
                { id: data.id, name: newProduct.name }
            ];

            localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));
            setSavedProducts(updatedProducts);

            alert('Producto creado con éxito!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear el producto');
        }
    };

    return (
        <>
            <div className="container">
                <h1>Gestión de Productos</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        Nombre
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleChange}
                            placeholder="Nombre del producto"
                        />
                    </div>
                    <div>
                        Precio
                        <input
                            type="number"
                            name="price"
                            value={newProduct.data.price}
                            onChange={handleChange}
                            placeholder="Precio"
                        />
                    </div>
                    <div>
                        Año
                        <input
                            type="number"
                            name="year"
                            value={newProduct.data.year}
                            onChange={handleChange}
                            placeholder="Año"
                        />
                    </div>
                    <div>
                        Modelo de CPU
                        <input
                            type="text"
                            name="cpuModel"
                            value={newProduct.data.cpuModel}
                            onChange={handleChange}
                            placeholder="Modelo de CPU"
                        />
                    </div>
                    <div>
                        Tamaño del disco
                        <input
                            type="text"
                            name="hardDiskSize"
                            value={newProduct.data.hardDiskSize}
                            onChange={handleChange}
                            placeholder="Tamaño del disco"
                        />
                    </div>
                    <button type="submit">Agregar Producto</button>
                </form>
            </div>
        </>
    );
}

export default CreateContainer;