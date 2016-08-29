@project_memberships.each do |membership|
  json.set! membership.id do
    json.id               membership.id
    json.email            membership.email
    json.user_id          membership.user.id
    json.username         membership.user.username
    json.alias            membership.username
  end
end
