# Warpster

Warpster integrates with Airstack, Pinata, and Karma3Labs APIs, offering functionalities to retrieve user details, provide following suggestions, enhance engagement, and collect metrics such as NFT and POAP counts.

# Features

```
-User Details: Fetch user profiles and statistics.
-Following Suggestions: Intelligent suggestions based on followings.
-Engagement Suggestions: Intelligent suggestions based on engagements.
-Following and Engagement Rank: Metrics on following and engagement levels.
-NFT Count: Count of NFTs associated with a user.
-POAP Count: Count of collected POAPs.
-UserData: Extensive user data from Pinata.
```

# Prerequisites

Node.js: Version 18.17.0. Ensure Node.js is installed on your machine. If not, download and install it from Node.js official website.

# Installation

Follow these steps to get your development environment set up:

# Clone the repository:

```
git clone https://github.com/pgagrwl/warpster-backend.git
```

# Navigate to the project directory:

```
cd warpster
```

# Install dependencies:

```
npm i
```

# Configuration

Create a .env file in the project root with your API keys:

```
AIRSTACK_API_KEY=<YOUR_AIRSTACK_API_KEY_HERE>
PINATA_BEARER_TOKEN=<YOUR_PINATA_BEARER_TOKEN_HERE>
```

Replace the placeholders with your actual API keys.

# Running the Application

To start the application, run:

```
npm start
```

The server will start, and you can begin making requests.
