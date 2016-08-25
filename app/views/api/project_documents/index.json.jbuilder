@project_documents.each do |doc|
  json.set! doc.id do
    json.id               doc.id
    json.title            doc.title
    json.body             doc.body
    json.project_id       doc.project_id
    json.project_doc      asset_path(doc.project_doc)
  end
end




  # == Schema Information
  #
  # Table name: project_documents
  #
  #  id                       :integer          not null, primary key
  #  project_id               :integer          not null
  #  title                    :string           not null
  #  body                     :string
  #  created_at               :datetime         not null
  #  updated_at               :datetime         not null
  #  project_doc_file_name    :string
  #  project_doc_content_type :string
  #  project_doc_file_size    :integer
  #  project_doc_updated_at   :datetime
  #
