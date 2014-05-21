---
layout: page
title: A Study in Code
---
{% include JB/setup %}


{% for post in site.posts %}
  <h2><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h2>
  <span>{{ post.date | date_to_string }}</span>
  <hr/>
{% endfor %}
