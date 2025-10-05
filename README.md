# Blockchain Bank Project Setup

This guide provides step-by-step instructions to set up a Hardhat project for blockchain development on both Windows and Linux.

## Step 1: Install Required Software

### Node.js (Version 16 or higher recommended):
- Download from [https://nodejs.org/](https://nodejs.org/) (get the LTS version).
- Install it (follow the installer prompts). This includes npm (Node Package Manager), which we'll use to install Hardhat.
- **Verify**: Open a terminal/command prompt and run `node -v` and `npm -v`. You should see version numbers.

### VS Code (Free Code Editor):
- Download from [https://code.visualstudio.com/](https://code.visualstudio.com/).
- Install it. We'll use it to write and edit files.
- **Optional**: Install the "Solidity" extension in VS Code (search in the Extensions tab) for syntax highlighting.

### Git (Optional but useful for version control):
- If you don't have it, download from [https://git-scm.com/](https://git-scm.com/) and install.

## Step 2: Set Up a Hardhat Project

We'll create a new project folder and install Hardhat.

### Open a terminal/command prompt.

### Create a project directory:
```
mkdir blockchain-bank
cd blockchain-bank
```
(This makes a folder called "blockchain-bank" and navigates into it.)

### Initialize the project:
```
npm init -y
```
(This creates a package.json file for managing dependencies.)

### Install Hardhat:
```
npm install --save-dev hardhat@2.26.3
```
(This downloads Hardhat. It might take a minute.)

### Set up Hardhat:
```
npx hardhat init
```
- Select "Create a JavaScript project" (or TypeScript if you prefer, but JS is simpler for beginners).
- Accept defaults for the rest (yes to everything).
- This creates folders like `contracts/`, `scripts/`, and `test/`, plus a `hardhat.config.js` file.

## Next Steps
- After setup, you can start writing smart contracts in the `contracts/` folder.
- Use `npx hardhat compile` to compile your contracts.
- Use `npx hardhat test` to run tests.
- For deployment, refer to Hardhat documentation.



contract is deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3
