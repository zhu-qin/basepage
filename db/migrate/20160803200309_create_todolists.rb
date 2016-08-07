class CreateTodolists < ActiveRecord::Migration
  def change
    create_table :todo_lists do |t|
      t.integer   :project_id,  null: false
      t.integer   :author_id,  null: false
      t.string    :title,       null: false
      t.string    :body,        null: false
      t.timestamps              null: false

      t.index     :project_id
    end
  end
end
