class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render json: @user
    else
      render json: @user.errors.full_messages, status: 404
    end
  end

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end

end
