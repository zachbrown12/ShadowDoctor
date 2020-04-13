class CreateDoctors < ActiveRecord::Migration[6.0]
  def change
    create_table :doctors do |t|
      t.string :name
      t.string :location
      t.string :hospital
      t.string :practice
      t.float :participation
      t.text :notes

      t.timestamps
    end
  end
end
