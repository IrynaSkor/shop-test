class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :check_admin, only: [:index]

  def index
    if current_user
      gon.current_user = {
        id: current_user.id,
        role: current_user.role
      }
    else
      gon.current_user = nil
    end
    gon.current_tab = "users";

    if !current_user.admin?
      redirect_to root_path, alert: "Access denied"
    end
  end

  def profile
    if current_user
      gon.current_user = {
        id: current_user.id,
        first_name: current_user.first_name,
        last_name: current_user.last_name,
        email: current_user.email,
        role: current_user.role
      }
    else
      gon.current_user = nil
    end
    gon.current_tab = "users";

    gon.current_tab = "profile";
  end

  private

  def check_admin
    unless current_user&.admin?
      render json: { error: "Unauthorized" }, status: :forbidden
    end
  end

end