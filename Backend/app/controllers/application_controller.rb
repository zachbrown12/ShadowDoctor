class ApplicationController < ActionController::Base
    protect_from_forgery unless: -> { request.format.json? }
    protect_from_forgery except: [:destroy, :create, :index]
end
