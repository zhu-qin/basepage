class CreateChats < ActiveRecord::Migration
  def change
    create_table :chats do |t|
      t.integer     :project_id,    null: false
      t.integer     :author_id,     null: false
      t.text        :message,       null: false 
      t.timestamps                  null: false
    end
  end
end
