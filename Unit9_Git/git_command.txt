1. Installation

git --version
https://git-scm.com/downloads

2. Configuration

git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"

3. Initialization

mkdir GitAdventure
cd GitAdventure
git init

4. Staging and Committing

echo "Embarking on my journey to master Git." > journey.txt
git status
git add journey.txt
git commit -m "Initial commit with journey.txt"
git status

5. Deletion

echo "This file is meant to be deleted." > temp.txt
git add temp.txt
git commit -m "Prepare temp.txt for deletion"
git rm temp.txt
git commit -m "Delete temp.txt"

6. Renaming

git mv journey.txt adventure.txt
echo "My journey evolves into an adventure with Git." > adventure.txt
git add adventure.txt
git commit -m "Rename journey.txt to adventure.txt and update content"

7. Ignoring Files

echo "*.log" > .gitignore
git add .gitignore
git commit -m "Add .gitignore to ignore log files"
touch test.log
git status

8. Diving Deeper

echo "Exploring the depths of Git commands and their powers." >> adventure.txt
git status -s
git add adventure.txt
git commit -m "Update adventure.txt with exploration insights"

9. History and Restoration

git log --oneline --reverse
git restore --source=<commit_id> adventure.txt
git add adventure.txt
git commit -m "Revert adventure.txt to its initial state"