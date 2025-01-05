class User < ApplicationRecord
  #enum role:{ user:"user", admin:"admin"}
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :email, presence: true, uniqueness: true
  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 100 }
  validates :password, confirmation: true, allow_blank: true
  self.table_name = "users"
  self.record_timestamps = false
  has_many :orders

  def admin?
    role == "admin"
  end
end
