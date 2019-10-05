
const akasha   = require('akasharender');
const { assert } = require('chai');
const fs = require('fs-extra');

const config = require('../config.js');

/* TODO update skeleton to use Bootstrap v4
 */

describe('build site', function() {
    it('should build site', async function() {
        this.timeout(25000);
        let failed = false;
        let results = await akasha.render(config);
        for (let result of results) {
            if (result.error) {
                failed = true;
                console.error(result.error);
            }
        }
        assert.isFalse(failed);
    });
});

describe('check feed', function() {
    it('should have correct rss.xml content', async function() {
        let xml = await fs.readFile('../out/blog/rss.xml', 'utf8');
        assert.exists(xml, 'result exists');
        assert.isString(xml, 'result isString');

        assert.include(xml, '<link>http://blog-skeleton.akashacms.com/blog/index.html</link>');
        assert.include(xml, '<image><url>http://akashacms.com/logo.gif</url>');
        assert.include(xml, '<atom:link href="https://blog-skeleton.akashacms.com/blog/rss.xml"');
        assert.include(xml, '<link>https://blog-skeleton.akashacms.com/blog/2015/11/test-post-2.html</link>');
        assert.include(xml, '<guid isPermaLink="true">https://blog-skeleton.akashacms.com/blog/2015/11/test-post-2.html</guid>');
        assert.include(xml, '<link>https://blog-skeleton.akashacms.com/blog/2015/09/test-post-2.html</link>');
    });
});

describe('check pages', function() {
    it('should have correct home page', async function() {

        let { html, $ } = await akasha.readRenderedFile(config, '/index.html');

        assert.exists(html, 'result exists');
        assert.isString(html, 'result isString');

        assert.include($('head title').html(), 'Blog Home Page');
        assert.include($('head meta[name="pagename"]').attr('content'), 
                'Blog Home Page');
        assert.include($('head meta[name="DC.title"]').attr('content'), 
                'Blog Home Page');
        assert.include($('head meta[name="og:title"]').attr('content'), 
                'Blog Home Page');
        assert.include($('head meta[name="og:url"]').attr('content'), 
                'https://blog-skeleton.akashacms.com/index.html');
        assert.include($('head link[rel="canonical"]').attr('href'), 
                'https://blog-skeleton.akashacms.com/index.html');
        assert.include($('head link[rel="sitemap"]').attr('href'), 
                '/sitemap.xml');

        assert.include($('body header h1').html(), 
                'Example blog/podcast website for AkashaCMS');
        assert.equal($('h2:contains("Blog #1")').length, 1);

        assert.include($('body a[href="blog/2015/11/test-post-1.html"]').html(), 
                'Test Post 1');
        assert.include($('body a[href="blog/2015/09/test-post-2.html"]').html(), 
                'Test Post 2');
        

        assert.equal($('h2:contains("Blog #2")').length, 1);

        assert.include($('body a[href="blog-2/2015/11/test-post-1.html"]').html(), 
                'Test Post 1');
        assert.include($('body a[href="blog-2/2015/11/test-post-2.html"]').html(), 
                'Test Post 2');
        
    });

    it('should have correct blog 1 test post 1', async function() {

        let { html, $ } = await akasha.readRenderedFile(config, 
                '/blog/2015/09/test-post-1.html');

        assert.exists(html, 'result exists');
        assert.isString(html, 'result isString');


        assert.include($('head title').html(), 'Test Post 1');
        assert.include($('head meta[name="pagename"]').attr('content'), 
                'Test Post 1');
        assert.include($('head meta[name="DC.title"]').attr('content'), 
                'Test Post 1');
        assert.include($('head meta[name="og:title"]').attr('content'), 
                'Test Post 1');
        assert.include($('head meta[name="og:url"]').attr('content'), 
            'https://blog-skeleton.akashacms.com/blog/2015/09/test-post-1.html');
        assert.include($('head link[rel="canonical"]').attr('href'), 
            'https://blog-skeleton.akashacms.com/blog/2015/09/test-post-1.html');
        assert.include($('head link[rel="sitemap"]').attr('href'), 
                '/sitemap.xml');

        assert.include($('body header h1').html(), 
                'Example blog/podcast website for AkashaCMS');

        assert.include($('#breadcrumb ol.breadcrumb a[href="../../../index.html"]').html(),
                'Blog Home Page');
        assert.include($('#breadcrumb ol.breadcrumb a[href="index.html"]').html(),
                'Blog index');

        assert.include($('article strong').html(), 'This is a blog teaser');
        assert.include($('article').html(), 'Blog content');

        assert.include($('.blog-prev-next-wrapper .blog-prev-link[href="test-post-2.html"] ').html(),
            'Test Post 2');
        assert.include($('.blog-prev-next-wrapper .blog-next-link[href="../11/test-post-2.html"] ').html(),
            'Test Post 2');
    });

    it('should have correct blog 1 index page', async function() {

        let { html, $ } = await akasha.readRenderedFile(config, 
                '/blog/2015/09/index.html');

        assert.exists(html, 'result exists');
        assert.isString(html, 'result isString');

        assert.include($('head title').html(), 'Blog index for September, 2015');
        assert.include($('head meta[name="pagename"]').attr('content'), 
                'Blog index for September, 2015');
        assert.include($('head meta[name="DC.title"]').attr('content'), 
                'Blog index for September, 2015');
        assert.include($('head meta[name="og:title"]').attr('content'), 
                'Blog index for September, 2015');
        assert.include($('head meta[name="og:url"]').attr('content'), 
            'https://blog-skeleton.akashacms.com/blog/2015/09/index.html');
        assert.include($('head link[rel="canonical"]').attr('href'), 
            'https://blog-skeleton.akashacms.com/blog/2015/09/index.html');
        assert.include($('head link[rel="sitemap"]').attr('href'), 
                '/sitemap.xml');

        assert.include($('body header h1').html(), 
                'Example blog/podcast website for AkashaCMS');

        assert.include($('#breadcrumb ol.breadcrumb a[href="../../../index.html"]').html(),
                'Blog Home Page');
        assert.include($('#breadcrumb ol.breadcrumb a[href="../../index.html"]').html(),
                'Blog index');
        assert.include($('#breadcrumb ol.breadcrumb a[href="../index.html"]').html(),
                'Blog index for 2015');
        assert.include($('#breadcrumb ol.breadcrumb a[href="index.html"]').html(),
                'Blog index for September, 2015');

        assert.include($('a[href="../../rss.xml"] img').attr('src'), 
                '../../../img/rss_button.gif');
        
        assert.include($('a[href="../11/test-post-2.html"] h2').html(), 
                'Test Post 2');
        
        assert.include($('a[href="../11/test-post-1.html"] h2').html(), 
                'Test Post 1');
        
        assert.include($('a[href="test-post-2.html"] h2').html(), 
                'Test Post 2');
        
        assert.include($('a[href="test-post-1.html"] h2').html(), 
                'Test Post 1');
        


    });

    it('should have correct feeds page', async function() {

        let { html, $ } = await akasha.readRenderedFile(config, 
                '/feeds.html');

        assert.exists(html, 'result exists');
        assert.isString(html, 'result isString');

        assert.equal($('#blog-feeds-all').length, 1);
        assert.equal($('#blog-feeds-all a[href="blog/rss.xml"]').length, 1);
        assert.equal($('#blog-feeds-all a[href="blog-2/rss.xml"]').length, 1);
        assert.equal($('#blog-feeds-all img[src="img/rss_button.gif"]').length, 2);

        assert.include($('#blog-feeds-all li:nth-child(1)').html(),
            "AkashaCMS Example Blog: Skeleton blog for use with AkashaCMS");
        assert.include($('#blog-feeds-all li:nth-child(2)').html(),
            "AkashaCMS Example Blog #2: Second Skeleton blog for use with AkashaCMS");
    });
});


describe('documents and index', function() {
    it('should have correct documents', async function() {
        let blogcfg = config.plugin('akashacms-blog-podcast').options.bloglist['news'];
        let documents = await config.plugin('akashacms-blog-podcast').findBlogDocs(config, blogcfg);
        assert.equal(documents.length, 4);
        assert.equal(documents[0].docpath, 'blog/2015/11/test-post-2.html.md');
        assert.equal(documents[1].docpath, 'blog/2015/11/test-post-1.html.md');
        assert.equal(documents[2].docpath, 'blog/2015/09/test-post-2.html.md');
        assert.equal(documents[3].docpath, 'blog/2015/09/test-post-1.html.md');
    });

    it('should have correct index', async function() {
        let blogcfg = config.plugin('akashacms-blog-podcast').options.bloglist['news'];
        let indexes = await config.plugin('akashacms-blog-podcast').findBlogIndexes(config, blogcfg);
        assert.equal(indexes.length, 0);
    });
});

describe('rebase blog', function() {
    it('should render rebased site', async function() {
        this.timeout(25000);
        const config = require('../config-rebased.js');
        
        let failed = false;
        let results = await akasha.render(config);
        for (let result of results) {
            if (result.error) {
                failed = true;
                console.error(result.error);
            }
        }
        assert.isFalse(failed);
    });

    it('should have correct rss.xml content', async function() {
        let xml = await fs.readFile('../out-rebased/blog/rss.xml', 'utf8');
        assert.exists(xml, 'result exists');
        assert.isString(xml, 'result isString');

        assert.include(xml, '<link>http://blog-skeleton.akashacms.com/rebased/to/blog/index.html</link>');
        assert.include(xml, '<image><url>http://akashacms.com/logo.gif</url>');
        assert.include(xml, '<atom:link href="https://blog-skeleton.akashacms.com/rebased/to/blog/rss.xml"');
        assert.include(xml, '<link>https://blog-skeleton.akashacms.com/rebased/to/blog/2015/11/test-post-2.html</link>');
        assert.include(xml, '<guid isPermaLink="true">https://blog-skeleton.akashacms.com/rebased/to/blog/2015/11/test-post-2.html</guid>');
        assert.include(xml, '<link>https://blog-skeleton.akashacms.com/rebased/to/blog/2015/09/test-post-2.html</link>');
    });
});