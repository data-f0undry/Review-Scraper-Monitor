[![Run on Apify](https://img.shields.io/badge/Run%20on-Apify-141414?logo=apify&logoColor=white&labelColor=141414)](https://apify.com/data_foundry/review-scraper)

# Review Scraper & Monitor

Reviews from 11 public sources in one schema, with a diff of what is new since the last run.

App stores, Steam, WordPress, Chrome Web Store, TrustRadius and review directories each publish reviews in a different shape. This Actor normalises all of them, then compares against the previous run so you get new reviews rather than the whole feed again.

## Features

- 11 sources: App Store, Google Play, Steam, WordPress plugins and themes, Chrome Web Store, TrustRadius, Reviews.io, Feefo, Sitejabber, ResellerRatings
- Rating distribution and negative share per subject
- `newSinceLastRun` and `newNegativeSinceLastRun`
- Webhook alerts, HMAC signed, with an `alertOnNegativeOnly` mode
- A page that shrinks is flagged `suspicious`, never reported as deleted

## Usage

### Input

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `apps` | array | App Store IDs, or objects with `id` and `country`. |
| `playApps` | array | Google Play package names. |
| `steamApps` | array | Steam app IDs. |
| `plugins / themes` | array | WordPress.org slugs. |
| `chromeExtensions` | array | Chrome Web Store extension IDs. |
| `trustradiusProducts` | array | TrustRadius product slugs. |
| `reviewsIoStores / feefoMerchants / sitejabberDomains / resellerRatingsStores` | array | Directory slugs. |
| `maxReviewsPerSource` | integer | Recent reviews per subject (default 100). |
| `alertOnNegativeOnly` | boolean | Only alert on new 1-2 star reviews. |

```json
{
  "playApps": [
    "com.whatsapp"
  ],
  "plugins": [
    "woocommerce"
  ],
  "alertOnNegativeOnly": true
}
```

### Output

```json
{
  "source": "play",
  "subject": "play:com.whatsapp",
  "rating": 4,
  "title": "Great for staying in touch",
  "text": "Works well, calls are clear...",
  "publishedAt": "2026-11-04T09:12:00+00:00"
}
```

## Run it

**Apify Console** - open [data_foundry/review-scraper](https://apify.com/data_foundry/review-scraper), paste the input, click Start.

**API (Python)**

```bash
pip install apify-client
```

```python
from apify_client import ApifyClient

client = ApifyClient("<YOUR_API_TOKEN>")
run = client.actor("review-scraper").call(run_input={"playApps": ["com.whatsapp"], "plugins": ["woocommerce"], "alertOnNegativeOnly": true})
for item in client.dataset(run["default_dataset_id"]).iterate_items():
    print(item)
```

**CLI**

```bash
apify call data_foundry/review-scraper --input-file input.json --output-dataset
```

Or run the included example: `python run_actor.py`.

## Pricing

**$10 per 1,000 subjects scanned** ($0.01 each). Reviews are unlimited - a subject with 20 reviews and one with 2,000 cost the same.

You are not charged for the Apify platform usage, only for the events above. Failed items are not billed.

## Limitations

- The first run is a baseline; diffs start from run two.
- Only recent reviews are collected - this is a monitor, not an archive.
- Trustpilot, G2, Capterra, Etsy and Walmart are not supported: they sit behind bot protection.
- TrustRadius and Feefo can answer 403 from datacenter IPs; use the proxy input.

These are documented deliberately: an Actor that hides its limits generates refund requests.

## Links

- [Actor on Apify](https://apify.com/data_foundry/review-scraper)
- [All Data Foundry Actors](https://apify.com/data_foundry)
- [Issues](https://github.com/data-f0undry/Review-Scraper-Monitor/issues)

## License

Apache-2.0. See [LICENSE](LICENSE).
