# Deploy to Google Cloud Platform

## Prerequisites

1. **Google Cloud account** with billing enabled
2. **gcloud CLI** installed: https://cloud.google.com/sdk/docs/install
3. **Docker** installed and running

## Quick Deploy

### Step 1: Update Configuration

Edit `deploy-gcp.sh` and set your GCP project ID:
```bash
PROJECT_ID="your-actual-project-id"  # Change this line
```

### Step 2: Authenticate with GCP

```bash
gcloud auth login
gcloud auth configure-docker
```

### Step 3: Deploy

```bash
./deploy-gcp.sh
```

This will:
1. Build a Docker image
2. Push to Google Container Registry
3. Deploy to Cloud Run
4. Give you a public URL

## Result

You'll get a URL like:
```
https://dispatch-roi-app-xxxxx-uc.a.run.app
```

**This URL**:
- ✅ Works for anyone (no login required)
- ✅ Full interactive app with all tabs
- ✅ PDF download works
- ✅ Fast and reliable
- ✅ Auto-scales (only pay for usage)
- ✅ HTTPS included

## Cost

Cloud Run pricing:
- First 2 million requests/month: **FREE**
- After that: ~$0.00002 per request
- Idle time: FREE

For a demo/prototype like this, cost will likely be **$0-5/month**.

## Alternative: Manual Deployment

If you prefer to do it manually:

```bash
# 1. Set project
gcloud config set project YOUR_PROJECT_ID

# 2. Build
docker build -t gcr.io/YOUR_PROJECT_ID/dispatch-roi-app .

# 3. Push
docker push gcr.io/YOUR_PROJECT_ID/dispatch-roi-app

# 4. Deploy
gcloud run deploy dispatch-roi-app \
  --image gcr.io/YOUR_PROJECT_ID/dispatch-roi-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Updating the App

To deploy updates:
1. Make your changes
2. Run `./deploy-gcp.sh` again
3. Same URL, new version deployed!

## Deleting the App

```bash
gcloud run services delete dispatch-roi-app --region us-central1
```
