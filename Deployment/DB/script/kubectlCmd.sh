#!/usr/bin/env bash

env # show the env variables

# Create the connection with the google cloud account
gcloud components install kubectl
gcloud auth activate-service-account --key-file=./gc-key.json # put your gc-key into the same directory
gcloud container clusters get-credentials $GC_CLUSTER_ID --zone $GC_ZONE --project $GC_PROJECT_ID # will take the information from the .env in the same directory

# Run the kubectl cmd to change the db with the db into the folder dataBase
kubectl exec mongo-0 -- rm -r dumpDBProd.agz
kubectl exec mongo-0 -- mongo api_foodlocal_production --eval "db.dropDatabase()"
kubectl exec mongo-0 -- mongo api_foodlocal_dev --eval "db.dropDatabase()"
kubectl exec mongo-0 -- mongo api_foodlocal_test --eval "db.dropDatabase()"
kubectl cp dumpDBProd.agz mongo-0:/dumpDBProd.agz
kubectl exec mongo-0 -- mongorestore --verbose --gzip --archive=/dumpDBProd.agz
