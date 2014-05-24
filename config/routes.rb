Rails.application.routes.draw do
  root to: 'static_pages#root'
  
  namespace :api, defaults: { format: :json } do
    resources :users, except: [:create, :new, :edit] do
      resources :user_food_items, only: [:new, :destroy, :index, :show]
    end
    resources :user_food_items, only: [:create]
    resources :food_items, only: [:create, :search_food, :index, :show]
  end
  
  resources :users, only: [:new, :create]
  resource :session, only: [:create, :new, :destroy]
  
  get '/food_items/search_food', to: 'api/food_items#search_food'
  
end