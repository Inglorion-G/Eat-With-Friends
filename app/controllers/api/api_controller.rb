class Api::ApiController < ApplicationController
  before_filter :require_login!
end