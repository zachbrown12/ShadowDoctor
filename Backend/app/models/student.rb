class Student < ApplicationRecord
    has_many :documents
    has_many :shadows
    has_many :doctors, through: :shadows
end
