class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string    :username,          null: false
      t.string    :password_digest,   null: false
      t.string    :session_token,     null: false
      t.string    :email,             null: false
      t.integer   :main_project
      t.timestamps                    null: false

      t.index     :email
      t.index     :username
    end
  end
end
