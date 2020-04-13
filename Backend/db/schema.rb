# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_13_182256) do

  create_table "doctors", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.string "hospital"
    t.string "practice"
    t.float "participation"
    t.text "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "documents", force: :cascade do |t|
    t.integer "student_id", null: false
    t.string "document_name"
    t.string "document_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["student_id"], name: "index_documents_on_student_id"
  end

  create_table "shadows", force: :cascade do |t|
    t.integer "student_id", null: false
    t.integer "doctor_id", null: false
    t.date "start_date"
    t.string "length"
    t.boolean "accepted"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["doctor_id"], name: "index_shadows_on_doctor_id"
    t.index ["student_id"], name: "index_shadows_on_student_id"
  end

  create_table "students", force: :cascade do |t|
    t.string "name"
    t.string "school"
    t.integer "age"
    t.text "bio"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "documents", "students"
  add_foreign_key "shadows", "doctors"
  add_foreign_key "shadows", "students"
end
