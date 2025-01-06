# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
unless User.exists?(email: 'redleaves@meta.ua')
  User.create(
    first_name: 'Iryna',
    last_name: "Skorobohatova",
    email: 'redleaves@meta.ua',
    password: "Ira0711",
    role: "admin"
  )
end

Item.create([
  {name:"Snickers", description:"chocolate bar",price:1.75},
  {name:"Mars", description:"chocolate bar",price:1.5},
  {name:"Twix", description:"chocolate bar",price:1.2},
  {name:"Bounty", description:"chocolate bar",price:1},
  {name:"Nuts", description:"chocolate bar",price:2}
])
