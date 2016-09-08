@project_memberships.drop(1).each do |membership|
  json.set! membership.id do
    json.id               membership.id
    json.project_id       membership.project_id
    json.email            membership.email
    json.alias            membership.alias
    json.username         membership.user.username if membership.user
  end
end

json.set! :manager do
    json.username         @project_memberships.first.username
    json.email            @project_memberships.first.email
end
