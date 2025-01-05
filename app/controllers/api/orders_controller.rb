class Api::OrdersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create,:add_items,:clear_cart]

  def index
    if current_user&.role == "admin"
      if params[:search].present?
        @orders = Order.joins(:user)
           .where("users.last_name ILIKE :search OR users.email ILIKE :search", search: "%#{params[:search]}%")
      else
        @orders = Order.all
      end
    else
      @orders = Order.where(user_id: current_user.id)
    end

    render json: @orders.as_json(include: 
    {
       user: {only: [:email, :first_name, :last_name]}
    })
  end

  def add_items
    session[:cart] ||= []
    item_id = params[:item_id]
    quantity = params[:quantity].to_i

    if item_id && quantity > 0
      session[:cart] << { id: item_id, quantity: quantity }
      render json: { message: "Item added to cart", cart: session[:cart] }, status: :ok
    else
      render json: { error: "Invalid item or count" }, status: :unprocessable_entity
    end
  end


  def create
    cart = session[:cart] || []
    if cart.empty?
      render json: { error: "Cart is empty" }, status: :unprocessable_entity
      return
    end

    #binding.pry
    total_cost = 0
      ActiveRecord::Base.transaction do
        order = current_user.orders.create!(amount: 0)
        cart.each do |cart_item|
          item = Item.find(cart_item["id"])
          user = current_user
          total_cost += item.price * cart_item["quantity"]

          order.order_description.create!(item: item, quantity: cart_item["quantity"])
        end
        order.update!(amount: total_cost)
      end

      session[:cart] = []
      render json: { message: "Order created successfully" }, status: :ok
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity



/
    item = Item.find(params[:item_id])
    quantity = params[:quantity].to_i

    if quantity <= 0
      render json: { error: "Invalid quantity" }, status: :unprocessable_entity
      return
    end

    total_price = item.price * quantity

    order = Order.create(
      user: current_user, 
      amount: total_price
    )

    order_description = OrderDescription.create(
      order: order,
      item: item,
      quantity: quantity
    )

    render json: { message: "Purchase successful", order: order }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Item not found" }, status: :not_found/
  end

  def clear_cart
    session[:cart] = []
    render json: { message: "Order clear" }, status: :ok
  end

  def description
    if params[:order].present?
    descriptions  = OrderDescription.includes(:item).where(order_id: params[:order])

        if descriptions.any?
          render  json: descriptions.as_json(include: 
          {
             item: {only: [:name, :price]}
          })
        end
    end
  end

end