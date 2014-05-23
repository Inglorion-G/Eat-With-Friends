Rails.application.routes.draw do
  root to: 'static_pages#root'
  
  namespace :api, defaults: { format: :json } do
    resources :users, except: [:create, :new, :edit]
  end
  
  resources :users, only: [:new, :create]
  resource :session, only: [:create, :new, :destroy]
  resources :food_items, only: [:new, :create, :search_food]
  
  get '/food_items/search_food', to: 'food_items#search_food'
  
end