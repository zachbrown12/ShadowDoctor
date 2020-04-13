class CreateDocuments < ActiveRecord::Migration[6.0]
  def change
    create_table :documents do |t|
      t.references :student, null: false, foreign_key: true
      t.string :document_name
      t.string :document_type

      t.timestamps
    end
  end
end
