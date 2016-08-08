# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

["Qin", "Larry", "Roger"].each do |name|
  User.create(username: name, password: "password",email: "fake@fake.com", main_project: 1)
end

Project.create(name: "Full-Stack Project", description: "Capstone Project", manager_id: 1)

["Most important ToDos", "Not so important Todos"].each do |title|
  TodoList.create(title: title, body: title, project_id: 1, author_id: 1)
end

["Get Food", "Sleep", "Do the laundry", "Finish Capstone"].each do |todo|
  Todo.create(title: todo, body: todo, author_id: 1, todo_list_id: 1)
end

["Defend the Wall", "Where is Lord Commander?"].each_with_index do |message, index|
  Message.create(title: message, author_id: 1, project_id: 1)
end

["What?", "What time is it?"].each_with_index do |message, index|
  Message.create(title: message, body: message, author_id: 2, project_id: 1, reply_to_id: 1)
end

["Party!", "New Year!", "Christmas!"].each do |event|
  Event.create(title: event, body:event, project_id: 1)
end

["dog pic"].each do |doc|
  ProjectDocument.create(title: doc, project_id: 1)
end
