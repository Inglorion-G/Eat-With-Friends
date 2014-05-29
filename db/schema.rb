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

ActiveRecord::Schema.define(version: 20140529214043) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.integer  "author_id",        null: false
    t.text     "body",             null: false
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["author_id"], name: "index_comments_on_author_id", using: :btree

  create_table "food_items", force: true do |t|
    t.float    "calories"
    t.string   "item_name"
    t.string   "nx_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "search_term_id"
    t.float    "total_fat"
    t.float    "total_carbs"
    t.float    "total_protein"
    t.string   "item_description"
    t.string   "ingredient_statement"
    t.float    "saturated_fat"
    t.float    "cholesterol"
    t.float    "sodium"
    t.float    "dietary_fiber"
    t.float    "vitamin_a"
    t.float    "vitamin_c"
    t.float    "calcium"
    t.float    "iron"
    t.float    "servings_per_container"
    t.float    "serving_size_qty"
    t.string   "serving_size_unit"
    t.float    "serving_weight_grams"
  end

  add_index "food_items", ["nx_id"], name: "index_food_items_on_nx_id", unique: true, using: :btree
  add_index "food_items", ["search_term_id"], name: "index_food_items_on_search_term_id", using: :btree

  create_table "friendships", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "friend_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "friendships", ["friend_id"], name: "index_friendships_on_friend_id", using: :btree
  add_index "friendships", ["user_id", "friend_id"], name: "index_friendships_on_user_id_and_friend_id", unique: true, using: :btree
  add_index "friendships", ["user_id"], name: "index_friendships_on_user_id", using: :btree

  create_table "search_terms", force: true do |t|
    t.string "term", null: false
  end

  add_index "search_terms", ["term"], name: "index_search_terms_on_term", using: :btree

  create_table "user_food_items", force: true do |t|
    t.integer  "food_item_id",     null: false
    t.integer  "user_id",          null: false
    t.datetime "consumption_time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_food_items", ["food_item_id"], name: "index_user_food_items_on_food_item_id", using: :btree
  add_index "user_food_items", ["user_id"], name: "index_user_food_items_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
