class Api::SessionsController < ApplicationController

  def create
    email = params[:user][:email]
    password = params[:user][:password]
    @user = User.find_by_credentials(email, password)
    if @user
      sign_in(@user)
      render :show
    else
      render json: ["Invalid Password or Username"], status: 400
    end
  end

  def destroy
    @user = current_user
    sign_out
    render :show
  end

end
