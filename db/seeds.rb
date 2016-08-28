# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create(username: "Qin", password: "password", email: "email@email.com")
User.create(username: "Joe", password: "password", email: "fake@fake.com")
User.create(username: "Larry", password: "password", email: "bogus@bogus.com")


Project.create(title: "Capstone", description: "Project One", manager_id: 1)

ProjectMembership.create(email: "fake@fake.com", project_id: 1)
