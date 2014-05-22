Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users, only: [:create, :new]
  resource :session, only: [:create, :new, :destroy]
  resources :food_items, only: [:new, :create, :search_food]
  
  get '/food_items/search_food', to: 'food_items#search_food'
  
end
