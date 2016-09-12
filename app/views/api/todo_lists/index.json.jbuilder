@todo_lists.each do |list|
  json.set! list.id do
    json.id             list.id
    json.title          list.title
    json.body           list.body
    json.author_id      list.author_id
    json.project_id     list.project_id
    if list.todos.length == 0
      json.todos        Hash.new()
    else
      json.todos do
      list.todos.each do |todo|
          json.set! todo.id do
            json.id               todo.id
            json.title            todo.title
            json.body             todo.body
            json.todo_list_id     todo.todo_list_id
            json.author_id        todo.author_id
            json.assign_to_id     todo.assign_to_id
            json.completion       todo.completion
          end
        end
      end
    end
  end
end
