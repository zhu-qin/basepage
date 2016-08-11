class Api::CalenderEventsController < ApplicationController

  def index
    @calender_events = Project.find(params[:project_id]).calender_events
    render :index
  end

  def create
    @calender_event = CalenderEvent.new(calender_event_params)
    if @calender_event.save
      render :show
    else
      render @calender_event.errors.full_messages, status: 400
    end
  end

  def update
  end

  def destroy
  end

  def calender_event_params
    params.require(:calender_events).permit(:title, :body, :start, :finish, :id, :project_id)
  end
end
