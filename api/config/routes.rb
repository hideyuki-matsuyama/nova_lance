Rails.application.routes.draw do
  scope "/api" do
    namespace :v1 do
      post "login", to: "authentications#create"
      resources :examples
    end
  end
end
