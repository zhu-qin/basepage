# == Schema Information
#
# Table name: events
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  body       :text
#  project_id :integer          not null
#  start      :date
#  finish     :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Event < ActiveRecord::Base
  belongs_to(
    :project,
    class_name: "Project",
    foreign_key: :project_id
  )
end
