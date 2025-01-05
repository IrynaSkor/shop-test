class Api::ItemsController < ApplicationController
  before_action :find_item, only: [:update]
  skip_before_action :verify_authenticity_token, only: [:update]
  
  def index
    if params[:search].present?
      @items = Item.where("name ILIKE ?", "%#{params[:search]}%")
    else
      @items = Item.all
    end
    render json: @items
  end


  def update
    if @item.update(item_params)
      render json: @item, status: :ok
    else
      render json: { errors: @item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def find_item
      @item = Item.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Item not found" }, status: :not_found
    end

    def item_params
      params.require(:item).permit(:name, :description, :price)
    end
end
