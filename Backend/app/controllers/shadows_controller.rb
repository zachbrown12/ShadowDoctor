class ShadowsController < ApplicationController

    def create
        shadow = Shadow.create(shadow_params)
        render json: shadow, except: [:updated_at, :created_at]
    end

    def index
        shadows = Shadow.all
        render :json => shadows, :include => ['student', 'doctor']
    end

    def destroy
        @shadow = Shadow.find(params[:id])
        @shadow.destroy
        render json: @shadow, except: [:updated_at, :created_at]
    end



    private

    def shadow_params
        params.require(:shadow).permit(:id, :student_id, :doctor_id, :start_date, :length, :accepted)
    end

end
