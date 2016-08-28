class ProjectMembership < ActiveRecord::Base

  belongs_to(
    :projects,
    class_name: "Project",
    foreign_key: :project_id,
    primary_key: :id
  )

  belongs_to(
    :users,
    class_name: "User",
    foreign_key: :email,
    primary_key: :email
  )

end
