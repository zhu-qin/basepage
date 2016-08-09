class Api::ProjectsController < ApplicationController

  def create
    @project = Project.new(project_params)
    if @project.save
      render :show
    else
      render @project.errors.full_messages, status: 400
    end
  end

  def index
    @projects = current_user.projects
    render :index
  end

  def show
    @project = Project.find(params[:id])
    render :show
  end

  def update
  end

  def destroy
  end


  def project_params
    params.require(:project).permit(:name, :description, :manager_id)
  end

end
