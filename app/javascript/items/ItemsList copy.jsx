import React, { useEffect, useState } from "react";
import QSearch from "../header/Search";

export default function ItemsList({user}){
  const [items, setItems] = useState([]);
  const [editItems, setEditItems] = useState({});
  const [buys, setBuys] = useState({});
  const isAdmin = user.role === "admin";

  const fetchItems = async (search = "") => {
    const response = await fetch(`/api/items?search=${search}`);
    if (response.ok) {
      const data = await response.json();
      setItems(data);
    }
  };

  const handleQuantityChange = (itemId, value) => {
    setBuys((prev) => ({ ...prev, [itemId]: value }));
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

      if (!response.ok) throw new Error("Error save");
      fetchItems(); 
    } catch (error) {
      console.error("Error save:", error);
    }
  };

  const handleBuy = async (itemId) => {
    try {
      const quantity = buys[itemId];
      const response = await fetch(`/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id: itemId, quantity: quantity }),
      });

      if (!response.ok) throw new Error("Error save");
      fetchItems(); 
    } catch (error) {
      console.error("Error buy:", error);
    }
  };

  useEffect(() => {
    fetchItems(); 
  }, []);


  

  return (
    <>
 <QSearch  onSearch={fetchItems} />

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
              value={buys[item.id] || "1"}
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value, 10))
              }
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
                 onClick={() => handleBuy(item.id)}>Buy</button>)}
        </th>
    </tr>
))}
  </tbody>
    </table>
    </>
  );
}

