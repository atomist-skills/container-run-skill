# `atomist/container-run-skill`

<!---atomist-skill-readme:start--->

Atomist Skill to run Docker containers on pushes to Git repositories.

## Configuration 

This generic skill provides a way to run any Docker image on pushes to a repository.

## Contract

### Requirements

The container skill can use any Docker image that can be pulled from a public Docker registry.

There are no requirements in terms of what is inside the container!

### Project

The Git project will be cloned into `/atm/home` at the SHA of the push that trigger this container skill.

### Exit Code

A container that exits with a non-zero exit code will always fail the skill it is executing! 0 exit code and 
no `ATOMIST_RESULT` file (see below) will result in a successful execution. 

### Env Vars

The following environment variables are available inside the container:

    ATOMIST_WORKSPACE_ID=AZQMH6PO7
    ATOMIST_VERSION=1.0.0
    ATOMIST_REPO=berlin-5
    ATOMIST_BRANCH=master
    ATOMIST_SLUG=atomist-playground/berlin-5
    ATOMIST_OWNER=atomist-playground
    ATOMIST_INPUT_DIR=/atm/input
    ATOMIST_RESULT=/atm/output/result.json
    ATOMIST_GOAL=/atm/input/goal.json
    ATOMIST_SHA=950be97c7ffecc803f51bf410f105aa9924cd6b0
    ATOMIST_OUTPUT_DIR=/atm/output
    ATOMIST_PROJECT_DIR=/atm/home
    PWD=/atm/home

A couple of the env vars are worth exploring, the others are self-explanatory I hope:

- `ATOMIST_INPUT_DIR` - directory location on where input documents will be stored
- `ATOMIST_OUTPUT_DIR` - directory location on where output documents should be written to
- `ATOMIST_GOAL` - a pointer to the location of the serialised SdmGoal event
- `ATOMIST_RESULT` - a pointer to a file that can contain a serialised version of `ExecuteGoalResult` to indicate the result of the goal execution

### Event Payload

The event payload that triggered the container to run, will be stored in a file referenced by the `ATOMIST_GOAL` 
env var. Here is an example structure of that event payload:

    {
      "externalKey": "sdm/atomist/0-code/self-building-container-echo#selfBuildingContainer.ts:51#sdm:1",
      "description": "Working: echo",
      "push": {
        "after": {
          "author": {
            "emails": [
              {
                "address": "cd@atomist.com"
              }
            ],
            "login": "cdupuis",
            "name": "Christian Dupuis",
            "person": {
              "chatId": {
                "chatTeam": {
                  "id": "T7GMF5USG"
                },
                "screenName": "cd"
              },
              "emails": [
                {
                  "address": "cd@atomist.com"
                }
              ],
              "forename": "Christian",
              "gitHubId": {
                "login": "cdupuis"
              },
              "name": "Christian Dupuis",
              "surname": "Dupuis"
            }
          },
          "committer": {
            "emails": [
              {
                "address": "cd@atomist.com"
              }
            ],
            "login": "cdupuis",
            "name": "Christian Dupuis",
            "person": {
              "chatId": {
                "chatTeam": {
                  "id": "T7GMF5USG"
                },
                "screenName": "cd"
              },
              "emails": [
                {
                  "address": "cd@atomist.com"
                }
              ],
              "forename": "Christian",
              "gitHubId": {
                "login": "cdupuis"
              },
              "name": "Christian Dupuis",
              "surname": "Dupuis"
            }
          },
          "image": null,
          "images": [],
          "message": "Update README.md",
          "sha": "950be97c7ffecc803f51bf410f105aa9924cd6b0",
          "tags": [],
          "url": "https://github.com/atomist-playground/berlin-5/commit/950be97c7ffecc803f51bf410f105aa9924cd6b0"
        },
        "before": {
          "committer": {
            "login": "cdupuis",
            "person": {
              "chatId": {
                "chatTeam": {
                  "id": "T7GMF5USG"
                },
                "screenName": "cd"
              },
              "emails": [
                {
                  "address": "cd@atomist.com"
                }
              ],
              "forename": "Christian",
              "gitHubId": {
                "login": "cdupuis"
              },
              "name": "Christian Dupuis",
              "surname": "Dupuis"
            }
          },
          "message": "Update README.md",
          "sha": "3ff73e363b82f0a45df33d3b23522bed33770a35",
          "url": "https://github.com/atomist-playground/berlin-5/commit/3ff73e363b82f0a45df33d3b23522bed33770a35"
        },
        "branch": "master",
        "commits": [
          {
            "author": {
              "login": "cdupuis",
              "name": "Christian Dupuis",
              "person": {
                "chatId": {
                  "chatTeam": {
                    "id": "T7GMF5USG"
                  },
                  "screenName": "cd"
                },
                "emails": [
                  {
                    "address": "cd@atomist.com"
                  }
                ],
                "forename": "Christian",
                "gitHubId": {
                  "login": "cdupuis"
                },
                "name": "Christian Dupuis",
                "surname": "Dupuis"
              }
            },
            "message": "Update README.md",
            "sha": "950be97c7ffecc803f51bf410f105aa9924cd6b0",
            "timestamp": "2019-10-31T10:25:26+01:00",
            "url": "https://github.com/atomist-playground/berlin-5/commit/950be97c7ffecc803f51bf410f105aa9924cd6b0"
          }
        ],
        "id": "T7GMF5USG_950be97c7ffecc803f51bf410f105aa9924cd6b0_master",
        "repo": {
          "channels": [
            {
              "channelId": "CPJVBUB5G",
              "id": "T7GMF5USG_CPJVBUB5G",
              "name": "berlin-5",
              "team": {
                "id": "T7GMF5USG"
              }
            }
          ],
          "defaultBranch": "master",
          "id": "T7GMF5USG_github.com_atomist-playground_218357763",
          "name": "berlin-5",
          "org": {
            "id": "T7GMF5USG_atomist-playground_github.com",
            "owner": "atomist-playground",
            "ownerType": "organization",
            "provider": {
              "apiUrl": "https://api.github.com/",
              "providerId": "zjlmxjzwhurspem",
              "providerType": "github_com",
              "url": "https://github.com/"
            }
          },
          "owner": "atomist-playground",
          "url": "https://github.com/atomist-playground/berlin-5"
        },
        "timestamp": "2019-10-31T09:25:27.453Z"
      },
      "goalSetId": "42519805-a570-4edc-8376-f2c6a9023eb4",
      "preApproval": null,
      "preConditions": [
        {
          "environment": "0-code",
          "name": "Build atomist-playground/echo-goal",
          "uniqueName": "self-building-container-echo#selfBuildingContainer.ts:51#sdm:0"
        }
      ],
      "uniqueName": "self-building-container-echo#selfBuildingContainer.ts:51#sdm:1",
      "name": "echo",
      "goalSet": "plan, echo build, echo",
      "signature": "Z0ZKnW9j94dEie4XpTrQjcufZ8lw5a7GmS7fC9ctrw/pBpJWgc0ziLF6/j5xARXR8kWf0PQtx6H2WVNXMY+TX12WQeAWJpQ9IznLtRsMhu4Xe5yh8H5Lg8sGAeduvgrToMctkeyuEDC6r7DH8OuhU43qAWRorhFemRnjOEV5i7YNUFmWvrWOTt0aaM1MNzFFm9AYru/khO/1T/xA9ELt4Nn0DQbH3twyY4TKwPDp4T+kuof6SMHxxUlFmBjDDUPRTOmU1YxL+WwcdL09jeO3BeRwVmJKyxAPLwftXPXXL7BhmZmR/xSiF6YV9McIDQjxSF5fmQ3CCNkvRQO37B41jw==",
      "externalUrl": null,
      "phase": null,
      "state": "in_process",
      "ts": 1572513953969,
      "fulfillment": {
        "method": "sdm",
        "name": "self-building-container-docker-echo#selfBuildingContainer.ts:51"
      },
      "url": "https://app.atomist.com/workspace/T7GMF5USG/logs/atomist-playground/berlin-5/950be97c7ffecc803f51bf410f105aa9924cd6b0/0-code/self-building-container-echo%23selfBuildingContainer.ts%3A51%23sdm%3A1/42519805-a570-4edc-8376-f2c6a9023eb4/a122ad1b-a55e-40b8-869c-16acf869e547",
      "externalUrls": [],
      "provenance": [
        {
          "channelId": null,
          "correlationId": "a122ad1b-a55e-40b8-869c-16acf869e547",
          "name": "RequestDownstreamGoalsOnGoalSuccess",
          "registration": "@atomist/repository-sdm",
          "ts": 1572513953969,
          "userId": null,
          "version": "0.1.0"
        },
        {
          "channelId": null,
          "correlationId": "a122ad1b-a55e-40b8-869c-16acf869e547",
          "name": "SetGoalsOnPush",
          "registration": "@atomist/repository-sdm",
          "ts": 1572513931685,
          "userId": null,
          "version": "0.1.0"
        }
      ],
      "error": null,
      "environment": "0-code",
      "repo": {
        "name": "berlin-5",
        "owner": "atomist-playground",
        "providerId": "zjlmxjzwhurspem"
      },
      "version": 4,
      "preApprovalRequired": false,
      "branch": "master",
      "descriptions": {
        "waitingForApproval": "Approval required: Complete: echo",
        "planned": "Planned: echo",
        "completed": "Complete: echo",
        "skipped": "Skipped: echo",
        "canceled": "Canceled: echo",
        "stopped": "Stopped: echo",
        "waitingForPreApproval": "Start required: echo",
        "inProcess": "Working: echo",
        "requested": "Ready: echo",
        "failed": "Failed: echo"
      },
      "parameters": "{\"registration\":{\"containers\":[{\"name\":\"echo\",\"git\":\"atomist-playground/echo-goal@master\",\"args\":[\"hello cd\"],\"image\":\"atomistplayground/echo-goal:011b543dbbed4f31377ff6e142314700377beb43\"}]}}",
      "retryFeasible": false,
      "approvalRequired": false,
      "sha": "950be97c7ffecc803f51bf410f105aa9924cd6b0",
      "approval": null,
      "data": null
    }

### Result

Optionally the skill can write a result to a file referenced by the `ATOMIST_RESULT` env var. 
Here is an example payload:

    {
        "SdmGoal": {
            
            "state": "waiting_for_approval",
            "phase": "goal approval is required",
            "description": "please approve the goal",
            "externalUrls": [
                {
                    "label": "Detail",
                    "url": "https://some-fancy-link-to-an-external-system.com"
                }
            ],
    
            "push": {
                "after": {
                    "images": [
                        {
                            "imageName": "atomist/${push.repo.name}:${push.after.sha}"
                        }
                    ],
    				version": "1.0.0"
                }
            }
        }
    }

- `state`: any valid goal state
- `phase`: free string to indicate the phase of the goal
- `description`: description of the goal
- `externalUrls`: link and labels for external urls
- `push.after.images[].imageName`: Sets the docker image name on the after commit in the graph
- `push.after.version`: Sets the SdmVersion in the graph

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

