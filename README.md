# RISE Character Planner
Brainstorm and save ideas for your next RISE character

Project deployed at: http://rise-character-planner.s3-website-us-west-1.amazonaws.com/

**Frontend:** React on S3 Bucket + CloudFront.

**Backend:** Express Server is dockerized with AWS ECR/ECS on Fargate.

**Database:** Data stored on Mongo Atlas.

## Description

RISE Character Planner is a MERN (Mongo, Express, React, Node) project that features account login and registration with front and backend authentication and validations in user creation. Once the user is logged in they will be able to create a character concept using some of the documentation that I have written for RISE. At the end of the character creation process the user can choose to have ChatGPT generate a backstory for the character based on the selections the user made during character creation.
