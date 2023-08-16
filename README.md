# Epic MyChart SSO Sandbox with OAuth 2.0 using Next.js and NextAuth

Welcome to the Epic Sandbox project. This project demonstrates how to use MyChart OAuth 2.0 integration and FHIR endpoints to access information. There are practical examples of FHIR endpoints available in this project.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)
- [Demo](#demo)
- [FHIR Implementation Examples](#fhir-implementation-examples)
- [Contributions](#contributions)
- [License](#license)

## Introduction

This repository can be used as a starting point for a MyChart Autho 2.0 project or as a playground project. There is seamless integration into the SMART on FHIR with AutNext.

## Features

- SMART on FHIR OAuth 2.0 authentication flow with Epic MyChart.
- Seamless integration of NextAuth for handling authentication.
- Example API routes showcasing authenticated FHIR endpoints.

## Technologies Used

- **Next.js:** A popular React framework that simplifies server-rendered React applications.
- **NextAuth:** A powerful authentication library for Next.js applications, supporting various authentication providers including OAuth 2.0.
- **OAuth 2.0:** A standard protocol used for secure authorization, enabling SSO and user authentication.
- **Epic MyChart:** An electronic health record portal that provides a patient-centered experience, including secure authentication via OAuth 2.0.

## Getting Started

To get started with the Epic MyChart SSO Sandbox, follow these steps:

1. Clone this repository to your local machine.
2. Install project dependencies using your preferred package manager (`pnpm install`).
3. Configure OAuth 2.0 credentials (see [Configuration](#configuration)).
4. Run the development server (`pnpm dev`).

## Configuration

1. Obtain OAuth 2.0 credentials from your [Epic MyChart developer account](https://fhir.epic.com/Documentation?docId=oauth2).
2. Create .env file and add `EPIC_MYCHART_CLIENT_ID` and `EPIC_MYCHART_CLIENT_SECRET`

## Usage

Once configured, the Epic MyChart SSO Sandbox provides a working example of integrating OAuth 2.0 authentication into a Next.js application. You can extend this sandbox to build your own application, utilizing the provided authentication flow and components.

## Demo

[https://epic-sandbox.vercel.app/](https://epic-sandbox.vercel.app/)

## FHIR Implementation Examples

After a successful authentication, explore the included FHIR implementation examples to interact with health data using the Fast Healthcare Interoperability Resources (FHIR) standard.

## Contributions

Contributions to the Epic MyChart SSO Sandbox are welcome! If you find any issues, have suggestions for improvements, or would like to add new features, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE), allowing you to use, modify, and distribute the code for your own projects.

---

Feel free to explore, learn, and adapt the Epic MyChart SSO Sandbox for your authentication needs. If you have any questions or need assistance, don't hesitate to reach out to the project maintainers or the community. Happy coding!
