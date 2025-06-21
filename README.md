# How to Start Off
Start with cloning into the directory
```console 
git clone https://github.com/Kira188/netflix-clone/
```
## .ENV file management
Create a .env file in the **frontend** folder  
For all keys check whatapp group pinned messages  
Copy paste the keys in the .env file  
Add the path to your .env file which is /frontend/.env in .gitignore which should be in your root dir.  

# How to stage your changes and make local commits
After making changes make sure you add them and commit the changes
> If you wish to stage all changes to commit or add only a certain file
```console 
git add .
git add <Path to File 1> <Path to File 2>...
```
>To check which files are staged use **git status**
> If you wish to remove all staged files or certain staged files
```console 
git reset
git reset <Path to File 1> <Path to File 2>...
```
> To commit the staged files you must commit it with a message
```console
git commit -m "Message for commiting"
```

>Reset Type 1: To uncommit a local commit you must reset back before the commit. If you want to reset back 2 commits just change the number from 1 to 2
```console
git reset HEAD~1
git reset HEAD~2
```
>Reset Type 2: To reset back while deleteing the code u commited. ( If unsure use the above code )
```console
git reset --hard HEAD~1
```
# Pushing Your Commited Code
## **Important** Never rebase a pushed commit you have done. To check if your feature branch is pushed use git branch -a to check if its there. If its still there use git merge instead
> To check your commits you can type **git log**
Always before pushing a commit, pull latest changes and then only push it. Here feature-branch is the branch your working in.
```console
git pull --rebase origin main
git push origin <feature-branch>
```

> Rollback Type 1: To reset a pushed commit in shared git. This version adds a commit on top of your wrong commit.
```console
git revert HEAD
git push origin feature-branch
```
> Rollback Type 2: If you pushed your comit to a local branch only you are using.( If unsure, use the above code ) Here you have to force push with -f.
```console
git reset HEAD~1
git push -f origin feature-branch
```
> Rollback Type 3A: To rollback a commit another idiot made. Check the commit history on the git web page. Copy the hash and if its not a merge commit do.
```console
git revert <Hash that is copied>
```
> Rollback Type 3A: If it is a merge commit just do 
```console
git revert -m 1 <Hash that is copied>
```
# Pulling, Rebasing, Merging, Rebase Conflicts and Merge Conflicts
First you need to pull your code from the origin. To do this create a new branch and pull the code on the that branch.
## Branching
To create a new branch and switch to it
```console
git branch -b <feature-branch>
```
To see local braches and to see all branches (local and remote)
```console
git branch
git branch -a
```

## **Important** Never rebase a pushed commit you have done. To check if your feature branch is pushed use git branch -a to check if its there. If its still there use git merge instead
If your code need to be pushed... you have 2 options before that to rebase or to merge. As much as possible we would like to rebase as it will put branch commits over the main banch making it easy for us to rollback if needed. 




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
