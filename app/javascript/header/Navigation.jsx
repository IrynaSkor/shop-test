import './Navigation.css';
import React from "react";

export default function Navigation({user, tab}){
  const isAdmin = user.role === "admin";
return(
<>

<ul className="nav nav-underline">
  <li className="nav-item">
    <a className={tab === "items"?"nav-link active":"nav-link" } aria-current="page" href="/">Items</a>
  </li>
  <li className="nav-item">
    <a className={tab === "orders"?"nav-link active":"nav-link" } href="/orders">Orders</a>
  </li>
  {isAdmin && 
    <li className="nav-item">
    <a className={tab === "users"?"nav-link active":"nav-link" } href="/users">Users</a>
  </li>
  }
  <li className="nav-item">
    <a className={tab === "profile"?"nav-link active":"nav-link" } href="/users/profile">Profila</a>
  </li>
</ul>
</>
)
}