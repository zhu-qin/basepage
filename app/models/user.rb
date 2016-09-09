# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  email           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  main_project    :integer
#

class User < ActiveRecord::Base

  validates :username, :password_digest, :session_token, :email, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many(
    :projects,
    class_name: "Project",
    foreign_key: :manager_id
  )

  has_many(
    :messages,
    class_name: "Message",
    foreign_key: :author_id
  )

  has_many(
    :project_memberships,
    class_name: "ProjectMembership",
    foreign_key: :email,
    primary_key: :email
  )

  has_many(
    :team_projects,
    through: :project_memberships,
    source: :project
  )

  has_many(
    :chat_messages,
    class_name: "Chat",
    foreign_key: :author_id,
    primary_key: :id
  )

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user if user && user.is_password?(password)
    nil
  end

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token = SecureRandom.urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

end
