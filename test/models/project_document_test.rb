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

require 'test_helper'

class ProjectDocumentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
