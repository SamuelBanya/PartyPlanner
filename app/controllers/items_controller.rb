class ItemsController < ApplicationController
    def create 
        item = @current_user.items.create(item_params)
      
        render json: item, status: :created
    end

    def update
        item = @current_user.items.find_by(id: params[:id])
        if item.user_id == @current_user.id
            item.update(item_params)
            render json: item
        else
            render json: { errors: [item.errors.full_messages] }, status: :unprocessable_entity
        end
    end

    def index 
        items = @current_user.items.all

        if session[:user_id]
            render json: items
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def show
        item = @current_user.items.find_by(id: params[:id])
        if item 
            render json: item
        else
            render json: { error: "Item not found" }
        end
    end

    def destroy
        item = @current_user.items.find_by(id: params[:id])
        if item.user_id == @current_user.id
            item.destroy
            head :no_content
        end
    end

    private 

    def item_params
        params.permit(:name, :party_id)
    end

end