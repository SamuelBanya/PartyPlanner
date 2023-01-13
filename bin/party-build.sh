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
# FIRST ATTEMPT:
export REACT_APP_GOOGLE_API_KEY=$REACT_APP_GOOGLE_API_KEY
# Trying to shorten the name of the variable name so that Render doesn't be so fussy with the API key itself since it seems like they shorten this for some reason:
# SECOND ATTEMPT:
# export REACT_APP_GOOGLE_API_KEY=$GOOGLE_API_KEY
