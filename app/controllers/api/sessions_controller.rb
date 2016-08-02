class Api::SessionsController < ApplicationController

  def create
    username = params[:user][:username]
    password = params[:user][:password]
    user = User.find_by_credentials(username, password)
    if user
      sign_in(user)
      render json: user
    else
      render json: ["invalid password or username"], status: 401
    end
  end

  def destroy
    user = current_user
    sign_out
    render json: user
  end

end
