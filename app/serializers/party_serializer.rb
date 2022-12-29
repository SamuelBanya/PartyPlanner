class PartySerializer < ActiveModel::Serializer
  # NOTE:
  # Attempt to figure out how to incorporate 'location'
  attributes :id, :name, :start_time, :end_time, :location
  # attributes :id, :name, :start_time, :end_time

  has_many :items
  has_many :users, through: :items

  has_one :location
  has_many :users, through: :location
end

