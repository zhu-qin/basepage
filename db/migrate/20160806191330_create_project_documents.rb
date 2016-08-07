class CreateProjectDocuments < ActiveRecord::Migration
  def change
    create_table :project_documents do |t|
      t.integer       :project_id,  null: false
      t.string        :title,       null: false
      t.string        :body
      t.timestamps                  null: false
      
      t.index   :project_id
    end

  end
end
