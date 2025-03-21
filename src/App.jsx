import { useState, useEffect, handleSubmit } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
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

  // Cargar productos del localStorage al iniciar
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Guardar productos en localStorage cuando cambien
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

        {/* Lista de productos */}
        <div className="products-list">
          {products.map(product => (
            <div key={product.id} className="product-item">
              {editingProduct && editingProduct.id === product.id ? (
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
              ) : (
                <>
                  <h3>{product.nombre}</h3>
                  <p>Precio: ${product.precio}</p>
                  <p>Stock: {product.stock}</p>
                  <button onClick={() => handleEditProduct(product)}>Editar</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                </>
              )}
            </div>
          ))}
        </div>

        {products.length > 0 && (
          <button onClick={handleDeleteAll}>Eliminar Todos</button>
        )}
      </div>
    </>
  )
}

export default App
