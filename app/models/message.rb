# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  body       :text
#  project_id :integer          not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  message_id :integer
#

class Message < ActiveRecord::Base
  belongs_to(
    :project,
    class_name: "Project",
    foreign_key: :project_id
  )
end
