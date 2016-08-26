# == Schema Information
#
# Table name: project_documents
#
#  id                       :integer          not null, primary key
#  project_id               :integer          not null
#  title                    :string           not null
#  body                     :string
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  project_doc_file_name    :string
#  project_doc_content_type :string
#  project_doc_file_size    :integer
#  project_doc_updated_at   :datetime
#

class ProjectDocument < ActiveRecord::Base

  has_attached_file :project_doc, default_url: "dog-keyboard.png"
  validates_attachment_content_type :project_doc,
  content_type:
  ['image/jpeg',
    'image/png',
    'audio/mpeg',
    'audio/x-m4a',
    'video/mp4',
    'video/avi'
  ]
  validates_attachment_file_name :project_doc,
  matches: [
    /png\Z/i,
    /jpe?g\z/i,
    /m4a\Z/i,
    /mp3\Z/i,
    /avi\Z/i
  ]

  validates :title, :project_id, presence: true

  belongs_to(
    :project,
    class_name: "Project",
    foreign_key: :project_id
  )

end
