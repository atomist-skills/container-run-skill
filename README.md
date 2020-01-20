# `@atomist/container-runner-skill`

Atomist Skill to run Docker containers on pushes to Git repositories.

## Usage

This generic skill provides a goal that can be used with any skill by
referencing it in the `rules` section of the `atomist.yaml`:

```yaml
rules:

  - name: maven
    tests:
      - has_file: pom.xml
    goals:
      - use: '@atomist/container-runner-skill/run'
        parameters:
          image: maven:3.6.3-jdk-8-slim
          command:
            - /bin/sh
          args:
            - -c
            - >-
              mvn
              package
              -B
              -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn
              -Dmaven.repo.local=$ATOMIST_PROJECT_DIR/.m2
        input:
          - classifier: ${repo.owner}/${repo.name}/mvn/cache
        output:
          - classifier: ${repo.owner}/${repo.name}/mvn/cache
            pattern:
              directory: .m2
```

The above example uses this generic Docker container runner to execute `mvn package`
on a repository that has a `pom.xml` file. Additionlly the skill sets up some optional
caching of the Maven artifact repository for fast rebuilds. 

---

Created by [Atomist][atomist].
Need Help?  [Join our Slack workspace][slack].

[atomist]: https://atomist.com/ (Atomist - How Teams Deliver Software)
[slack]: https://join.atomist.com/ (Atomist Community Slack)

