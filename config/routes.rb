Rails.application.routes.draw do
  # namespace :api do
  resources :parties do 
    resources :items
    # TODO:
    # Figure out why '/location' isn't working:
    # This is a resource to figuring out how to use the singular nested 'resource' in this scenario, which you can do
    # by only using the 'resource' keyword
    # https://stackoverflow.com/questions/23509698/ruby-on-rails-nested-routes-with-has-one-association
    resource :location
  end
  # Login related routes:
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # end
  # all other routes will be load our React application
  # this route definition matches:
  # - *path: all paths not matched by one of the routes defined above
  # - constraints:
  #   - !req.xhr?: it's not a XHR (fetch) request
  #   - req.format.html?: it's a request for a HTML document
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
