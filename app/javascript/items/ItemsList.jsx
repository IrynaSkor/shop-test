import React, { useEffect, useState } from "react";
import QSearch from "../header/Search";
import "./ItemsList.css"

export default function ItemsList({user}){
  const [items, setItems] = useState([]);
  const [editItems, setEditItems] = useState({});
  const [cart, setCart] = useState([]);
  const isAdmin = user.role === "admin";

  const fetchItems = async (search = "") => {
    const response = await fetch(`/api/items?search=${search}`);
    if (response.ok) {
      const data = await response.json();
      setItems(data);
    }
  };

  const handleEditChange = (itemId, field, value) => {
    setEditItems((prev) => ({ ...prev,
      [itemId]: { ...prev[itemId], [field]: value },
    }));
  };

  const handleSave = async (itemId) => {
    try {
      const updatedItem = editItems[itemId];
      const response = await fetch(`/api/items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: updatedItem }),
      });

      if (!response.ok) alert("Error save");
      fetchItems(); 
    } catch (error) {
      alert("Error save:" + error);
    }
  };

  const addToCart = (itemId, quantity) => {
    fetch("/api/orders/add_items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_id: itemId, quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.cart) setCart(data.cart);
      })
      .catch((error) => alert("Error:"+ error));
  };

  const handlePurchase = () => {
    fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setCart([]); 
        }
      })
      .catch((error) => alert("Error:"+ error));
  };


  const handleClearCart = async () => {
    try {
      const response = await fetch('/api/orders//clear_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const data = await response.json();
      if (response.ok) {
        setCart([]);  
      } else {
        alert("Failed to clear cart:" + data);
      }
    } catch (error) {
      alert("Error clearing cart:"+ error);
    }
  };

  useEffect(() => {
    fetchItems(); 
  }, []);


  

  return (
    <>
 <QSearch  onSearch={fetchItems} />
 
 {!isAdmin &&
   <div className="fly_button">
    <p>
      <button className="btn btn-outline-primary" onClick={handlePurchase}>Buy {cart.length} NOW!</button>
      </p>
      <p>
      <button className="btn btn-outline-success" onClick={handleClearCart}>Clear Cart</button>
      </p>
  </div>
 }


    <table id="itemsList" className="table table-hover">
    <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Price $</th>
      {!isAdmin && <th scope="col" className="width10">Quantity </th>}
      <th scope="col" className="right">{isAdmin? "Edit":"Buy"}</th>
    </tr>
  </thead>
  <tbody>
{items.map((item)=>(
    <tr key={item.id}>
        <td>
          {isAdmin?(
            <input
              type="text"
              className="form-control"
              value={editItems[item.id]?.name || item.name}
              onChange={(e) => handleEditChange(item.id, "name", e.target.value)}
            />
          )
          :(item.name)     
          }
        </td>
        <td>
        {isAdmin?(
            <input
              type="text"
              className="form-control"
              value={editItems[item.id]?.description || item.description}
              onChange={(e) => handleEditChange(item.id, "description", e.target.value)}
            />
          )
          :(item.description)     
          }
        </td>
        <td>
        {isAdmin?(
            <input
              type="number"
              className="form-control"
              value={editItems[item.id]?.price  || item.price }
              onChange={(e) => handleEditChange(item.id, "price", e.target.value)}
            />
          )
          :(item.price )     
          } 
        </td>
        {!isAdmin && 
          <td>
          <input
              type="number"
              min="1"
              className="form-control"
              defaultValue="1"
              id={`count_${item.id}`}
            />
          </td>
        }
        <th className="right">
        {isAdmin? 
        (<button type="button" 
                 className="btn btn-outline-success" 
                 onClick={() => handleSave(item.id)}>Save</button>):
        (<button type="button" 
                 className="btn btn-outline-primary" 
                 onClick={() => 
                  addToCart(item.id, parseInt(document.getElementById(`count_${item.id}`).value,10))}
                  > to Cart</button>)}
        </th>
    </tr>
))}
  </tbody>
    </table>
    </>
  );
}

