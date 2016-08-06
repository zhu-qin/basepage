class CreateProjectDocuments < ActiveRecord::Migration
  def change
    create_table :project_documents do |t|
      t.integer :project_id, null: false
      t.string  :title, null: false
      t.string  :body
      t.index   :project_id

      t.timestamps null: false
    end

  end
end
