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
    @calender_event = CalenderEvent.find(params[:id])
    if @calender_event.update(calender_event_params)
      render :show
    else
      render @calender_event.error.full_messages, status: 400
    end
  end

  def destroy
    @calender_event = CalenderEvent.find(params[:id])
    @calender_event.destroy
    render :show
  end

  def calender_event_params
    params.require(:calender_events).permit(:title, :body, :start, :finish, :id, :project_id, :author_id)
  end
end
