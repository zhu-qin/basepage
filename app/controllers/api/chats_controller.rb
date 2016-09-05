class Api::ChatsController < ApplicationController

  def create
    @chat = Chat.new(chat_params)
    if @chat.save
      Pusher.trigger("projects_#{@chat.project_id}", "update_chat", {})
      render :show
    else
      render ["Invalid Message"]
    end
  end

  def index
    @chats = Project.find(params[:project_id]).chat_messages.last(30)
    render :index
  end


  def chat_params
    params.require(:chat).permit(:message)
  end

end
