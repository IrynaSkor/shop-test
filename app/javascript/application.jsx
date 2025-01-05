// Entry point for the build script in your package.json
import Rails from "@rails/ujs";
import React from "react";
import ReactDOM from "react-dom/client";
import reactDom from "react-dom";
import "../assets/stylesheets/application.css";
import Navigation from "./header/Navigation";
import ItemsList from "./items/ItemsList";
import OrdersList from "./orders/OrdersList";
import UsersList from "./users/UsersList";
import Profile from "./users/Profile";

// Пример рендера компонента
//const Navigation = Nav.Navigation();
Rails.start();
const currentUser = gon.current_user || { role: "user" };
const currentTab = gon.current_tab || "items";


document.addEventListener("DOMContentLoaded", () => {
  const navElement = document.getElementById("shop_navigation");
  const itemElement = document.getElementById("items_list");
  const orderElement = document.getElementById("orders_list");
  const userElement = document.getElementById("users_list");
  const profileElement = document.getElementById("user_profile");

  if (navElement) {
    const shop_nav = ReactDOM.createRoot(navElement); 
    shop_nav.render(<Navigation user={currentUser} tab ={currentTab} />);
    //ReactDOM.render(<App />, rootElement);
  }
  if(itemElement)
  {
    const item_list = ReactDOM.createRoot(itemElement);
    item_list.render(<ItemsList user={currentUser}  />);
  }
  if(orderElement)
    {
      const order_list = ReactDOM.createRoot(orderElement);
      order_list.render(<OrdersList user={currentUser}  />);
    }
  if(userElement)
    {
      const user_list = ReactDOM.createRoot(userElement);
      user_list.render(<UsersList user={currentUser} />);
    }
  if(profileElement)
      {
        const profile = ReactDOM.createRoot(profileElement);
        profile.render(<Profile  user={currentUser} />);
      }
});