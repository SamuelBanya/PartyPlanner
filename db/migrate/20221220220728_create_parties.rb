class CreateParties < ActiveRecord::Migration[6.1]
  def change
    create_table :parties do |t|
      t.string :name
      t.string :start_time
      t.string :end_time

      t.timestamps
    end
  end
end
