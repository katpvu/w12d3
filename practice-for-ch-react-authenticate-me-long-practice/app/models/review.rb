class Review < ApplicationRecord
    # validations
    validates :rating, inclusion: { in: 1..5 }, presence: true
    validates :body, inclusion: { in: 1..255 }, presence: true
    validates :user_id, uniqueness: { scope: :bench_id, " cannot review the same Bench more than once" }

    # associations
    belongs_to :user
    belongs_to :bench

    # custom validation
    # def not_a_duplicate
    #     if Review.exists?(user_id: user_id, bench_id: bench_id)
    #         errors.add 
    # end
end
