# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  # Create benches
  Bench.create!({
    title: "Modern 2 Bedroom Apartment",
    description: Faker::Lorem.sentence(word_count: 10),
    price: 111,
    seating: 6,
    lat: 37.77649208784408, 
    lng: -122.4126448452817
  })

  Bench.create!({
    title: "Lovely staycation",
    description: Faker::Lorem.sentence(word_count: 10),
    price: 129,
    seating: 5,
    lat: 37.77519686166071, 
    lng: -122.41643806132626,
  })

  Bench.create!({
    title: "Newly renovated studio",
    description: Faker::Lorem.sentence(word_count: 10),
    price: 477,
    seating: 4,
    lat: 37.77105294140304, 
    lng: -122.4111333004916
  })

  Bench.create!({
    title: "Close to the beach apartment",
    description: Faker::Lorem.sentence(word_count: 10),
    price: 150,
    seating: 3,
    lat: 37.7752461118801,
    lng: -122.41607726827337
  })

  Bench.create!({
    title: "Located in downtown studio apartment",
    description: Faker::Lorem.sentence(word_count: 10),
    price: 400,
    seating: 2,
    lat: 37.771908709793706, 
    lng: -122.41694336481912
  })



  puts "Done!"
end