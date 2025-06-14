Example.delete_all
20.times do
  faker = Faker::Name.unique
  Example.create! first_name: faker.first_name, last_name: faker.last_name
end

User.find_or_create_by!(
  email: 'admin@example.com',
  nickname: 'test-admin',
  first_name: 'テスト',
  last_name: '管理者'
) do |user|
  user.password = 'password'
  user.password_confirmation = 'password'
end
