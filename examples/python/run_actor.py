"""Python - official apify-client."""
import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])
run = client.actor("data_foundry/review-scraper").call(run_input={
    "playApps": [
        "com.whatsapp"
    ],
    "plugins": [
        "woocommerce"
    ],
    "alertOnNegativeOnly": true
})
print("dataset:", run["defaultDatasetId"])
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)
