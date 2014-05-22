module Api
  class MealsController < ApplicationController
    def index
      @meals = Meal.all
      render json: @boards
    end

    # def show
#       @meal = Meal.find(params[:id])
#       render partial: "api/meals/meal", locals: { meal: @meal }
#     end

    def create
      @meal = current_user.meals.build(meal_params)
      if @meal.save
        render partial: "api/meals/meal", locals: { meal: @meal }
      else
        render json: { errors: @meal.errors.full_messages }, status: 422
      end
    end

    # def update
#       @meal = current_user.meals.find(params[:id])
# 
#       if params[:newMemberEmail]
#         email = params[:newMemberEmail]
#         new_member = User.find_by_email(email)
#         new_member && !@meal.members.include?(new_member) && @meal.members << new_member
#       end
# 
#       if @meal.update_attributes(meal_params)
#         render partial: "api/meals/meal", locals: { meal: @meal }
#       else
#         render json: { errors: @meal.errors.full_messages }, status: 422
#       end
#     end
# 
#     def destroy
#       current_user.meals.find(params[:id]).try(:destroy)
#       render json: {}
#     end

    private
    def meal_params
      params.require(:meal).permit(:name)
    end
  end
end