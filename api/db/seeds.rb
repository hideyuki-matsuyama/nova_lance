20.times do
  faker = Faker::Name.unique
  Example.create! first_name: faker.first_name, last_name: faker.last_name
end
