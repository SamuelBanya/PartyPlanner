class Party < ApplicationRecord
    has_many :items, dependent: :destroy
    has_many :users, through: :items

    # Using Active Records docs example:
    # https://guides.rubyonrails.org/association_basics.html#the-has-one-association
    has_one :location

    validates :name, presence: true
    validates :start_time, presence: true
    validates :end_time, presence: true
end
