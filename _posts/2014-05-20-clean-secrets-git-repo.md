---
title: Clean Secrets from a Git Repo
layout: post
tags : [rails, github, sensitive data]
---
{% include JB/setup %}

I decided to publish a personal project called [SoInformed to Github](https://github.com/bwillis/soinformed). SoInformed is a [live Rails application](https://soinformed.herokuapp.com) that connects to several third-party services, such as Twilio, Foursquare, NewRelic and it runs on Heroku. Making a local project public is pretty standard, but you should not blindly push a project without ensuring your secrets are hidden.

These were the steps I went through to cleanse my application:

### Extract secrets out of committed code

If there are existing secrets, replace them with environment variables or other means of configuration.

### Learn how to remove secrets from your Git repo
Github has a nice writeup on [how to remove sensitive data](https://help.github.com/articles/remove-sensitive-data). I used the tool [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) because it was convenient and easy to use.

### Know what your secrets are
There are a lot of obvious secrets, such as third party application secrets and tokens, but there may be other sensitive data, for example,  SoInformed had my phone number in early commits for testing.

### Search git history for secrets
I used git grep to search for all unique secret strings and find the files which history still had the original secrets.

`git grep YOUR_SECRET $(git rev-list —all)`

### Purge your history of secrets
Using BFG I ran the following command for each file history I wanted to clear:

`java -jar bfg-1.11.6.jar --delete-files application.yml`

For more information on BFG options see their [Github repo](https://rtyley.github.io/bfg-repo-cleaner/). Warning that this is rewriting history.
