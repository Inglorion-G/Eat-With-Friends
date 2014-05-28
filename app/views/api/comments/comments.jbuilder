json.array! @comments do |comment|
  json.extract! comment, :id, :author_id, :body, :created_at, 
    :updated_at, :commentable_id, :commentable_type
end