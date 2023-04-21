class Bench < ApplicationRecord
    #validations
    validates :title, :description, :price, :lat, :lng, presence: true
    validates :price, inclusion: { in: 10..1000 }

    #associations
    has_many :reviews
end
