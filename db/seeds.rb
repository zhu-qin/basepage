# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



User.create(username: "Jill", password: "password", email: "jill@jill.com")
User.create(username: "Jack", password: "password", email: "jack@jack.com")

Project.create(title: "Jill's rocket ship project to Mars", description: "Space", manager_id: 1)
Project.create(title: "Jack's fundraiser for kids who don't read good", description: "School Fundraiser", manager_id: 2)

ProjectMembership.create(email: "jack@jack.com", project_id: 1)
ProjectMembership.create(email: "jill@jill.com", project_id: 2)
