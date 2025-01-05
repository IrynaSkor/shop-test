class OrdersController < ApplicationController
  before_action :authenticate_user!
  def index
    if current_user
      gon.current_user = {
        id: current_user.id,
        role: current_user.role
      }
    else
      gon.current_user = nil
    end
    gon.current_tab = "orders";


  end
end