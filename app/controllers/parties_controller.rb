class PartiesController < ApplicationController
    def create 
        party = Party.create!(party_params)
        render json: party, status: :created
    end
    
    def update
        party = Party.find_by(id: params[:id])
        user_id = @current_user.id

        if party.users.find_by(id: user_id)
            party.update(party_params)
            render json: party
        else
            # render json: { errors: [party.errors.full_messages] }, status: :unprocessable_entity
            render json: { errors: [party.errors.full_messages] }, status: 400
        end
    end

    def index 
        parties = Party.all

        if session[:user_id]
            render json: parties
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def show
        party = Party.find_by(id: params[:id])
        if party 
            render json: party
        else
            render json: { error: "Party not found" }
        end
    end

    def destroy 
        party = Party.find_by(id: params[:id])
        user_id = @current_user.id
        if party.users.find_by(id: user_id)
            party.destroy
            head :no_content
        else
            render json: { error: "Bad request, cannot be deleted" }, status: 400
        end
    end

    private 
    
    def party_params
        # params.permit(:name, :start_time, :end_time)
        # NOTE:
        # Attempt to figure out how to incorporate 'location'
        params.permit(:name, :start_time, :end_time, :location)
    end
end

