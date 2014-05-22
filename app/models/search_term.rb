class SearchTerm < ActiveRecord::Base
  validates :term, presence: true
end