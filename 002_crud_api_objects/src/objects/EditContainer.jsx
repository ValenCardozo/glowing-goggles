import { useState, useEffect } from 'react';

function EditContainer() {
    const [savedProducts, setSavedProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        const products = localStorage.getItem('savedProducts');
        if (products) {
            setSavedProducts(JSON.parse(products));
        }
    }, []);

    const handleEdit = async (productId) => {
        setIsLoading(true);
        setApiError(null);

        try {
            const response = await fetch(`https://api.restful-api.dev/objects/${productId}`);
            if (!response.ok) throw new Error('Error al obtener el producto');

            const productData = await response.json();
            console.log(productData);
            setEditingProduct(productData);
        } catch (error) {
            setApiError(error.message);
            console.error('Error fetching product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;

        if (name === 'name') {
            setEditingProduct(prev => ({ ...prev, [name]: value }));
        } else {
            setEditingProduct(prev => ({
                ...prev,
                data: {
                    ...prev.data,
                    [name]: name === 'price' || name === 'year' ? Number(value) : value
                }
            }));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`https://api.restful-api.dev/objects/${editingProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingProduct)
            });

            if (!response.ok) throw new Error('Error al actualizar');

            const updatedProducts = savedProducts.map(p =>
                p.id === editingProduct.id ? { id: p.id, name: editingProduct.name } : p
            );

            setSavedProducts(updatedProducts);
            localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));
            setEditingProduct(null);

            alert('Producto actualizado con éxito!');
        } catch (error) {
            setApiError(error.message);
            console.error('Update error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (deleteProduct) => {
        // e.preventDefault();

        if (!window.confirm(`Esta seguro de eliminar el producto ${deleteProduct.name}?`)) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`https://api.restful-api.dev/objects/${deleteProduct.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Error al eliminar');

            const storedProducts = JSON.parse(localStorage.getItem('savedProducts') || '[]');
            const updatedProducts = storedProducts.filter(product => product.id !== deleteProduct.id);

            localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));
            setSavedProducts(updatedProducts);

            alert('Producto eliminado con éxito!');
        } catch (error) {
            setApiError(error.message);
            console.error('Delete error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="edit-container">
            <h2>Productos Guardados</h2>

            {apiError && <div className="error-message">{apiError}</div>}

            {savedProducts.length === 0 ? (
                <p>No hay productos guardados</p>
            ) : (
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(product.id)}
                                        disabled={isLoading}
                                    >
                                        {isLoading && editingProduct?.id === product.id ? 'Cargando...' : 'Editar'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product)}
                                        disabled={isLoading}
                                    >
                                        {isLoading && editingProduct?.id === product.id ? 'Cargando...' : 'Eliminar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {editingProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Editando: {editingProduct.name}</h3>

                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editingProduct.name}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={editingProduct.data.price}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Año:</label>
                                <input
                                    type="number"
                                    name="year"
                                    value={editingProduct.data.year}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Modelo CPU:</label>
                                <input
                                    type="text"
                                    name="cpuModel"
                                    value={editingProduct.data['CPU model']}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Tamaño Disco:</label>
                                <input
                                    type="text"
                                    name="hardDiskSize"
                                    value={editingProduct.data["Hard disk size"]}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>

                            <div className="form-actions">
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingProduct(null)}
                                    disabled={isLoading}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditContainer;