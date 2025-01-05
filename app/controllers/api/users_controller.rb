class Api::UsersController < ApplicationController
  before_action :authenticate_user! 
  before_action :check_admin, only: [:index, :update]
  skip_before_action :verify_authenticity_token, only: [:profile, :update]

  def index
    if params[:search].present?
      users = User.where("last_name ILIKE :search OR email ILIKE :search", search: "%#{params[:search]}%")
    else
      users = User.all
    end
    render json: users
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: { message: "User updated successfully" }, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def profile
    @user = current_user

    if @user.valid_password?(params[:user][:current_password])
      pp = profile_params
      #binding.pry
      if @user.update(pp)
         render json: { message: 'Profile updated successfully', user: @user }, status: :ok
      else
      render json: { errors: ["Can`t update data"]  }, status: :unprocessable_entity
      end
    else
    render json: { errors: ["Current password is incorrect"]  }, status: :unprocessable_entity
    end
  end


  private

  def check_admin
    unless current_user&.admin?
      render json: { error: "Unauthorized" }, status: :forbidden
    end
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :role)
  end

  def profile_params
    user_params = params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    if user_params[:password].blank? || user_params[:password_confirmation].blank? || user_params[:password]!=user_params[:password_confirmation]
       user_params.delete(:password)
       user_params.delete(:password_confirmation)
    end
    user_params
  end
end
