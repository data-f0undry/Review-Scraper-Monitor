// JavaScript / TypeScript - official apify-client
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor('data_foundry/review-scraper').call({
    "playApps": [
        "com.whatsapp"
    ],
    "plugins": [
        "woocommerce"
    ],
    "alertOnNegativeOnly": true
});
console.log('dataset:', run.defaultDatasetId);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => console.log(item));
