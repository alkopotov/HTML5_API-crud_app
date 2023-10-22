import { useContext, useEffect } from "react";
import { Context } from "../context/Context";

function ProductItem() {
  const {products, getData, BACKEND} = useContext(Context)


  function updateDescription(e) {
    // console.log(e.target.parentNode.parentNode.id)

    let newDescription = prompt("Отредактируйте описание", e.target.parentNode.previousElementSibling.innerText)

    if (newDescription) {
      let data = {'description': newDescription}
      fetch(`${BACKEND}/${e.target.parentNode.parentNode.id}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(data)
      })
        .then(res =>  {
          if (res) {
            return res
          } else {
            let error = new Error(res.statusText);
            error.response = res;
            throw error;
          }}
          )
        .then(res => res.json())
        .then(data => getData())
        .catch(e => console.log("Ошибка сервера"))
      }
  }

  function deleteProduct(e) {
    let check = window.confirm(`Вы действительно хотите удалить ${e.target.parentNode.parentNode.firstElementChild.innerText}?`)
    if (check) {
      fetch(`${BACKEND}/${e.target.parentNode.parentNode.id}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (res) {
            return res.text()        
          } else {
            let error = new Error(res.statusText);
            error.response = res;
            throw error;
          }
        })
        .then(res => {
          alert("Запись удалена");
          getData()
        })
        .catch(e => alert("Ошибка сервера. Запись удалить не удалось."))
    }
  } 

  useEffect(() => {
    getData()
  }, [])

  return (
      <>
      {products.map(elem => 
      <div key={elem.id} id={elem.id} className="product__list__card">
        <h2>{elem.title}</h2>
        <p>{elem.description}</p>
        <div className="button__block">
          <button onClick={(e) => updateDescription(e)}>Редактировать описание</button>
          <button onClick={(e) => deleteProduct(e)}>Удалить позицию</button>
        </div>
      </div>
      )}
      </>
  )
}

export default ProductItem