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

  def get_todo_lists_with_todos
    list_of_todos_list = []
    todo_lists.each do |list_element|
      list_pair = [list_element, list_element.todos]
      list_of_todos_list << list_pair
    end
    list_of_todos_list
  end

end
