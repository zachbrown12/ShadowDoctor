class ShadowsController < ApplicationController

    def create
        shadow = Shadow.create(shadow_params)
        render json: shadow, except: [:updated_at, :created_at]
    end

    def index
        shadows = Shadow.all
        render :json => shadows, :include => ['student', 'doctor']
    end






    private

    def shadow_params
        params.require(:shadow).permit(:student_id, :doctor_id, :start_date, :length, :accepted)
    end

end
