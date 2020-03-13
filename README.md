# `atomist/container-run-skill` 

<!---atomist-skill-readme:start--->

This generic skill provides a way to run any Docker image on pushes to a repository.

## Contract
 
### Requirements

The container skill can use any Docker image that can be pulled from a public Docker registry.

There are no requirements in terms of what is inside the container!

### Project

The Git project will be cloned into `/atm/home` at the SHA of the push that trigger this container skill.

### Exit Code

A container that exits with a non-zero exit code will always fail the skill it is executing!

### Env Vars

The following environment variables are available inside the container:

    ATOMIST_WORKSPACE_ID=AZQMH6PO7
    ATOMIST_CORRELATION_ID=<random id generate for the skill invocation>
    ATOMIST_PAYLOAD=/atm/payload.json
    ATOMIST_INPUT_DIR=/atm/input
    ATOMIST_OUTPUT_DIR=/atm/output
    ATOMIST_HOME=/atm/home
    TOPIC=<name of PubSub topic to write responses to>
    STORAGE=<name of Storage bucket to write objects to>
    GRAPHQL_ENDPOINT=<url for querying the GraphQL API>
    PWD=/atm/home

A couple of the env vars are worth exploring, the others are self-explanatory I hope:

- `ATOMIST_INPUT_DIR` - directory location on where input documents will be stored
- `ATOMIST_OUTPUT_DIR` - directory location on where output documents should be written to

### Event Payload

The event payload that triggered the container to run, will be stored in a file referenced by the `ATOMIST_PAYLOAD` 
env var. Here is an example structure of that event payload:

```
{
  "data": {
    "Push": [
      {
        "after": {
          "author": {
            "login": "ddgenome",
            "person": {
              "chatId": {
                "screenName": "dd"
              },
              "forename": "David",
              "surname": "Dooling"
            }
          },
          "committer": {
            "login": "ddgenome",
            "person": {
              "chatId": {
                "screenName": "dd"
              },
              "forename": "David",
              "surname": "Dooling"
            }
          },
          "message": "Use exact version of automation-client",
          "sha": "c90ea6375787238fff74794a937f7214a3b59135",
          "statuses": [
            {
              "context": "sdm/atomist/atomist-sdm",
              "description": "Atomist Software Delivery Machine goals: all succeeded",
              "state": "success",
              "targetUrl": "https://app.atomist.com/workspace/T29E48P34/goalset/faca2445-3aa5-42ae-988f-207553e01c90"
            }
          ],
          "tags": [
            {
              "name": "1.9.1-1.9-fixes.20200311134607",
              "release": null
            },
            {
              "name": "1.9.1-1.9-fixes.20200311134607+sdm.1904",
              "release": null
            }
          ],
          "url": "https://github.com/atomist/sdm/commit/c90ea6375787238fff74794a937f7214a3b59135"
        },
        "branch": "1.9-fixes",
        "commits": [
          {
            "author": {
              "login": "ddgenome",
              "person": {
                "chatId": {
                  "screenName": "dd"
                },
                "forename": "David",
                "surname": "Dooling"
              }
            },
            "committer": {
              "login": "ddgenome",
              "person": {
                "chatId": {
                  "screenName": "dd"
                },
                "forename": "David",
                "surname": "Dooling"
              }
            },
            "message": "Use exact version of automation-client",
            "sha": "c90ea6375787238fff74794a937f7214a3b59135"
          }
        ],
        "repo": {
          "name": "sdm",
          "org": {
            "provider": {
              "apiUrl": "https://api.github.com/"
            }
          },
          "owner": "atomist",
          "url": "https://github.com/atomist/sdm"
        },
        "timestamp": "2020-03-11T13:44:39.561Z"
      }
    ]
  },
  "extensions": {
    "operationName": "OnPush",
    "query_id": "2bf0ca4d-b575-4dc1-8b00-7591680c53ab",
    "correlation_id": "2461a01c-eda8-4e47-a4ab-eef8ff6003c8",
    "request_id": "e6f1fd80ce235ceb56799bb2b7a47c82"
  }
}
```

## Configuration

The following configuration parameters are available when configuring the skill:

- `image`: the Docker image to run with this skill
- `command`: the optional command including all arguments to be passed to the Docker container
- `env`: a optional list of environment variables to set on the container in the format KEY=VALUE

### Repositories

By default, this skill will be enabled for all repositories in all organizations you have connected. 
To restrict the organizations or specific repositories on which the skill will run, you can explicitly 
choose organization(s) and repositories.

Additionally the skill can be further limited to repositories that have certain files or to pushes
to certain branches.  

<!---atomist-skill-readme:end--->

---

Created by [Atomist][atomist].
Need Help?  [Join our Slack workspace][slack].

[atomist]: https://atomist.com/ (Atomist - How Teams Deliver Software)
[slack]: https://join.atomist.com/ (Atomist Community Slack)

