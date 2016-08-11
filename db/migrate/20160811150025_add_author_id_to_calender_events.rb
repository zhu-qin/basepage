class AddAuthorIdToCalenderEvents < ActiveRecord::Migration
  def change
    add_column :calender_events, :author_id, :integer
  end
end
