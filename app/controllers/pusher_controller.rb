class PusherController < ApplicationController

  def auth
    if signed_in?
      response = Pusher.authenticate(params[:channel_name], params[:socket_id], {
        user_id: current_user.id,
        user_info: {
          name: current_user.username,
          email: current_user.email
        }
      })
      render json: response
    else
      render text: 'Forbidden', status: '403'
    end
  end

end
