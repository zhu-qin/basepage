@projects.each do |project|
  json.set! project.id do
    json.id               project.id
    json.name             project.name
    json.description       project.description
    json.manager_id       project.manager_id
  end
end
