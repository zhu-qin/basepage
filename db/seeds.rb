# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(username: "qin", password: "password", main_project: 1)

Project.create(name: "hello", description: "world", manager_id: 1)
["Most important ToDos", "ToDos I need someone else to do", "Not so important Todos"].to_a.each do |task|
  TodoList.create(title: task, body: "hello", project_id: 1, author_id: 1)
end

["Get Food", "Sleep", "Do the laundry", "Finish Capstone"].each do |todo|
  Todo.create(title: todo, body: todo, author_id: 1, todo_list_id: 1)
end


["hello", "how are you"].each do |message|
  Message.create(title: message, body: message, author_id: 1, project_id: 1)
end

["party", "new year", "christmas"].each do |event|
  Event.create(title: event, body:event, project_id: 1)
end
