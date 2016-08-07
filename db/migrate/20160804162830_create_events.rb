class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string    :title,       null: false
      t.text      :body
      t.integer   :project_id,  null: false
      t.date      :start
      t.date      :finish
      t.timestamps              null: false

      t.index     :project_id
    end
  end
end
