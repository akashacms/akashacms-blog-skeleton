---
layout: home-page.html.ejs
title: Blog Home Page
---

# Blog 1 articles - default template

<div id="blog-1-news">
    <div class="well well-sm"><h2>Blog #1</h2></div>
    <blog-news-river maxentries="20" blogtag="news"></blog-news-river>
</div>

# Blog 1 articles - custom template

<div id="blog-1-news">
    <div class="well well-sm"><h2>Blog #1</h2></div>
    <blog-news-river maxentries="20" blogtag="news" template="blog-river-thumbs.html.njk"></blog-news-river>
</div>

# Blog 2 articles - default template

<div id="blog-2-news">
    <div class="well well-sm"><h2>Blog #2</h2></div>
    <blog-news-river maxentries="20" blogtag="news-2"></blog-news-river>
</div>

# Blog 2 articles - custom template

<div id="blog-2-news">
    <div class="well well-sm"><h2>Blog #2</h2></div>
    <blog-news-river maxentries="20" blogtag="news-2" template="blog-river-thumbs.html.njk"></blog-news-river>
</div>
