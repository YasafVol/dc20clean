# Git and NPM Commands Reference

## Git Commands

### Pull latest changes from remote repository:
```bash
git pull origin main
```

Or if you're on a different branch:
```bash
git pull origin <branch-name>
```

### Push commits to remote repository:
```bash
# First, add your changes
git add .

# Commit your changes
git commit -m "Your commit message"

# Push to remote
git push origin main
```

Or for a different branch:
```bash
git push origin <branch-name>
```

### Other useful Git commands:
```bash
# Check status of your repository
git status

# View commit history
git log --oneline

# Create and switch to a new branch
git checkout -b <new-branch-name>

# Switch to existing branch
git checkout <branch-name>

# Pull with rebase (cleaner history)
git pull --rebase origin main
```

## NPM Commands

### Install dependencies:
```bash
npm install
```

### Run the application:
```bash
# Most common - runs the "start" script
npm start

# Run development server (if configured)
npm run dev

# Run build process
npm run build

# Run tests
npm test
```

### Other useful npm commands:
```bash
# Install a new package
npm install <package-name>

# Install as development dependency
npm install --save-dev <package-name>

# Update packages
npm update

# View available scripts
npm run

# Check for outdated packages
npm outdated
```

## Notes
- The exact npm command to run your app depends on how the `package.json` file is configured
- Most common is `npm start`, but some projects use `npm run dev` for development servers
- Always check the project's README.md or package.json for specific run instructions
