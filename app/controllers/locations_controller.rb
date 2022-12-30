class LocationsController < ApplicationController
    def create 
        location = Location.create(user_id: @current_user.id, party_id: params[:party_id], name: params[:name])
      
        render json: location, status: :created
    end

    def update
        # byebug
        location = Party.find_by(id: params[:party_id]).location
        if location.user_id == @current_user.id 
            # location.update(location_params)
            location.update(name: params[:name])
            render json: location
        else
            render json: { errors: [location.errors.full_messages] }, status: :unprocessable_entity
        end
        # location = Location.find_by(id: params[:locationId])
        # if location.user_id == @current_user.id
        #     # TODO:
        #     # Figure out why the location isn't being updated accordingly:
        #     # byebug
        #     # location.update(location_params)
        #     location.update(user_id: @current_user.id, party_id: params[:party_id], name: params[:name])
        #     render json: location
        # else
        #     render json: { errors: [location.errors.full_messages] }, status: :unprocessable_entity
        # end
    end

    def index 
        # locations = @current_user.locations.all
        locations = Location.all

        if session[:user_id]
            render json: locations
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def show
        # location = @current_user.location.find_by(id: params[:id])
        # location = Location.find_by(id: params[:id])
        location = Location.find_by(id: params[:locationId])
        if location 
            render json: location
        else
            render json: { error: "Location not found" }
        end
    end

    def destroy
        # byebug
        location = Party.find_by(id: params[:party_id]).location
        if location.user_id == @current_user.id 
            location.destroy
            head :no_content
        else
            render json: { error: "Bad request, cannot be deleted" }, status: 400
        end
    end

    private 

    def location_params
        params.permit(:name, :party_id, :user_id, :locationId, :location)
    end

end