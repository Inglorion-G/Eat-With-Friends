class Api::CommentsController < Api::ApiController
  
  def create
    @comment = Comment.new(comment_params)
    @comment.author_id = current_user.id
    
    if @comment.save
      redirect_to :back
    else
      flash.now[:errors] = @comment.errors.full_messages
      render :new, status: 422
    end
  
  def destroy
  end
  
  private
  
  def comment_params
    params.require(:comment).permit(:commentable_type, :commentable_id, :body)
  end
  
end