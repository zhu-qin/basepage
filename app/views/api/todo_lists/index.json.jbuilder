@todo_lists.each do |list|
  json.set! list.id do
    json.id list.id
    json.title list.title
    json.body list.body
    json.author_id list.author_id
    json.project_id list.project_id
    json.todos list.todos
  end
end
