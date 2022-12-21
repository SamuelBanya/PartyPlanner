class Party < ApplicationRecord
    has_many :items, dependent: :destroy
    has_many :users, through: :items

    validates :name, presence: true
    validates :start_time, presence: true
    validates :end_time, presence: true
end
