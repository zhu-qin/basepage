class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.integer :todo_list_id, null: false
      t.integer :author_id, null: false
      t.integer :assign_to_id
      t.boolean :completion, default: false
      t.string :title, null: false
      t.string :body, null: false


      t.timestamps null: false
    end
  end
end
