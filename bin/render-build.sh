#!/udr/bin/env bash# exit on error
set -o errexit

bundle install
npm install

bundle exec rails assets:precompile
bundle exec rails assets:clean

echo "Running database migrations..."
bin/rails db:migrate