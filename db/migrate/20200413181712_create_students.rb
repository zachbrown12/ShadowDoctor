class CreateStudents < ActiveRecord::Migration[6.0]
  def change
    create_table :students do |t|
      t.string :name
      t.string :school
      t.integer :age
      t.text :bio

      t.timestamps
    end
  end
end
