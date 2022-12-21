class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        # TODO: 
        # Build the application locally, and put a byebug here so that we can figure out why 
        # the 'Uncaught (in promise) SyntaxError: Unexpected end of JSON input' error is occurring
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        render json: @current_user 
    end

    private 

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
