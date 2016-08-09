class Api::MessagesController < ApplicationController

  def index
    @messages = Project.find(params[:project_id]).messages.joins(:author)
    render :index
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      render :show
    else
      render json: @message.errors.full_messages, status: 400
    end
  end

  def message_params
    params.require(:message).permit(:title, :body, :author_id, :project_id, :reply_to_id)
  end
end
