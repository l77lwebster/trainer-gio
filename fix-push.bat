@echo off
cd /d "%~dp0"
del /f ".git\index.lock" 2>nul
git add index.html > git-log.txt 2>&1
git commit -m "Remove GA4 placeholder to fix antivirus false positive" >> git-log.txt 2>&1
git push origin main >> git-log.txt 2>&1
echo DONE >> git-log.txt
