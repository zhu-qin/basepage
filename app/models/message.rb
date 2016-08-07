# == Schema Information
#
# Table name: messages
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  body        :text
#  project_id  :integer          not null
#  author_id   :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  reply_to_id :integer
#

class Message < ActiveRecord::Base
  validates :title, :project_id, :author_id, presence: true

  belongs_to(
    :project,
    class_name: "Project",
    foreign_key: :project_id
  )

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id
  )

  has_many(
    :replies,
    class_name: "Message",
    foreign_key: :reply_to_id
  )

  belongs_to(
    :parent_message,
    class_name: "Message",
    foreign_key: :reply_to_id
  )

end
