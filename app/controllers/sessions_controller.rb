class SessionsController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        # TODO:
        # Debug this error:
        # app/models/party.rb:7:in `<class:Party>'
        # app/models/party.rb:1:in `<top (required)>'
        # app/controllers/sessions_controller.rb:8:in `create'
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else
            render json: { errors: ["Invalid username or password"] }, status: :unauthorized 
        end
    end

    def destroy
        session.delete :user_id 
        head :no_content
    end
end
