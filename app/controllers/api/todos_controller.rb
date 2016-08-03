class Api::TodosController < ApplicationController

  def create
    @todo = TodoList.new(todo_params)
    if @todo.save
      render :show
    else
      render @todo.errors.full_messages
    end
  end

  def index
    @todos = TodoList.find(params[:todo_list_id]).todos
    render :index
  end

  def update
  end

  def destroy
  end


  def todo_params
    params.require(:todo).permit(:title, :body, :todo_list_id, :author_id, :assign_to_id, :completion)
  end

end
