# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  description :string
#  manager_id  :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Project < ActiveRecord::Base
  validates :name, :manager_id, presence: true

  belongs_to(
    :manager,
    class_name: "User",
    foreign_key: :manager_id
  )

  # has_many(
  #   :messages,
  #   class_name: "Message",
  #   foreign_key: :project_id
  # )

  has_many(
    :todo_lists,
    class_name: "TodoList",
    foreign_key: :project_id
  )

  has_many(
    :todos,
    through: :todo_lists,
    source: :todos
  )

end
