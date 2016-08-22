# == Schema Information
#
# Table name: projects
#
#  id                  :integer          not null, primary key
#  title               :string           not null
#  description         :string
#  manager_id          :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#

require 'test_helper'

class ProjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
