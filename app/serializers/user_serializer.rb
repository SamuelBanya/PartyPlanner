class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :items
  has_many :parties, through: :items
end
