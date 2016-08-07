# == Schema Information
#
# Table name: messages
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  body        :text
#  project_id  :integer          not null
#  author_id   :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  reply_to_id :integer
#

@messages.each do |message|
  json.set! message.id do
    json.id           message.id
    json.title        message.title
    json.body         message.body
    json.author_id    message.author_id
    json.reply_to_id  message.reply_to_id
    json.updated_at   message.updated_at
    json.author_name  message.author.username
    json.project_id   message.project_id
  end
end
