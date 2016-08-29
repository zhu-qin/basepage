class ChangeProjectMembershipscolumn < ActiveRecord::Migration
  def change
    rename_column :project_memberships, :username, :alias
  end
end
