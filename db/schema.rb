# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_01_01_173827) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "items", id: :serial, force: :cascade do |t|
    t.string "name", limit: 100, null: false
    t.string "description", limit: 1000, null: false
    t.decimal "price", precision: 5, scale: 2
  end

  create_table "orders", id: :serial, force: :cascade do |t|
    t.integer "user_id", null: false
    t.decimal "amount", precision: 5, scale: 2
  end

  create_table "orders_description", id: :serial, force: :cascade do |t|
    t.integer "order_id", null: false
    t.integer "item_id", null: false
    t.integer "quantity", null: false
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "first_name", limit: 50, null: false
    t.string "last_name", limit: 100, null: false
    t.string "email", limit: 100, default: "", null: false
    t.string "role", limit: 10, default: "user", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "orders", "users", name: "fk_orders_to_users"
  add_foreign_key "orders_description", "items", name: "fk_ods_to_items"
  add_foreign_key "orders_description", "orders", name: "fk_ods_to_orders"
end
