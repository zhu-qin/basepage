# == Schema Information
#
# Table name: project_memberships
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  project_id :integer          not null
#  alias      :string
#  email      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

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

  has_one(
    :manager,
    through: :project,
    source: :manager
  )

end
