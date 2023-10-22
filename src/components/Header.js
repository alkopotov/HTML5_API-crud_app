import { useEffect, useRef, useContext } from "react"
import { Context } from "../context/Context";


function Header(props) {

  const {BACKEND} = useContext(Context)
  const {getData} = props

  let addButtonRef = useRef();

  function addNewProduct() {
    let title = prompt("Введите название продукта")
    if (title) {
      let description = prompt("Введите описание продукта")
      let id = Date.now()
      let data = {'id': id, 'title': title, 'description': description}

      fetch(BACKEND, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json; charset=UTF-8'},
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => getData())
    }
  }

  useEffect (()=> {
    addButtonRef.current.addEventListener('click', addNewProduct)
  }, [])

  return (
    <header>
      <h1>Управление товарами</h1>
      <button ref={addButtonRef}>Добавить новый товар</button>
    </header>
  )
}

export default Header