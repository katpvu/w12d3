class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.integer :rating, null: false
      t.text :body, null: false
      t.references :user, null: false, foreign_key: true, index: false
      t.references :bench, null: false, foreign_key: true
      t.index [:user_id, :bench_id], unique: true
      t.timestamps
    end
  end
end
