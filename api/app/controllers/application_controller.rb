# frozen_string_literal: true

class ApplicationController < ActionController::API
  include Devise::Controllers::Helpers

  before_action :authenticate_user!
end
