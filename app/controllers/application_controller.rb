class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  before_action :add_devise_parameters, if: :devise_controller?
  allow_browser versions: :modern
  layout :layout_check
  
  protected

  def layout_check
    if devise_controller?
      "devise"
    else
      "application"
    end
  end

  def add_devise_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name])
  end

end
