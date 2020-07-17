# speedwise-platform-app-web

Proof of concept repository for milestones in Speedwise Platform process. It is a web application written in NodeJS to interface with a MATLAB Production Server hosting different tools developed by SME's.

## Getting Started (Development)
1. Use Node Package manager to install dependencies
```bash
npm i
```
2. Duplicate `.env.example` to `.env` and fill in the corresponding fields in the file.

### Linter setup
Because the entire stack is written predominantly in JS, eslint is used to maintain consistency in the code. The settings are stored in the file `/.eslintrc.json`.

Installation for common editors are outlined below:
- [Atom](https://atom.io/packages/linter-eslint)
- [Sublime](https://packagecontrol.io/packages/ESLint)
- [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Local Deployment
#### Server
Initialize the NodeJS express server.

_Note:_ This command must be re-run after any changes are made to pertinent files. Alternatively, the `watch:server` command can be used. Consequently, the server will restart after changes are made in the `/server` folder.
```bash
npm run start:server
```

#### Client
Initialize the NodeJS client.

_Note:_ This command needs to be run only once. It will automatically detect changes in the `/client` folder and make corresponding changes in the `/dist` folder (this is what the web browser is loading).
```bash
npm run watch:client
```

#### Note
- Please refer to `package.json` for a full list of different commands to run with the `npm run <command>` format.
- In the case that you run into issues pulling/pushing, make sure that you stop the above commands. They often times hold files hostage, preventing the system from properly modifying them. This usually only occurs with new files that need to be deleted.

## Production Deployment
1. Connect to the corresponding EC2 (local address http://172.19.3.219)
2. Switch to super user
```bash
sudo su
```
3. Navigate to the GitHub repository.
```bash
cd /var/nodejs/vhosts/https/speedwise-platform-app-web
```
4. Run `git pull` if needed
5. Create or modify the `.env` file based on `.env.example`
6. Run the deployment script
```bash
bash ec2_deploy.sh
```
