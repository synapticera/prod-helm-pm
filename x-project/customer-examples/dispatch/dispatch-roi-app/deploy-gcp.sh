#!/bin/bash

# Deploy Dispatch ROI App to Google Cloud Run

set -e

# Configuration
PROJECT_ID="your-gcp-project-id"  # UPDATE THIS
SERVICE_NAME="dispatch-roi-app"
REGION="us-central1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "🚀 Deploying Dispatch ROI App to Google Cloud Run"
echo ""
echo "📋 Configuration:"
echo "   Project: ${PROJECT_ID}"
echo "   Service: ${SERVICE_NAME}"
echo "   Region: ${REGION}"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI not found. Please install it first:"
    echo "   https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if project ID is set
if [ "$PROJECT_ID" == "your-gcp-project-id" ]; then
    echo "❌ Please update PROJECT_ID in deploy-gcp.sh with your actual GCP project ID"
    exit 1
fi

# Set the project
echo "📌 Setting GCP project..."
gcloud config set project ${PROJECT_ID}

# Build the Docker image
echo "🏗️  Building Docker image..."
docker build -t ${IMAGE_NAME} .

# Push to Google Container Registry
echo "📤 Pushing image to Google Container Registry..."
docker push ${IMAGE_NAME}

# Deploy to Cloud Run
echo "🌐 Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1

# Get the URL
echo ""
echo "✅ Deployment complete!"
echo ""
URL=$(gcloud run services describe ${SERVICE_NAME} --region ${REGION} --format 'value(status.url)')
echo "🌍 Your app is live at:"
echo "   ${URL}"
echo ""
echo "💡 Share this URL to give anyone access to the full interactive app!"
