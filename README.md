# Lab 5
Members of this Group: `Maximilian Bleier`, `Nikola Radulovic`, `Raphael Unger` and `Alexander Prix`

This lab includes the creation of an Azure Web App for Containers for a developoment and production environment. A Node.js application is build as a Docker image and deployed to the Docker Registry, from which the Azure Web Apps pull and deploy this image.

This repository includes the creation of an `Azure Web App` using a `development` and `production` environment. Therefore, 
a `Node.js` application is built as a Docker image and deployed to the Docker Registry, from which the Azure Web Apps pull and deploy this image.

## Implementation
The `Node.js` application written in `Express.js` is located in `index.js` and the corresponding tests with `Jest` in `test/index.test.js`.

### Docker file
In order to build a Docker image for the application, a `Dockerfile` was created, which runs `npm install` to build the application and exposes the port `3000` on which the application listens.

### Github Actions pipelines
Both pipelines, one for the `main` branch and another for the `release` branch are located in `.github/workflows` with the same name as the related branch.
The following steps are carried out on each commit or pull request:
1. Checking out the code
2. Set up Node.js with its latest version
3. Install all necessary dependencies
4. Run the tests
5. Build the docker image with either the :development or the :latest tag based on the GitHub Action
6. Log in to Docker Hub with a username and access token provided as secrets in the GitHub Repository
7. Tag and Push the Docker image to Docker Hub

After these steps, the Docker Repository now contains the latest image and tags for `lab5_app`.

The permissions for the `release` branch are set with a branch rule directly in the GitHub Repository settings.

### Azure Web Apps for Containers
As of the web apps, two Azure Web Apps for Containers were created, which are directly connected to the Docker Repository with the `lab5_app` image. Based on the environment either `:development` or `:latest` is pulled. Furthermore, after an image tag is updated, the corresponding web application is triggered to pull the latest image with a web hook provied from the Azure Web App for Containers.

## How to deploy
1. Make changes (duh)
2. Push the changes to the main branch. Those changes should be visible on the Development Link of this project.
3. Push the changes from main to release branch
4. After waiting for the appropriate Github Action to finish, changes should be visible on the Production Site.

## Links
### Docker
This link leads to the Docker image inside the Registry :
- [lab5_app](https://hub.docker.com/repository/docker/raphaelunger/lab5_app/tags)

### Azure Web Apps
- [Development](https://lab5-dev-ayg3c8f0cvetgebw.canadacentral-01.azurewebsites.net/)
- [Production](https://lab5-prod-adfnerh3augngegm.canadacentral-01.azurewebsites.net/)

### Routes
You can send a string to `/checksum` in order to generate the corresponding checksum for it. 

#### Example Data
``` JSON
{
    'input': 'HelloWorld'
}
```
results in
`1a2fa200`

## Github Actions
### Finished pipeline
![Finished Pipeline](./Showcase/github_action_success.png)

### Release workflow
![Release workflow](./Showcase/github_action_failed.png)