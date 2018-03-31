

'use strict';

const util    = require('util');
const akasha  = require('akasharender');

const config = new akasha.Configuration();

config
    .addAssetsDir('assets')
    .addAssetsDir({
        src: 'node_modules/bootstrap/dist',
        dest: 'vendor/bootstrap'
    })
   .addAssetsDir({
        src: 'node_modules/jquery/dist',
        dest: 'vendor/jquery'
    })
    .addLayoutsDir('layouts')
    .addDocumentsDir('documents')
    .addPartialsDir('partials')
    .setRenderDestination('out');

config.rootURL("https://blog-skeleton.akashacms.com");

config
    .use(require('akashacms-theme-bootstrap'))
    .use(require('akashacms-base'))
    .use(require('akashacms-breadcrumbs'))
    .use(require('akashacms-booknav'))
    .use(require('akashacms-embeddables'))
    .use(require('akashacms-blog-podcast'));

config.plugin("akashacms-base").generateSitemap(config, true);

config
    .addFooterJavaScript({
        href: "/vendor/jquery/jquery.min.js"
    })
    .addFooterJavaScript({
        href: "/vendor/bootstrap/js/bootstrap.min.js"
    })
    .addStylesheet({
        href: "/vendor/bootstrap/css/bootstrap.min.css"
    })
    .addStylesheet({
        href: "/vendor/bootstrap/css/bootstrap-theme.min.css"
    })
    .addStylesheet({
        href: "/style.css"
    });

config.setMahabhutaConfig({
    recognizeSelfClosing: true,
    recognizeCDATA: true
});

config.plugin('akashacms-blog-podcast')
    .addBlogPodcast(config, "news", {
        rss: {
            title: "AkashaCMS Example Blog",
            description: "Skeleton blog for use with AkashaCMS",
            site_url: "http://blog-skeleton.akashacms.com/blog/index.html",
            image_url: "http://akashacms.com/logo.gif",
            managingEditor: 'David Herron',
            webMaster: 'David Herron',
            copyright: '2015 David Herron',
            language: 'en',
            categories: [ "Node.js", "Content Management System", "HTML5", "Static website generator" ]
        },
        rssurl: "/blog/rss.xml",
        rootPath: "blog",
        matchers: {
            layouts: [ "blog.html.ejs" ],
            path: /^blog\//
        }
    });

config.plugin('akashacms-blog-podcast')
    .addBlogPodcast(config, "news-2", {
        rss: {
            title: "AkashaCMS Example Blog #2",
            description: "Second Skeleton blog for use with AkashaCMS",
            site_url: "http://blog-skeleton.akashacms.com/blog-2/index.html",
            image_url: "http://akashacms.com/logo.gif",
            managingEditor: 'David Herron',
            webMaster: 'David Herron',
            copyright: '2015 David Herron',
            language: 'en',
            categories: [ "Node.js", "Content Management System", "HTML5", "Static website generator" ]
        },
        rssurl: "/blog-2/rss.xml",
        rootPath: "blog-2",
        matchers: {
            layouts: [ "blog.html.ejs" ],
            path: /^blog-2\//
        }
    });

config.prepare();

module.exports = config;
