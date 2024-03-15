export NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN=$(curl http://localhost:$PARAMETERS_SECRETS_EXTENSION_HTTP_PORT/secretsmanager/get -d secretId=${MIXPANEL_SECRET_ID})
node server.js
