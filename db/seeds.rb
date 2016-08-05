# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(username: "qin", password: "password", main_project: 1)

Project.create(name: "hello", description: "world", manager_id: 1)
("A".."F").to_a.each do |letter|
  TodoList.create(title: "todolist #{letter}", body: "hello", project_id: 1, author_id: 1)
end

["first", "second", "third", "fourth"].each do |todo|
  Todo.create(title: todo, body: todo, author_id: 1, todo_list_id: 1)
end


["hello", "how are you"].each do |message|
  Message.create(title: message, body: message, author_id: 1, project_id: 1)
end

["party", "new year", "christmas"].each do |event|
  Event.create(title: event, body:event, project_id: 1)
end




# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  body       :text
#  project_id :integer          not null
#  author_id  :integer          not null
#  message_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

# == Schema Information
#
# Table name: events
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  body       :text
#  project_id :integer          not null
#  start      :date
#  finish     :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
