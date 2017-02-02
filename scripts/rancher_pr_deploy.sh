#!/usr/bin/env bash

install_rancher() {
  RANCHER_CLI_VERSION='v0.4.1'
  wget -qO- https://github.com/rancher/cli/releases/download/${RANCHER_CLI_VERSION}/rancher-linux-amd64-${RANCHER_CLI_VERSION}.tar.gz | tar xvz -C /tmp
  mv /tmp/rancher-${RANCHER_CLI_VERSION}/rancher /usr/local/bin/rancher
  chmod +x /usr/local/bin/rancher
  rm -r /tmp/rancher-${RANCHER_CLI_VERSION}
}

RANCHER_STACK_NAME=$(sh ../docker-style-name.sh)

if [[ -n "$TRAVIS" ]]; then

  echo "Travis detected"

  # IF PULL REQUEST
  if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then

    install_rancher()

    curl -s https://raw.githubusercontent.com/nhsuk/nhsuk-rancher-templates/master/templates/c2s-pharmacy-finder/0/docker-compose.yml  -o docker-compose.yml
    curl -s https://raw.githubusercontent.com/nhsuk/nhsuk-rancher-templates/master/templates/c2s-pharmacy-finder/0/rancher-compose.yml -o rancher-compose.yml

    touch answers.txt
    echo -n "" > answers.txt

    {
      echo "traefik_domain=dev.c2s.nhschoices.net"
      echo "c2s_docker_image_tag=pr-${TRAVIS_PULL_REQUEST}"
      echo "nearbyservices_docker_image_tag=latest"
      echo "splunk_hec_endpoint=https://splunk-collector.cloudapp.net:8088"
      echo "splunk_hec_token=${SPLUNK_HEC_TOKEN}"
      echo "hotjar_id=265857"
      echo "google_id=UA-67365892-5"
      echo "webtrends_id=dcs222rfg0jh2hpdaqwc2gmki_9r4q"
    } >> answers.txt

    rancher -w --environment "${RANCHER_ENVIRONMENT}" up --pull --upgrade -d --stack "${RANCHER_STACK_NAME}" --env-file answers.txt

    # SLACK NOTIFICATION
    SLACK_MSG="C2S Pull request ${TRAVIS_PULL_REQUEST} deployed to ${RANCHER_STACK_NAME}.dev.c2s.nhschoices.net"

    curl -X POST --data-urlencode "payload={'text': '$SLACK_MSG'}" $SLACK_HOOK_URL

  fi

fi