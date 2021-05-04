import React from "react"

const Pizza = ({pizza, handleEditButton}) => {
  return(
    <tr className={`pizza${pizza.id}`}>
      <td >{pizza.topping}</td>
      <td>{pizza.size}</td>
      <td>{pizza.vegetarian === true ? "Yes" : "No"}</td>
      <td><button onClick={() => handleEditButton(pizza)} type="button" className="btn btn-primary">Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
