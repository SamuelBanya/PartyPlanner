class PartySerializer < ActiveModel::Serializer
  attributes :id, :name, :start_time, :end_time

  has_many :items
  has_many :users, through: :items

  has_one :location
  has_many :users, through: :location
end

