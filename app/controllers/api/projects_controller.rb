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
    @project = Project.find(params[:id])
    if @project.update(project_params)
      render :show
    else
      render @project.errors.full_messages, status: 400
    end
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    render :show
  end


  def project_params
    params.require(:project).permit(:title, :description, :manager_id)
  end

end
