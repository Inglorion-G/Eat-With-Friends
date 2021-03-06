class Api::SearchTermsController < Api::ApiController
  def new
    @search_term = SearchTerm.new
  end
  
  def create
    @search_term = SearchTerm.new(search_term_params)
    
    if @search_term.save
      render json: @search_term
    else
      flash.now[:errors] = @search_term.errors.full_messages
      render :new, status: 422
    end
  end
  
  private
  
  def search_term_params
    params.require(:search_term).permit(:term)
  end
  
end