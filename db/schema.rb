# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160810192920) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "calender_events", force: :cascade do |t|
    t.string   "title",      null: false
    t.text     "body"
    t.integer  "project_id", null: false
    t.date     "start"
    t.date     "finish"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "calender_events", ["project_id"], name: "index_calender_events_on_project_id", using: :btree

  create_table "messages", force: :cascade do |t|
    t.string   "title",       null: false
    t.text     "body"
    t.integer  "project_id",  null: false
    t.integer  "author_id",   null: false
    t.integer  "reply_to_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "messages", ["project_id"], name: "index_messages_on_project_id", using: :btree

  create_table "project_documents", force: :cascade do |t|
    t.integer  "project_id",               null: false
    t.string   "title",                    null: false
    t.string   "body"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "project_doc_file_name"
    t.string   "project_doc_content_type"
    t.integer  "project_doc_file_size"
    t.datetime "project_doc_updated_at"
  end

  add_index "project_documents", ["project_id"], name: "index_project_documents_on_project_id", using: :btree

  create_table "projects", force: :cascade do |t|
    t.string   "name",                null: false
    t.string   "description"
    t.integer  "manager_id",          null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  create_table "todo_lists", force: :cascade do |t|
    t.integer  "project_id", null: false
    t.integer  "author_id",  null: false
    t.string   "title",      null: false
    t.string   "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "todo_lists", ["project_id"], name: "index_todo_lists_on_project_id", using: :btree

  create_table "todos", force: :cascade do |t|
    t.integer  "todo_list_id",                 null: false
    t.integer  "author_id",                    null: false
    t.integer  "assign_to_id"
    t.boolean  "completion",   default: false
    t.string   "title",                        null: false
    t.string   "body",                         null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.string   "email"
    t.integer  "main_project"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
