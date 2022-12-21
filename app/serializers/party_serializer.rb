class PartySerializer < ActiveModel::Serializer
  attributes :id, :name, :start_time, :end_time

  has_many :items
  has_many :users, through: :items
end

