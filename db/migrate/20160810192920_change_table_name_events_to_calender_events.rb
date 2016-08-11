class ChangeTableNameEventsToCalenderEvents < ActiveRecord::Migration
  def change
    rename_table :events, :calender_events
  end
end
