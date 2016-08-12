# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

["Qin", "Larry", "Joe"].each do |name|
  User.create(username: name, password: "password", email: "fake@fake.com", main_project: 1)
end

Project.create(name: "Capstone Project", description: "Capstone Project", manager_id: 1)
