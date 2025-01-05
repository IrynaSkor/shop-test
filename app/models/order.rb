class Order < ApplicationRecord
  self.table_name = "orders"
  belongs_to  :user
  has_many :order_description, dependent: :destroy

  validates :amount, presence: true
end