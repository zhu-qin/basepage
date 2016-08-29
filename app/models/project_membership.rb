class ProjectMembership < ActiveRecord::Base

  validates :email, :project_id, presence: true

  belongs_to(
    :project,
    class_name: "Project",
    foreign_key: :project_id,
    primary_key: :id
  )

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :email,
    primary_key: :email
  )

end
