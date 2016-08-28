class CreateProjectMemberships < ActiveRecord::Migration
  def change
    create_table :project_memberships do |t|
      t.integer     :user_id
      t.integer     :project_id,    null: false
      t.string      :username
      t.string      :email,         null: false

      t.timestamps                  null: false
    end
  end

end
