class CreateSearchTerms < ActiveRecord::Migration
  def change
    create_table :search_terms do |t|
      t.string :term, null: false
    end
    add_index :search_terms, :term
  end
end
