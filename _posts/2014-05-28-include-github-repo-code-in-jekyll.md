---
title: Including Github Repo Code in Jekyll
layout: post
tags : [github, jekyll, liquid]
summary: A Jekyll plugin to enable including samples of code from a Github repository.
---

Including code references in technical blogs is important to explain and demonstrate coding concepts. The typical way to do this is to embed [Gists](https://gist.github.com/) into your posts. However, I am writing several posts that all reference a public Github repo, not snippets that are inside Gists. Also, being able to reference code in a larger code base can help provide more context if necessary. Taking inspiration from an existing [Liquid Gist Tag](http://blog.55minutes.com/2012/03/liquid-gist-tag-for-jekyll/), I created the Github Sample Tag.

The [Github Sample Tag](https://github.com/bwillis/jekyll-github-sample) is a Jekyll tag that allows bloggers to include a sample of a file hosted on Github. Here is an example of it in use:

{% github_sample_ref /bwillis/jekyll-github-sample/b989363c0432cefacd10a66943f0f04cdd0b6839/github_sample_tag.rb %}
{% highlight ruby linenos %}
{% github_sample /bwillis/jekyll-github-sample/blob/b989363c0432cefacd10a66943f0f04cdd0b6839/github_sample_tag.rb 30 39 %}
{% endhighlight %}

This example is actually 3 different tags in play. The first is the `github_sample`, which on it's own just retrieves a portion of a raw github file:

<pre>
{% github_sample /bwillis/jekyll-github-sample/blob/b989363c0432cefacd10a66943f0f04cdd0b6839/github_sample_tag.rb 30 39 %}
</pre>

The second is the builtin `highlight` block with the appropriate language format set:

{% highlight ruby linenos %}
{% github_sample /bwillis/jekyll-github-sample/blob/b989363c0432cefacd10a66943f0f04cdd0b6839/github_sample_tag.rb 30 39 %}
{% endhighlight %}

The third piece is the `github_sample_ref` tag, which can be used on it's own like so:

{% github_sample_ref /bwillis/jekyll-github-sample/b989363c0432cefacd10a66943f0f04cdd0b6839/github_sample_tag.rb %}

I'll use the Github Sample from the readme to show the syntax:

{% github_sample_ref /bwillis/jekyll-github-sample/blob/4cfc8108f5bdacb7383877cc5b14883e0770237f/README.md %}
<div class="highlight">
<pre>{% github_sample /bwillis/jekyll-github-sample/blob/4cfc8108f5bdacb7383877cc5b14883e0770237f/README.md 34 37 %}</pre>
</div>


<div class="alert alert-info">
<b>Note</b> It is best to use the link to the file with a commit hash in it. This will avoid updating code samples in your blog on each deployment.
</div>
