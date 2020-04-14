class CreateDoctors < ActiveRecord::Migration[6.0]
  def change
    create_table :doctors do |t|
      t.string :name
      t.string :city
      t.string :state
      t.string :hospital
      t.string :practice
      t.string :phone_number
      t.float :participation
      t.text :notes

      t.timestamps
    end
  end
end
