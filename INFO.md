Run any command in a Docker image, triggered by activity on your Git
repositories or chat command. For example, you can run your favorite linter,
code formatter, or code scanner in response to a push or send your new team
members welcome messages when they join certain channels in Slack or Microsoft
Teams.

1. **[Review the Docker container contract and available triggers](https://github.com/atomist-skills/container-run-skill/blob/master/docs/CONTRACT.md)**

1. **Configure the skill, set Docker image, command and environment variables**

1. **Every time you push to a repository, the Docker container will run**

To create feature requests or bug reports, create an
[issue in the repository for this skill](https://github.com/atomist-skills/container-run-skill/issues).
See the [code](https://github.com/atomist-skills/container-run-skill) for the
skill.

---

Creating consistent, reliable Docker builds across all your repositories can be
a pain. This skill greatly simplifies that process by standardizing your Docker
build configuration across all your repositories. No more hacky build scripts
copied from repository to repository, no more enabling builds one at a time, no
more setting up a Docker daemon and environment variables, just consistent,
reliable Docker builds every time. All you have to worry about if your
Dockerfile.

This skill uses
[kaniko](https://github.com/GoogleContainerTools/kaniko#readme "kaniko - Build Images In Kubernetes")
to build container images from your Dockerfiles and push them to your Docker
registry. Container image builds can be triggered by pushes of commits and/or
tags to a GitHub repository. The code associated with the commit or tag is
checked out and the container image is built using the Dockerfile. Once the
build is complete, the container image is pushed to your configured Docker
registry.

-   Reliable, consistent builds on every push
-   Pull and push container images from multiple Docker registries
-   Automatic image naming and tag creation
-   Easily customize the Docker build to your needs
-   GitHub commit check indicates success of failure of build

### Build Docker images on every push

![Docker build on push](docs/images/docker-build.png)

### Push Docker images to Docker Hub

![Push images to Docker Hub](docs/images/docker-hub.png)

### GitHub commit check

![GitHub commit check](docs/images/github-commit-check.png)
