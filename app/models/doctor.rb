class Doctor < ApplicationRecord
    belongs_to :student
    has_many :shadows
    has_many :students, through: :shadows
end
