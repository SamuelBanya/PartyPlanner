class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :party, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
