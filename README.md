# SurveyChain

SurveyChain is a decentralized survey creation and management platform that leverages blockchain technology to provide transparent, secure, and verifiable surveys. This project demonstrates how to manage survey data with a focus on privacy and integrity using a hybrid approach of both on-chain and off-chain storage. It offers survey creators the ability to build custom surveys, collect responses, and review analytics—all while ensuring data privacy through encryption and verifiability through blockchain.

## Features

### Survey Creation
- Create surveys with customizable questions, including multiple-choice, rating scale, fill-in-the-blank, and single-select questions.
- Survey data (title, description, questions, etc.) is stored off-chain, but the integrity of the survey and responses is guaranteed by storing metadata on the blockchain.

### Response Collection
- Users can respond to surveys without needing to interact directly with the blockchain, making it a seamless experience for participants.
- Survey responses are encrypted to ensure privacy and are only revealed based on the survey creator's settings.

### Survey Analytics
- Once a survey is published and responses are collected, detailed analytics and charts are available to visualize the results.
- Survey creators can review responses, but individual answers remain encrypted until the survey is marked as complete or unlocked by the creator.

### Blockchain Integration
- Key survey events (e.g., creation, response submission, closure) are recorded on-chain for verifiability.
- Responses are encrypted and stored off-chain using IPFS, with the encrypted data’s hash stored on-chain, ensuring that the data cannot be tampered with.

### Roles
- **Survey Creators:** Can create, edit (before publishing), and manage surveys. They can also view analytics and unlock responses once the survey closes.
- **Survey Respondents:** Can participate in surveys while remaining anonymous, with their responses being securely encrypted.

## Tech Stack

- **Next.js 14** - React framework used for building the client-side interface and handling server-side rendering.
- **GraphQL/Apollo** - Used for querying and managing survey data between the client and server.
- **Prisma ORM** - Interface for interacting with the database, handling both survey data and user accounts.
- **PostgreSQL** - Primary database for storing survey metadata, user accounts, and other core data.
- **IPFS** - Off-chain storage solution for survey responses, ensuring decentralized and secure storage.
- **Blockchain (L2)** - Handles key verifications of survey events, such as creation and submission of responses.

## How It Works

### Survey Lifecycle
- **Create a Survey**: Users can create surveys with customizable questions, which are stored in the database.
- **Respond to Surveys**: Participants respond to surveys, with responses being encrypted and stored off-chain. A hash of the response is stored on-chain for verification.
- **Analyze Responses**: Once a survey is closed, the creator can unlock the encrypted responses, review analytics, and verify response integrity on-chain.

### Privacy and Security
- **Zero-Knowledge Encryption**: All responses are encrypted and can only be decrypted when the survey is complete or when authorized by the survey creator.
- **Blockchain Verification**: Metadata (like the survey ID, creator ID, and response hashes) is stored on-chain, ensuring data integrity and verifiability without exposing sensitive user data.

### Future Improvements
- Advanced privacy with full zero-knowledge proof implementation.
- Enhancements to survey creation UX.
- Additional analytics and reporting features for survey creators.
