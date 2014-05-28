---
title: Speeding Up Your Rails Web Site
layout: post
tags : [rails, web, heroku, optimization]
summary: Speeding up your Rails app based on the Yahoo! Best Practices for Speeding Up Your Web Site.
---
{% include JB/setup %}

<div class="alert alert-info">
<b>Hello!</b> This is an in-depth post that will be getting filled in over time. Most of these techniques are available in my project <a href="https://github.com/bwillis/soinformed">SoInformed</a>.
</div>

Optimizing web sites is complex, but necessary topic to understand as web developers to achieve performat web applications. Yahoo! has an excellent reference that explains different ways to speed up your website called <a href="https://developer.yahoo.com/performance/rules.html">Best Practices for Speeding Up Your Web Site</a>. This post will attempt review each best practice and determine how it can be done with Rails.

<h2><a name='num_http' href='#num_http'>Make Fewer HTTP Requests</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#num_http'>source</a>
<p>
  It is optimal to make as few requests to the server when loading pages.
</p>
<p>
  <b>Combined files</b> - Rails attempts to join as many assets together automatically. With the asset pipeline and the application.css and application.js manifest files, in production all javascript and css files are joined into a single file.
</p>
{% highlight ruby %}
// layouts/application.html.erb
<%= stylesheet_link_tag "application", :media => "all" %>
<%= javascript_include_tag "application" %>
{% endhighlight %}
<p>
  <b>CSS Sprites</b> - As for images, there is no default way in Rails that joins image requests together, aka spriting. To do this you need to use a library such as <a href="http://compass-style.org/help/tutorials/spriting/">Compass</a>.
</p>

{% highlight ruby %}
// application.css.scss
@import "logos/*.png";
@include all-logos-sprites;

// some_file.html.erb
<%= link_to '', 'http://foursquare.com', :class => 'logos-foursquare-powered', :target => '_blank' %>
{% endhighlight %}

<p>
 <b>Inline images</b> - This is a way to delivery an image Base64 encoded in a url. The way to achieve this in Rails is to leverage the <a href="https://github.com/rails/sass-rails">sass-rails</a> gem and use the helper <code>asset-data-url</code>.
</p>

{% highlight ruby %}
background-image: asset-data-url($relative-asset-path);
// background-image: url(data:image/png;base64,iVBORw0K);
{% endhighlight %}

<h2><a name='cdn' href='#num_http'>Use a Content Delivery Network (CDN)</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#cdn'>source</a>
<p>
Coming soon...
</p>

<h2><a name='expires' href='#expires'>Add Expires or Cache-Control Header</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#expires'>source</a>
<p>
Coming soon...
</p>

<h2><a name='gzip' href='#gzip'>Gzip Components</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#gzip'>source</a>
<p>
Coming soon...
</p>

<h2><a name='css_top' href='#css_top'>Put Stylesheets at Top</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#css_top'>source</a>
<p>
Coming soon...
</p>

<h2><a name='js_bottom' href='#js_bottom'>Put Scripts at Bottom</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#js_bottom'>source</a>
<p>
Coming soon...
</p>

<h2><a name='css_expressions' href='#css_expressions'>Avoid CSS Expressions</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#css_expressions'>source</a>
<p>
Coming soon...
</p>

<h2><a name='external' href='#external'>Make JavaScript and CSS External</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#external'>source</a>
<p>
Coming soon...
</p>

<h2><a name='dns_lookups' href='#dns_lookups'>Reduce DNS Lookups</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#dns_lookups'>source</a>
<p>
Coming soon...
</p>

<h2><a name='minify' href='#minify'>Minify JavaScript and CSS</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#minify'>source</a>
<p>
Coming soon...
</p>

<h2><a name='redirects' href='#redirects'>Avoid Redirects</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#redirects'>source</a>
<p>
Coming soon...
</p>

<h2><a name='js_dupes' href='#js_dupes'>Remove Duplicate Scripts</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#js_dupes'>source</a>
<p>
Coming soon...
</p>

<h2><a name='etags' href='#etags'>Configure ETags</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#etags'>source</a>
<p>
Coming soon...
</p>

<h2><a name='cacheajax' href='#cacheajax'>Make Ajax Cacheable</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#cacheajax'>source</a>
<p>
Coming soon...
</p>

<h2><a name='flush' href='#flush'>Flush Buffer Early</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#flush'>source</a>
<p>
Coming soon...
</p>

<h2><a name='ajax_get' href='#ajax_get'>Use GET for Ajax Requests</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#ajax_get'>source</a>
<p>
Coming soon...
</p>

<h2><a name='postload' href='#postload'>Postload Components</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#postload'>source</a>
<p>
Coming soon...
</p>

<h2><a name='preload' href='#preload'>Preload Components</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#preload'>source</a>
<p>
Coming soon...
</p>

<h2><a name='min_dom' href='#min_dom'>Reduce the Number of DOM Elements</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#min_dom'>source</a>
<p>
Coming soon...
</p>

<h2><a name='split' href='#split'>Split Components Across Domains</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#split'>source</a>
<p>
Coming soon...
</p>

<h2><a name='iframes' href='#iframes'>Minimize Number of iframes</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#iframes'>source</a>
<p>
Coming soon...
</p>

<h2><a name='no404' href='#no404'>Avoid 404s</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#no404'>source</a>
<p>
Coming soon...
</p>

<h2><a name='cookie_size' href='#cookie_size'>Reduce Cookie Size</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#cookie_size'>source</a>
<p>
Coming soon...
</p>

<h2><a name='cookie_free' href='#cookie_free'>Use Cookie-Free Domains for Components</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#cookie_free'>source</a>
<p>
Coming soon...
</p>

<h2><a name='dom_access' href='#dom_access'>Minimize DOM Access</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#dom_access'>source</a>
<p>
Coming soon...
</p>

<h2><a name='events' href='#events'>Develop Smart Event Handlers</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#events'>source</a>
<p>
Coming soon...
</p>

<h2><a name='csslink' href='#csslink'>Choose <link> Over @import</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#csslink'>source</a>
<p>
Coming soon...
</p>

<h2><a name='no_filters' href='#no_filters'>Avoid Filters</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#no_filters'>source</a>
<p>
Coming soon...
</p>

<h2><a name='opt_images' href='#opt_images'>Optimize Images</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#opt_images'>source</a>
<p>
Coming soon...
</p>

<h2><a name='opt_sprites' href='#opt_sprites'>Optimize CSS Sprites</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#opt_sprites'>source</a>
<p>
Coming soon...
</p>

<h2><a name='no_scale' href='#no_scale'>Do Not Scale Images in HTML</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#no_scale'>source</a>
<p>
Coming soon...
</p>

<h2><a name='favicon' href='#favicon'>Make favicon.ico Small and Cacheable</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#favicon'>source</a>
<p>
Coming soon...
</p>

<h2><a name='under25' href='#under25'>Keep Components Under 25 KB</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#under25'>source</a>
<p>
Coming soon...
</p>

<h2><a name='multipart' href='#multipart'>Pack Components Into a Multipart Document</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#multipart'>source</a>
<p>
Coming soon...
</p>

<h2><a name='emptysrc' href='#emptysrc'>Avoid Empty Image src</a></h2>
<a href='https://developer.yahoo.com/performance/rules.html#emptysrc'>source</a>
<p>
Coming soon...
</p>
