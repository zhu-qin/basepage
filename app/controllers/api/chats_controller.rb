class Api::ChatsController < ApplicationController

  def create
    @chat = Chat.new(chat_params)
    if @chat.save
      Pusher.trigger(
      "presence-project_#{@chat.project_id}",
       "update_chats",
       {chat_message_id: @chat.id}
       )
      render :show
    else
      render ["Invalid Message"]
    end
  end

  def index
    @chats = Project.find(params[:project_id]).chat_messages.joins(:author).last(30)
    render :index
  end


  def chat_params
    params.require(:chat).permit(:message, :project_id, :author_id)
  end

end
