Rails.application.routes.draw do
  devise_for :users #, path: 'shop', path_names: { sign_out: 'logout' }
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  get "home/index"
  root to: "home#index"

  resources :orders, only: [:index]
  resources :users, only: [:index] do
    collection do
      get :profile 
    end
  end

  namespace :api do
    resources :items, only: [:index, :update]
    resources :users, only: [:index, :update] do
      collection do
        #get :profile
        patch :profile
      end
    end
    resources :orders, only: [:index, :create] do 
      collection do
        post :add_items
        get :description
        post :clear_cart
      end
    end
  end

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end


