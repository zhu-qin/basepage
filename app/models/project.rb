# == Schema Information
#
# Table name: projects
#
#  id                  :integer          not null, primary key
#  name                :string           not null
#  description         :string
#  manager_id          :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#

class Project < ActiveRecord::Base
  has_attached_file :avatar, default_url: "dog-keyboard.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  validates :name, :manager_id, presence: true

  belongs_to(
    :manager,
    class_name: "User",
    foreign_key: :manager_id
  )

  has_many(
    :project_documents,
    class_name: "ProjectDocument",
    foreign_key: :project_id
  )

  has_many(
    :messages,
    class_name: "Message",
    foreign_key: :project_id
  )

  has_many(
    :events,
    class_name: "Event",
    foreign_key: :project_id
  )

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

  def get_todos_completion_count
    todos = self.todos
    count = 0
    todos.each do |todo|
      count += 1 if todo.completion == true
    end
    [count, todos.length]
  end
  
end