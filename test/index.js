
const akasha   = require('akasharender');
const { assert } = require('chai');

const config = require('../config.js');

/* TODO update skeleton to use Bootstrap v4
 */

describe('build site', function() {
    it('should build site', async function() {
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

        assert.include($('body a[href="/blog/2015/11/test-post-1.html"]').html(), 
                'Test Post 1');
        assert.include($('body a[href="/blog/2015/09/test-post-2.html"]').html(), 
                'Test Post 2');
        

        assert.equal($('h2:contains("Blog #2")').length, 1);

        assert.include($('body a[href="/blog-2/2015/11/test-post-1.html"]').html(), 
                'Test Post 1');
        assert.include($('body a[href="/blog-2/2015/11/test-post-2.html"]').html(), 
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

        assert.include($('#breadcrumb ol.breadcrumb a[href="/index.html"]').html(),
                'Blog Home Page');
        assert.include($('#breadcrumb ol.breadcrumb a[href="/blog/index.html"]').html(),
                'Blog index');
        assert.include($('#breadcrumb ol.breadcrumb a[href="/blog/2015/index.html"]').html(),
                'Blog index for 2015');
        assert.include($('#breadcrumb ol.breadcrumb a[href="/blog/2015/09/index.html"]').html(),
                'Blog index for September, 2015');

        assert.include($('article strong').html(), 'This is a blog teaser');
        assert.include($('article').html(), 'Blog content');

        assert.include($('.blog-prev-next-wrapper .blog-prev-link[href="/blog/2015/09/test-post-2.html"] span').html(),
            'Test Post 2');
        assert.include($('.blog-prev-next-wrapper .blog-next-link[href="/blog/2015/11/test-post-2.html"] span').html(),
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

        assert.include($('#breadcrumb ol.breadcrumb a[href="/index.html"]').html(),
                'Blog Home Page');
        assert.include($('#breadcrumb ol.breadcrumb a[href="/blog/index.html"]').html(),
                'Blog index');
        assert.include($('#breadcrumb ol.breadcrumb a[href="/blog/2015/index.html"]').html(),
                'Blog index for 2015');
        assert.include($('#breadcrumb ol.breadcrumb a[href="/blog/2015/09/index.html"]').html(),
                'Blog index for September, 2015');

        assert.include($('a[href="/blog/rss.xml"] img').attr('src'), 
                '/img/rss_button.gif');
        
        assert.include($('a[href="/blog/2015/11/test-post-2.html"] h2').html(), 
                'Test Post 2');
        
        assert.include($('a[href="/blog/2015/11/test-post-1.html"] h2').html(), 
                'Test Post 1');
        
        assert.include($('a[href="/blog/2015/09/test-post-2.html"] h2').html(), 
                'Test Post 2');
        
        assert.include($('a[href="/blog/2015/09/test-post-1.html"] h2').html(), 
                'Test Post 1');
        


    });
});
