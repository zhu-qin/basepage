class Changemessage < ActiveRecord::Migration
  def change
    remove_column :messages, :message_id
    add_column    :messages, :message_id, :integer
  end
end
