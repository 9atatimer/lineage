# Random Family Tree Generator

This project is a random family tree generator, refactored from an old static page into a modern web tool using Cloudflare Workers.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or later)
- [npm](https://www.npmjs.com/)

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

## Configuration

This project uses a `.env` file to manage environment variables for deployment.

1.  Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```

2.  Open the `.env` file and add your Cloudflare credentials:
    ```
    # Cloudflare Credentials
    CLOUDFLARE_ACCOUNT_ID="your_account_id_here"
    CLOUDFLARE_API_TOKEN="your_api_token_here"
    ```
    You can find your Account ID in the Cloudflare dashboard. You can create an API token in your profile settings under "API Tokens".

    **Important:** The `.env` file is included in `.gitignore` and should not be committed to the repository.

## Local Development

To run the application locally, use the following command:

```bash
npm run dev
```

This will start a local development server, and you can view the application in your browser at the address provided in the output (usually `http://localhost:8787`).

## Testing

To run the unit tests, use the following command:

```bash
npm test
```

## Deployment

To deploy the application to your Cloudflare account, use the following command:

```bash
npm run deploy
```

This command will first build the client-side bundle and then deploy the worker to Cloudflare, using the credentials from your `.env` file.
