[![image](https://api.codiga.io/project/35798/status/svg)](https://app.codiga.io/hub/project/35798/gitlab-team-dashboard) [![image](https://api.codiga.io/project/35798/score/svg)](https://app.codiga.io/hub/project/35798/gitlab-team-dashboard) [![Azure Static Web Apps CI/CD](https://github.com/huddeldaddel/gitlab-team-dashboard/actions/workflows/azure-static-web-apps-zealous-water-0a5e94103.yml/badge.svg?branch=main)](https://github.com/huddeldaddel/gitlab-team-dashboard/actions/workflows/azure-static-web-apps-zealous-water-0a5e94103.yml)

# GitLab Team Dashboard

The aim of the project is to create a dynamic dashboard for GitLab. This dashboard should display various useful information and switch regularly between different displays. Planned are among others: 

* a visualisation of the status of the build pipelines
* an overview of the oldest merge requests that are still open.

## Hosted version

The latest version can be found at https://gitlab-dashboard.thomas-werner.engineer.

## Security

The dashboard is designed to run entirely in the browser and is not dependent on a backend server. Configuration data - like credentials - and the dashboard data itself are stored in the local storage of the browser. This simplifies the deployment and operation of the dashboard and ensures that sensitive information does not fall into unauthorised hands.

![image](./docs/overview.png)