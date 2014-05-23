---
title: Clean Secrets from a Git Repo
layout: post
tags : [rails, git, github, sensitive data]
---
{% include JB/setup %}

I decided to publish a personal project called [SoInformed to Github](https://github.com/bwillis/soinformed). SoInformed is a [live Rails application](https://soinformed.herokuapp.com) that connects to several third-party services, such as Twilio, Foursquare, NewRelic and it runs on Heroku. Making a local project public is pretty standard, but you should not blindly push a project without ensuring your secrets are hidden.

## Know what and where your secrets are

Rails uses YAML configuration files to store most application secrets. As of Rails 4, you even have an explicit `config/secrets.yml`. Here are some common application secrets locations:

* [config/secrets.yml](https://github.com/bwillis/soinformed/blob/master/config/secrets.yml): Introduced in Rails 4, should contain most if not all application secrets
* [config/database.yml](https://github.com/bwillis/soinformed/blob/master/config/database.yml): Database specific usernames, passwords and other configuration
* [config/newrelic.yml](https://github.com/bwillis/soinformed/blob/master/config/newrelic.yml): Newrelic configuration, specifically the license key is sensitive here
* [config/asset_sync.yml](https://github.com/bwillis/soinformed/blob/master/config/asset_sync.yml): Asset Sync gem configuration for Amazon AWS integration
* config/initializers/secret_token.rb: It's worth noting that pre Rails 4.0 applications kept the secret_token in this ruby file

These configuration files are great, but it doesn't stop you from leaking sensitive data into your application. Review your application, specifically around third party services, and ensure no sensitive data is missed, for example, with SoInformed, I had directly used my personal phone number early on when testing Twilio integration.

## Extract secrets out of committed code

There are many approaches to moving secrets out of code, but the general best practice is environment variables. Since secrets are commonly kept in YAML files, and they are processed with ERB, you can use ruby to inject the environment variables.

{% highlight ruby %}
foursquare_app_id: <%= ENV['FOURSQUARE_APP_ID'] %>
foursquare_app_secret: <%= ENV['FOURSQUARE_APP_SECRET'] %>
foursquare_app_push_secret: <%= ENV['FOURSQUARE_PUSH_SECRET'] %>
{% endhighlight %}

## Search git history for secrets

Removing secrets from code is one thing, but if you committed the secret in the past it's now a part of version control. For Git, I used `git grep` to search for all unique secret strings in the repository to make sure I hadn't committed them in the past.

`git grep YOUR_SECRET $(git rev-list —all)`

Now that you know which files have the secrets in the history, you can go about removing them from your history.

## Purge your history of secrets
Github has a nice writeup on [how to remove sensitive data](https://help.github.com/articles/remove-sensitive-data). I used the tool [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) because it was convenient and easy to use. Using BFG I ran the following command for each file history I wanted to clear:

`java -jar bfg-1.11.6.jar --delete-files application.yml`

For more information on BFG options see their [Github repo](https://rtyley.github.io/bfg-repo-cleaner/).

This is changing history, so if your code is already public, you will have to force push this. Also, if your code is already public you cannot be sure that someone does not already have the repo cloned so you should change/regenerate all your secrets.