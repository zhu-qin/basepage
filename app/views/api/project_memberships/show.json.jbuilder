json.extract! @project_membership, :id, :user_id, :project_id, :email
user = @project_membership.user
json.username user.username if user
json.alias @project_membership.alias
