class Api::TodosController < ApplicationController

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      render :show
    else
      render @todo.errors.full_messages
    end
  end

  def index
    @todos = Project.find(params[:project_id]).todos
    render :index
  end

  def update
    @todo = Todo.find(todo_params[:id])
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: ["something went wrong"]
    end
  end

  def destroy
  end


  def todo_params
    params.require(:todos).permit(:title, :body, :todo_list_id, :author_id, :assign_to_id, :completion, :id)
  end

end
