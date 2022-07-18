
# Important Information About Project

Once you are done reading this file be sure to go into the following subfolders and read their "README.md"

- react



# Important Scripts

There are many important scripts in the root of this repo. Below are the ones you should focus when you first clone. 

There are videos that go along with these "getting started" procedures and information so be sure to watch those as well.



## one-time-setup.ps1

You only need to run this script 1 time. Be sure to run the script as an Administrator. It will do a few tasks that we need to verify are done at least 1 time.

## build-all.ps1

As the name implies, this will attempt to build or install dependencies on all the applications that it finds in your repo. This may take a few moments.

### React
- will `yarn install`
- verify you have a `.env.development` file
- will `yarn build`

- *will not run site*

### Node
- will `npm instal`
- will babel and other scripts to make sure site can run

### .Net
- will ensure you have a web.config 
- will build the main .sln file which causes all projects in dotnet can build

### Integration Tests

- will `npm instal`
- 

## run-dev-sites.ps1

This script will start up all your environments.

This script will detect your node and .net Api applications and attempt to start them them.

This script will not run any installs on node or react.

The dotnet application will automatically run a restore operation.

- The React site will spawn your browser to configured web site
- The Node app will also spin up a websever that you can ping at: http://localhost:8080/api/ping
- The dotnet app will also spin up a websever that you can ping at: https://localhost:50001/api/ping



## build-run-all.ps1

This script will `build-all.ps1` and `run-dev-sites.ps1`





