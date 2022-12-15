# added by wenyi yu

## overview
The base code of this project is generated using online version of swagger editor with the swagger file provided with the problem.

Mongodb is utilized as the datebase for this project.

Prometheus is utilizied as monitering.

1. `/` (root) endpoint provide the current date (UNIX epoch) and version.
2. /v1/tools/lookup endpoint look up the Domain
3. `/v1/tools/validate endpoint validates ipv4 format


## how to run
This program is fully dockerized.run the following command:
      docker-compose up -d --build
