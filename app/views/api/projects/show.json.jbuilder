json.extract! @project, :id, :manager_id, :name, :description
json.todos @project.todos
