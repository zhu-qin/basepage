json.extract! @message, :id, :title, :body, :author_id, :project_id, :reply_to_id, :updated_at
json.author_name  current_user.username
