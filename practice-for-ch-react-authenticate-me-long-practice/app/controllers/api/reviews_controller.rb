class Api::ReviewsController < ApplicationController

    def create
        @review = Review.new(review_params)
        @review.user_id = current_user.id
        debugger
        if @review.save
            render :show
        else
            render json: { errors: @review.errors.full_messages }, status: 422
        end
    end

    def destroy
        @review = Review.find_by(id: params[:id])
        render json: @review
        @review.destroy
    end

    private
    def review_params
        params.require(:review).permit(:rating, :body, :bench_id)
    end
end
