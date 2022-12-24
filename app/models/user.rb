class User < ApplicationRecord
  has_many :items
  has_many :parties, through: :items
  
  has_secure_password

  has_one :location
  has_many :parties, through: :location

  validates :username, presence: true, uniqueness: true
end
