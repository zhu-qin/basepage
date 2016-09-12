class Api::TodoListsController < ApplicationController

  def create
    @todo_list = TodoList.new(todo_list_params)
    if @todo_list.save
      Pusher.trigger(
       "presence-project_#{@todo_list.project_id}",
       "update_todos",
       {action: "CREATE_TODO_LIST", todo_list_id: @todo_list.id}
        )
      render :show
    else
      render @todo_list.errors.full_messages, status: 400
    end
  end

  def index
    @todo_lists = Project.find(params[:project_id]).todo_lists
    render :index
  end

  def update
    @todo_list = TodoList.find(params[:id])
    if @todo_list.update(todo_list_params)
      Pusher.trigger(
      "presence-project_#{@todo_list.project_id}",
       "update_todos",
        {action: "UPDATE_TODO_LIST", todo_list_id: @todo_list.id}
        )
      render :show
    else
      render @todo_list.errors.full_messages, status: 400
    end
  end

  def destroy
    @todo_list = TodoList.find(params[:id])
    Pusher.trigger(
     "presence-project_#{@todo_list.project_id}",
     "update_todos",
      {action: "DESTROY_TODO_LIST", todo_list_id: @todo_list.id}
      )
    if @todo_list.destroy
      render :show
    else
      render @todo_list.errors.full_messages, status: 400
    end
  end

  def show
    @todo_list = TodoList.find(params[:id])
    if @todo_list
      render :show
    else
      render json: ["To-do List not found"]
    end
  end


  def todo_list_params
    params.require(:todo_list).permit(:title, :body, :author_id, :project_id, :id)
  end

end
