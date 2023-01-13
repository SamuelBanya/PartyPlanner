#!/usr/bin/env bash
# exit on error
set -o errexit

# NOTE:
# Adding build commands for frontend for Render.com
rm -rf public
npm install --prefix client && npm run build --prefix client
cp -a client/build/. public/

bundle install
bundle exec rake db:migrate 
# NOTE:
# Commenting out seed data since we already seeded the database locally:
# bundle exec rake db:seed

# Adding Google Maps API key specific environment variable:
# From the Render.com docs page:
# https://render.com/docs/deploy-create-react-app
export REACT_APP_GOOGLE_API_KEY=$REACT_APP_GOOGLE_API_KEY
