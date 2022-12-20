class PartiesController < ApplicationController
    def create 
        party = Party.create!(party_params)
        render json: party, status: :created
    end

    def update
        party = Party.find_by(id: params[:id])
        if party
            party.update(party_params)
            render json: party
        else
            render json: { errors: [party.errors.full_messages] }, status: :unprocessable_entity
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
        if party
            party.destroy
            head :no_content
        end
    end

    private 

    def party_params
        params.permit(:name, :start_time, :end_time)
    end

end

