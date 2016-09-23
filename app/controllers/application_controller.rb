class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  helper_method :signed_in?, :current_user

  def current_user
    user = User.find_by(session_token: session[:token])
    user ? (@current_user = user) : nil
  end

  def sign_in(user)
    user.reset_session_token
    session[:token] = user.session_token
    @current_user = user
  end

  def sign_out
    current_user.reset_session_token
    session[:token] = nil
    @current_user = nil
  end

  def signed_in?
    !current_user.nil?
  end

end
