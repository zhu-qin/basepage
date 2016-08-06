class AddAttachmentProjectDocToProjectDocuments < ActiveRecord::Migration
  def self.up
    change_table :project_documents do |t|
      t.attachment :project_doc
    end
  end

  def self.down
    remove_attachment :project_documents, :project_doc
  end
end
