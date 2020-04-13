class Doctor < ApplicationRecord
    has_many :shadows
    has_many :students, through: :shadows
end
