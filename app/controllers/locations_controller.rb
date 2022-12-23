class LocationsController < ApplicationController
    # TODO:
    # Adapt the 'items' controller to suit the 'locations' controller as it has a similar relationship
    # However, it is tied to the 'Party' model, and NOT the 'user'

    # From 'rails c' output:
    # 2.7.4 :011 > Location.create  => #<Location id: nil, party_id: nil, name: nil, created_at: nil, updated_at: nil>

    # What this means:
    # When you provide form data from the frontend, you will need to provide the 'party_id' for the specific party
    # as well as the 'name' of the party that you wish to create

    # Workflow for the 'create' method:
    # Find the specific 'party' by its 'party_id' value
    # Then, use something like the following:
    # Party[party_id].location.create(location_params)

    def create 
        byebug
        # location = Location.create(location_params)
        # render json: location, status: :created
    end

    # def update
    #     item = @current_user.items.find_by(id: params[:id])
    #     if item.user_id == @current_user.id
    #         item.update(item_params)
    #         render json: item
    #     else
    #         render json: { errors: [item.errors.full_messages] }, status: :unprocessable_entity
    #     end
    # end

    def index 
        byebug
        # items = @current_user.items.all

        # if session[:user_id]
        #     render json: items
        # else
        #     render json: { errors: ["Not authorized"] }, status: :unauthorized
        # end
    end

    # def show
    #     item = @current_user.items.find_by(id: params[:id])
    #     if item 
    #         render json: item
    #     else
    #         render json: { error: "Item not found" }
    #     end
    # end

    # def destroy
    #     item = @current_user.items.find_by(id: params[:id])
    #     if item.user_id == @current_user.id
    #         item.destroy
    #         head :no_content
    #     end
    # end

    # private 

    def location_params
        # params.permit(:name, :party_id)
        params.permit(:name, :party_id, :location)
    end
end
