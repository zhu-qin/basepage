json.extract! @project, :id, :manager_id, :name, :description
json.completionCount @project.get_todos_completion_count
json.events @project.events.first
json.messages @project.messages.first
