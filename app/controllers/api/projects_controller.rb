class Api::ProjectsController < ApplicationController

  def create
    @project = Project.new(project_params)
    if @project.save
      render :show
    else
      render @project.errors.full_messages
    end
  end

  def index
    @projects = Project.all
    render :index
  end

  def update
  end

  def destroy
  end


  def project_params
    params.require(:project).permit(:name, :description, :manager_id)
  end

end
