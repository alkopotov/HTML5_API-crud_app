import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { Context} from './context/Context';

function App() {

  const BACKEND = 'http://localhost:3100/products'
  const [products, setProducts] = useState([]);

  function getData(){
    fetch(BACKEND)
      .then(res => {
        // console.log(res);
        // console.log(res.status);
        if (res.status === 200 || res.status === 304) {
          return res
        } else {
          let error = new Error(res.statusText);
          error.response = res;
          throw error;
        }       
      })
      // .then(res => {
      //   if (res.headers['content-type'] !== 'application/json') {
      //     let error = new Error('Некорректный ответ сервера');
      //     error.response = res;
      //     throw error
      //   }
      //   return res
      // })
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch((e) => {
        console.log(`Error: ${e.message}`);
        console.log(e.response);
        alert('Сервер не отвечает, приложение недоступно. Попробуйте вернуться позднее.');
      })
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
