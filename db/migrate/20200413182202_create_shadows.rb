class CreateShadows < ActiveRecord::Migration[6.0]
  def change
    create_table :shadows do |t|
      t.references :student, null: false, foreign_key: true
      t.references :doctor, null: false, foreign_key: true
      t.date :start_date
      t.string :length
      t.boolean :accepted

      t.timestamps
    end
  end
end
