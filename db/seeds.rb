# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

["Qin", "Larry", "Lord Commander"].each do |name|
  User.create(username: name, password: "password", email: "fake@fake.com", main_project: 1)
end

Project.create(name: "Night's Watch", description: "Capstone Project", manager_id: 1)

["Party!", "New Year!", "Christmas!"].each do |event|
  Event.create(title: event, body:event, project_id: 1)
end

["Dog Pic"].each do |doc|
  ProjectDocument.create(title: doc, project_id: 1)
end
