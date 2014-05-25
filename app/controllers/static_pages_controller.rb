class StaticPagesController < ApplicationController
  before_filter :require_login!
  
  def root
  end
end
