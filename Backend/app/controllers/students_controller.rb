class StudentsController < ApplicationController

    def index
        students = Student.all
        render json: students
    end

    def create
            student = Student.create(student_params)
            render json: student, except: [:updated_at, :created_at]
    end
    
        private
    
        def student_params
            params.require(:student).permit(:name, :school, :age, :bio)
        end
    
end
