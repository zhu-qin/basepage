class Changeuser < ActiveRecord::Migration
  def change
    add_column :users, :main_project, :integer
    add_index :users, :email, unique: true
    add_index :users, :username, unique: true
  end
end
