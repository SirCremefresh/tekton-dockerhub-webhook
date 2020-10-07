# test locally
## Valid
curl -v --header "eventlistener-request-url: /run/TEST_SECRET"  --header "Content-Type: application/json" --request POST --data '{"callback_url":"https://example_callback_url.com","push_data":{"tag":"sample_tag"}, "repository": {"repo_url":"sample_repo_url","repo_name":"sample_repo_name","name":"sample_name","namespace":"sample_namespace","owner":"sample_owner"}}' http://localhost:8080/

## Wrong Secret
curl -v --header "eventlistener-request-url: /run/WRONG_SECRET"  --header "Content-Type: application/json" --request POST --data '{"callback_url":"https://example_callback_url.com","push_data":{"tag":"sample_tag"}, "repository": {"repo_url":"sample_repo_url","repo_name":"sample_repo_name","name":"sample_name","namespace":"sample_namespace","owner":"sample_owner"}}' http://localhost:8080/

## No Eventlistener Header
curl -v --header "Content-Type: application/json" --request POST --data '{"callback_url":"https://example_callback_url.com","push_data":{"tag":"sample_tag"}, "repository": {"repo_url":"sample_repo_url","repo_name":"sample_repo_name","name":"sample_name","namespace":"sample_namespace","owner":"sample_owner"}}' http://localhost:8080/

## Wrong Body
curl -v --header "eventlistener-request-url: /run/TEST_SECRET"  --header "Content-Type: application/json" --request POST --data '{"callback_url":"https://example_callback_url.com","push_data":{"tag":"sample_tag"}, "repository": {"repo_name":"sample_repo_name","name":"sample_name","namespace":"sample_namespace","owner":"sample_owner"}}' http://localhost:8080/
curl -v --header "eventlistener-request-url: /run/TEST_SECRET"  --header "Content-Type: application/json" --request POST --data '{"callback_url":"https://example_callback_url.com","push_data":{"tag":234}, "repository": {"repo_url":"sample_repo_url","repo_name":"sample_repo_name","name":"sample_name","namespace":"sample_namespace","owner":"sample_owner"}}' http://localhost:8080/
curl -v --header "eventlistener-request-url: /run/TEST_SECRET"  --header "Content-Type: application/json" --request POST http://localhost:8080/
curl -v --header "eventlistener-request-url: /run/TEST_SECRET"  --header "Content-Type: application/json" --request POST --data '' http://localhost:8080/



# Sample Request from tekton pipeline
replace __key__ with real key  

{
  host: 'tekton-dockerhub-webhook.tekton-dockerhub-webhook.svc',
  'user-agent': 'python-requests/2.22.0',
  'transfer-encoding': 'chunked',
  accept: '*/*',
  'accept-encoding': 'gzip, deflate',
  'content-type': 'application/json',
  'eventlistener-request-url': '/run/__key__',
  'x-forwarded-for': '10.42.0.1',
  'x-forwarded-host': 'dockerhub-webhook.bmw12.ch',
  'x-forwarded-port': '443',
  'x-forwarded-proto': 'https',
  'x-newrelic-id': 'UQUFVFJUGwUJVlhaBgY=',
  'x-newrelic-transaction': 'PxQGA1RRAAUIXAdaBlcAUVQCFB8EBw8RVU4aU1oKBgoFXQEHCVBVVVMGBENKQV1SVVwHAAECFTs=',
  'x-real-ip': '10.42.0.1',
  'x-request-id': '254686793e181a258d9a1312c196e8d6',
  'x-scheme': 'https'
}
POST
/
{
"push_data": {
    "pushed_at": 1602013419, 
    "images": [], 
    "tag": "f378d57ecc085091aa4b5a84fd63436002cc5b6b", 
    "pusher": "donatowolfisberg"
}, 
"callback_url": "https://registry.hub.docker.com/u/donatowolfisberg/sample-application-backend/hook/24f0fegbh05i444fif30cec35a03ijcji/", 
"repository": {
    "status": "Active", 
    "description": "", 
    "is_trusted": false, 
    "full_description": "", 
    "repo_url": "https://hub.docker.com/r/donatowolfisberg/sample-application-backend", 
    "owner": "donatowolfisberg", 
    "is_official": false, 
    "is_private": true, 
    "name": "sample-application-backend", 
    "namespace": "donatowolfisberg", 
    "star_count": 0, 
    "comment_count": 0, 
    "date_created": 1601811809, 
    "dockerfile": "FROM node:14-alpine\n\nWORKDIR /usr/src/app\n\nCOPY . .\nEXPOSE 8080\n\nCMD [ \"node\", \"index.ts\" ]\n", 
    "repo_name": "donatowolfisberg/sample-application-backend"
}
}
