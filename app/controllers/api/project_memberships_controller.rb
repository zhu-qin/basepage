class Api::ProjectMembershipsController < ApplicationController

  def create
    @project_membership = ProjectMembership.new(project_membership_params)
    if @project_membership.save
      render :show
    else
      render @project_membership.errors.full_messages, status: 400
    end
  end

  def index
    @project_memberships = Project.find(params[:project_id])
    .project_memberships.joins("left outer join users on users.email = project_memberships.email")
    render :index
  end

  def update
    @project_membership = ProjectMembership.find(params[:id])
    if @project_membership.update(project_membership_params)
      render :show
    else
      render @project_membership.errors.full_messages, status: 400
    end
  end

  def destroy
    @project_membership = ProjectMembership.find(params[:id])
    @project_membership.destroy
    render :show
  end


  def project_membership_params
    params.require(:project_membership).permit(:id, :alias, :project_id, :email, :user_id)
  end

end
