class Changetodolistsandusers < ActiveRecord::Migration
  def change
    change_column :todo_lists, :body, :string, :null => true
  end
end
