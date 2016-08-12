class Api::ProjectDocumentsController < ApplicationController

  def create
    @project_document = ProjectDocument.new(doc_params)

    # ProjectDocument.new(title: 'mytitle', body: 'mytext', project_doc: <File12093841023>)
    # # SAME THING AS
    #  @project_document = ProjectDocument.new
    #  @project_document.title = 'mytitle'
    #  @project_document.body = 'mytext'
    #  @project_document.project_doc =  <File>
    # @project_document.project_doc = params[:file]
    if @project_document.save
      render json: @project_document
    else
      render json: @project_document.errors.full_messages, status: 400
    end
  end

  def index
    @project_documents = Project.find(params[:project_id]).project_documents
    render :index
  end

  def doc_params
    params.require(:project_documents).permit(:title, :body, :project_id, :project_doc)
  end

end
