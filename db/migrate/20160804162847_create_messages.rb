class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string    :title, null: false
      t.text      :body
      t.integer   :project_id, null: false
      t.integer   :author_id,  null: false
      t.integer   :message_id, null: false
      t.timestamps null: false
    end
  end
end
