import React, { useEffect, useState } from "react";
import QSearch from "../header/Search";

export default function OrdersList({user}) {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDescriptions, setOrderDescriptions] = useState([]);
    const isAdmin = user.role === "admin";
  
    const fetchOrders = async (search = "") => {
        const response = await fetch(`/api/orders?search=${search}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      };
    
    useEffect(() => {
        fetchOrders(); 
      }, []);

    const fetchDescriptions = async (orderId) => {
        try {
          const response = await fetch("/api/orders/description?order="+ orderId);
          if (!response.ok) {
            throw new Error("Failed to fetch order descriptions");
          }
          const data = await response.json();
          setOrderDescriptions(data);
          setSelectedOrder(orderId);
        } catch (error) {
          alert(error);
        }
      };

  
    return (
      <>
      {isAdmin ? 
        (<QSearch  onSearch={fetchOrders} />):
        (<div className="profile"></div>)
      }

        <table id="ordersList" className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Amount</th>
              <th className="width25"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} onClick={() => fetchDescriptions(order.id)} >
                <td>{order.id}</td>
                <td>{order.user.email} / {order.user.first_name} {order.user.last_name}</td>
                <td>{order.amount} $</td>
                <td>
                {selectedOrder === order.id && (
                    <div>
                       <ul>
                          {orderDescriptions.map((desc) => (
                          <li key={desc.id}>{desc.item.name} - {desc.quantity} x {desc.item.price} $</li>
                           ))}
                       </ul>
                    </div>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };