---
title: Rails and Jasmine with CoffeeScript
layout: post
tags : [rails, jasmine, coffeescript]
---
{% include JB/setup %}

<div class="alert alert-info">
<b>Hello!</b> My original post was on http://chill.manilla.com, but since Manilla has been shutdown I have moved it here. It has not been updated, but is still a viable working strategy for javascript testing.
</div>

Getting setup with Javascript testing is not an easy task, but a framework like [Jasmine](http://pivotal.github.com/jasmine/) makes it a lot less painful. However, when we enabled the asset pipeline on manilla.com, we also wanted to take full advantage of [CoffeeScript](http://coffeescript.org/). CoffeeScript is a great abstraction on Javascript and we wanted to leverage those benefits anywhere we could in our application and our tests. Our goals in utilizing CoffeeScript were:

1. Write Jasmine tests against CoffeeScript and [SCSS](http://pivotallabs.com/users/andrew/blog/articles/1160-standup-2-11-2010-sass-with-jasmine) assets
2. Write Jasmine tests in CoffeeScript
3. Port existing Javascript Code to CoffeeScript
4. Our first steps were to setup the infrastructure to perform testing with and against CoffeeScript files. Then we migrated our existing javascript source files to CoffeeScript.

### CoffeeScript Enabled Testing & Continuous Integration (CI)

Our existing Jasmine tests used the [jasmine-gem](https://github.com/pivotal/jasmine-gem). The jasmine-gem worked well when we used static javascript files before adopting the asset pipeline. The existing Jasmine runner would run a standalone Rack webserver to serve static javascript files. Now, we wanted to allow both the tests and source files to be written in CoffeeScript and to load other precompiled assets like SCSS, so we re-evaluated our options. These are some of the gems available to accomplish this:

* [guard](https://github.com/guard/guard), [guard-coffeescript](https://github.com/guard/guard-coffeescript) & [guard-livereload](https://github.com/guard/guard-livereload): watch CoffeeScript files and automatically compile to javascript files which are served by the jasmine runner
* [jasmine-gem](https://github.com/pivotal/jasmine-gem): with a CoffeeScript rack middleware interpreter-this looks to be included in Jasmine 1.2 but there are not a lot of details on how to use it
* [jasminerice](https://github.com/bradphelan/jasminerice): leverage Rails asset pipeline

We chose the solution we thought was simple and we could easily support: [jasminerice](https://github.com/bradphelan/jasminerice). The simplicity of utilizing the Rails Asset Pipeline to compile any assets, not just CoffeeScript, but also SCSS files made it ideal to run our Jasmine tests. To get started you have to:

1. include jasminerice gem in the dev and testing groups <img src="{{ ASSET_PATH }}/images/gemfile.png" class="img-responsive center-block"/>
2. edit your jasmine spec manifest in spec/javascripts/spec.js.coffee to include your test files (optionally include any scss/sass files in spec/javascripts/spec.css) <img src="{{ ASSET_PATH }}/images/asset-pipeline-manifest.png" class="img-responsive center-block" />
3. write your tests in CoffeeScript including any dependencies <img src="{{ ASSET_PATH }}/images/jasmine-coffeescript-spec.png" class="img-responsive center-block" />
4. visit http://localhost:3000/jasmine and watch your tests run <img src="{{ ASSET_PATH }}/images/jasmine-passing-specs.png" class="img-responsive center-block" />

Running the jasmine tests headless for CI requires some additional help. We leveraged guard-jasmine which uses [phantomjs](http://phantomjs.org/) & [therubyracer](https://github.com/cowboyd/therubyracer) to perform headless testing.

### Migration from Javascript to CoffeeScript

Our migration path to CoffeeScript was to start with a few small examples and then move incrementally. When changes would occur in our javascript files in features, it would be the job of the developer to convert the file and any tests over to CoffeeScript. We utilized tools like [js2coffee](http://js2coffee.org/) for larger files, but be warned it's not perfect.

### Summary

Setting up our Jasmine testing framework to work seamlessly with the asset pipeline with jasminerice was a major success. CoffeeScript and Jasmine tests are a great combination and make it very easy to understand. For more information on setting up jasminerice check out [this railscast](http://railscasts.com/episodes/261-testing-javascript-with-jasmine-revised) or the [guard jasmine documentation](https://github.com/netzpirat/guard-jasmine#rails-with-the-asset-pipeline-setup).