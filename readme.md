# Grocery Price Comparison POC

## Description
A proof-of-concept (POC) web app that uses Google Gemini (with Google Search grounding) to find the best prices for your weekly grocery shopping in the UK.

## Features
- Enter your grocery list and get AI-generated, grounded price comparisons.
- Results are powered by Google Gemini 2.0 Flash, with real-time web search grounding.
- Source links to supporting websites are shown when available.
- Simple, minimal UI for rapid prototyping.

## Setup
1. Clone this repo.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory with:
   ```
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open your browser to [http://localhost:3000](http://localhost:3000)

## Usage
- Enter a comma-separated grocery list in the web form.
- Submit to get a grounded answer and supporting links from Gemini.

## Docker

You can run this app in a containerized environment using Docker or Docker Compose.

### Using Docker Compose (recommended)
1. Ensure your `.env` file contains your `GEMINI_API_KEY`.
2. Run:
   ```sh
   docker-compose up --build
   ```
3. Visit [http://localhost:3000](http://localhost:3000)

### Using Docker directly
1. Build the image:
   ```sh
   docker build -t grocery-poc .
   ```
2. Run the container:
   ```sh
   docker run --env-file .env -p 3000:3000 grocery-poc
   ```

This will start the app and expose it at [http://localhost:3000](http://localhost:3000).

## Contributing
This is a quick-and-dirty POC. Contributions are welcome for improvements, but for production, add proper security, validation, and error handling!

## License
MIT (or specify your own)