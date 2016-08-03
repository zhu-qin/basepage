# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(username: "qin", password: "password")

Project.create(name: "hello", description: "world", manager_id: 1)

TodoList.create(title: "first", body: "hello", project_id: 1, author_id: 1)

["first", "second", "third", "fourth"].each do |todo|
  Todo.create(title: todo, body: todo, author_id: 1, todo_list_id: 1)
end
