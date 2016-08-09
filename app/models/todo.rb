# == Schema Information
#
# Table name: todos
#
#  id           :integer          not null, primary key
#  todo_list_id :integer          not null
#  author_id    :integer          not null
#  assign_to_id :integer
#  completion   :boolean          default(FALSE)
#  title        :string           not null
#  body         :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Todo < ActiveRecord::Base
  validates :todo_list_id, :title, :author_id, presence: true

  belongs_to(
    :todo_list,
    class_name: "TodoList",
    foreign_key: :todo_list_id
  )
  
end
