@project_memberships.each do |membership|
  json.set! membership.id do
    json.id               membership.id
    json.project_id       membership.project_id
    json.email            membership.email
    json.alias            membership.alias
    json.username         membership.user.username if membership.user
  end
end
