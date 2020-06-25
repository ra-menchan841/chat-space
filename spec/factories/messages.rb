Factorybot.define do
  
  factory :message do
    body      {Faker::Lorem.sentence}
    image     {File.open("#{Rails.root}/public/images/test_image.jpg")}
    group_id
    user_id
  end
end