class OrderDescription < ApplicationRecord
  self.table_name = "orders_description"
  belongs_to  :item
  belongs_to  :order

  validates :quantity, numericality: { only_integer: true, greater_than: 0 }
end