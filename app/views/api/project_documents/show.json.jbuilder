json.extract! @project_document, :id, :title, :body, :project_id
json.project_doc asset_path(@project_document.project_doc)
json.content_type @project_document.project_doc.content_type
