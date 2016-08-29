Rails.application.routes.draw do

  root 'static_pages#root'

  namespace :api, defaults: { format: :json } do

    resource :session,               only: [:create, :destroy]
    resources :users,                only: [:create]

    resources :projects,             only: [:show, :index] do
      resources :todo_lists,          only: [:create, :index]
      resources :project_documents,   only: [:create, :index]
      resources :messages,            only: [:create, :index]
      resources :calender_events,     only: [:create, :index]
      resources :project_memberships, only: [:create, :index]
    end

    resources :todo_lists,           only: [:update, :show, :destroy] do
      resources :todos,               only: [:create, :index]
    end

    resources :todos,                only: [:update, :show, :destroy]
    resources :projects,             only: [:update, :destroy, :create]
    resources :messages,             only: [:update, :destroy]
    resources :calender_events,      only: [:update, :destroy]

  end


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
