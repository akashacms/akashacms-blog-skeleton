
import { bench, run } from "mitata";
import { createRequire } from 'module';
import * as akasha from 'akasharender';
const require = createRequire(import.meta.url);
const config = require('../config.js');
// const akasha = config.akasha;

await akasha.cacheSetup(config);
await akasha.fileCachesReady(config);

const documents = (await akasha.filecache).documents;
await documents.isReady();

const plugin = config.plugin("@akashacms/plugins-blog-podcast");

const info1 = documents.find('blog/2017/11/test-post-2.html.md');

bench('find-blog-vpath', () => {
    plugin.findBlogForVPInfo(info1);
});

bench('find-blog-docs', async () => {
    await plugin.findBlogDocs(config, plugin.blogcfg('news'), 'news');
});

// await filecache.close();
await akasha.closeCaches();

try {
    await run({
        percentiles: false
    });
} catch (err) { console.error(err); }
