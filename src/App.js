import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { Context} from './context/Context';

function App() {

  const BACKEND = 'http://localhost:3100/products'
  const [products, setProducts] = useState([]);

  function getData(){
    fetch(BACKEND)
      .then(res => res.json())
      .then(data => setProducts(data))
  }

  useState()
  return (
    <Context.Provider value={{products, setProducts, getData, BACKEND}}>
      <section className='wrapper'>
        <Header getData={getData}/>
        <ProductList/>
      </section>
    </Context.Provider>
  );
}

export default App;
