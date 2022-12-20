#!/usr/bin/env bash
# exit on error
set -o errexit

# NOTE:
# Adding build commands for frontend for Render.com
rm -rf pulic
npm install --prefix client && npm run build --prefix client
cp -a client/build/. public/

bundle install
bundle exec rake db:migrate 
# NOTE:
# Commenting out seed data since we already seeded the database locally:
# bundle exec rake db:seed
