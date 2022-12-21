class Item < ApplicationRecord
    belongs_to :user
    belongs_to :party

    validates :name, presence: true
end
