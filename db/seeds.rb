# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create(username: "Qin", password: "password", email: "qin@qin.com")
User.create(username: "Joe", password: "password", email: "joe@joe.com")
User.create(username: "Larry", password: "password", email: "larry@larry.com")


Project.create(title: "Company restructuring", description: "Business", manager_id: 1)
Project.create(title: "Fundraiser for local school", description: "School Fundraiser", manager_id: 2)

ProjectMembership.create(email: "larry@larry.com", project_id: 1)
ProjectMembership.create(email: "joe@joe.com", project_id: 1)
