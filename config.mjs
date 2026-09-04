

'use strict';

import util   from 'node:util';
import akasha from 'akasharender';

import { ThemeBootstrapPlugin } from '@akashacms/theme-bootstrap';
import { BasePlugin } from '@akashacms/plugins-base';
import { BreadcrumbsPlugin } from '@akashacms/plugins-breadcrumbs';
import { BooknavPlugin } from '@akashacms/plugins-booknav';
import { EmbeddablesPlugin } from '@akashacms/plugins-embeddables';
import { BlogPodcastPlugin } from '@akashacms/plugins-blog-podcast';

const config = new akasha.Configuration();

const __dirname = import.meta.dirname;
config.configDir = __dirname;

config
    .addAssetsDir('assets')
    .addLayoutsDir('layouts')
    .addDocumentsDir('documents')
    .addPartialsDir('partials')
    .setRenderDestination('out');

config.rootURL("https://blog-skeleton.akashacms.com");

config
    .use(ThemeBootstrapPlugin)
    .use(BasePlugin, {
        generateSitemapFlag: true
    })
    .use(BreadcrumbsPlugin)
    .use(BooknavPlugin)
    .use(EmbeddablesPlugin)
    .use(BlogPodcastPlugin);

config
    .addStylesheet({
        href: "/style.css"
    });

config.setMahabhutaConfig({
    recognizeSelfClosing: true,
    recognizeCDATA: true
});

config.plugin('@akashacms/plugins-blog-podcast')
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
        matchers: {
            layouts: [ "blog.html.ejs" ],
            rootPath: 'blog/'
        }
    });

config.plugin('@akashacms/plugins-blog-podcast')
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
        matchers: {
            layouts: [ "blog.html.ejs" ],
            rootPath: 'blog-2/'
        }
    });

config.prepare();

export default config;
