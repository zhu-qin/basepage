# == Schema Information
#
# Table name: calender_events
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  body       :text
#  project_id :integer          not null
#  start      :date
#  finish     :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer
#

class CalenderEvent < ActiveRecord::Base
  validates :title, :project_id, presence: true
  belongs_to(
    :project,
    class_name: "Project",
    foreign_key: :project_id
  )
end
