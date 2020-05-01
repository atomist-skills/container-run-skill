# `atomist/container-run-skill` 

Skill to run Docker containers as reactions to Git pushes.

<!---atomist-skill-readme:start--->

# What it's useful for

Run any command in a Docker image, triggered by pushes to repositories. Run your favorite linter, code formatter, code scanner or any other task that you want to run in response to a push.
    
# Before you get started

Connect and configure this integration:

* **GitHub**

The **GitHub** integration must be configured in order to use this skill. At least one repository must be selected. 

This skill imposes restrictions on the running Docker containers.  If you would like to know more about resource
limits and quotas, [contact us](mailto:support@atomist.com).

# How to configure

1. **Select the Docker image to run**
    
    ![Docker Image](docs/images/image.png)
    
    This skill can run any public Docker image in response to a Git push.
    
    Enter the complete Docker image name, eg. `ubuntu:latest` or `gcr.io/kaniko-project/executor:v0.19.0`.
    
    Note: Support for running private Docker images is under development. Contact us if you would like to run your own 
    private images.
    
2. **Provide the command to run**
    
    ![Docker Command](docs/images/command.png)
    
    Configure the command and arguments that you want to run inside the container. For example:
    
    `/bin/sh -c "echo $(cd /atm/home && ls -la | wc -l)"`
    
3. **Provide optional environment variables**

    ![Docker Environment Variables](docs/images/env-vars.png)
    
    Specify any environment variables needed for your image and commands to run. The environment variable format is `KEY=VALUE`. For example:
    
    `GIT_URL=https://github.com`
    
4. **Overwrite the working directory**
    
    ![Docker Working Directory](docs/images/working-dir.png)
    
    By default this skill doesn't change the working directory of the container. Use this setting to provide an
    explicit working directory for your container. 
    
    The working directory `/atm/home` contains the cloned sources of the repository you pushed to.

5. **Determine repository scope**

    ![Repository filter](docs/images/repo-filter.png)

    By default, this skill will be enabled for all repositories in all organizations you have connected.

    To restrict the organizations or specific repositories on which the skill will run, you can explicitly choose 
    organization(s) and repositories.

# How to use the Container Run Skill

1. **Review the Docker container contract**

    **Requirements**

    The container skill can use any Docker image that can be pulled from a public Docker registry. There are no 
    requirements for what is in the container.

    **Project**

    The repository will be cloned into `/atm/home` at the SHA of the push that trigger this skill.

    **Exit Code**

    A container that exits with a non-zero exit code will always show as a failed skill execution.

    **Environment Variables**

    The following environment variables are available inside the container:

    - `ATOMIST_WORKSPACE_ID=AZQMH6PO7` - Id of the Atomist workspace
    - `ATOMIST_CORRELATION_ID=<random id generate for the skill invocation>` - Unique execution correlation id
    - `ATOMIST_PAYLOAD=/atm/payload.json` - Pointer to a file containing the triggering event payload
    - `ATOMIST_INPUT_DIR=/atm/input` - Directory that can contain additional input like provider secrets 
    - `ATOMIST_OUTPUT_DIR=/atm/output` - Directory that can be used to store output
    - `ATOMIST_HOME=/atm/home` - Directory containing the cloned repository source files
    - `ATOMIST_TOPIC=<name of PubSub topic to write responses to>` - Name of PubSub topic to write responses to
    - `ATOMIST_STORAGE=<name of Storage bucket to write objects to>` - Name of Storage bucket to write objects to
    - `ATOMIST_GRAPHQL_ENDPOINT=<url for querying the GraphQL API>` - Url to the Atomist GraphQL endpoint

    **Event Payload**

    The event payload that triggered the container to run will be stored in a file referenced by the `ATOMIST_PAYLOAD` 
    environment variable. Here is an example event payload:

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

2. **Configure the skill, set Docker image, command and environment variables** 

3. **Every time you push to a repository, the Docker container will run**

To create feature requests or bug reports, create an [issue in the repository for this skill](https://github.com/atomist-skills/container-run-skill/issues). 
See the [code](https://github.com/atomist-skills/container-run-skill) for the skill.

<!---atomist-skill-readme:end--->

---

Created by [Atomist][atomist].
Need Help?  [Join our Slack workspace][slack].

[atomist]: https://atomist.com/ (Atomist - How Teams Deliver Software)
[slack]: https://join.atomist.com/ (Atomist Community Slack)
