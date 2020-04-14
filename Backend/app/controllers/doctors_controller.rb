class DoctorsController < ApplicationController

    def index
        doctors = Doctor.all
        render json: doctors
    end

end
