class Item < ApplicationRecord
  self.table_name = "items"
  has_many :order_description
end
