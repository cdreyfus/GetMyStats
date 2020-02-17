# Usage

The point of this repo is to fix the lack of public API for Crashlytics. For each app in your project, the script will scrap the crash free values and the number of user affected.

# Install dependencies

run ```npm install ```

# Configuration

You must add a .env file in which you'll set your user id/password/apps to examin:
```
GOOGLE_USER = "" 
GOOGLE_PWD = ""
DATA_STUDIO_URL = ""
APP = ""
```

# Run script

run ```npm start```

# TODO

- calculate variations between weekly results
- get total number of users 