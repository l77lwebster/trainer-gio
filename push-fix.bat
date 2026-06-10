@echo off
cd /d "%~dp0"
del /f ".git\index.lock" 2>nul

echo Force re-indexing changed files...
git rm --cached src/components/About.tsx 2>nul
git rm --cached src/components/Gallery.tsx 2>nul

git add src/components/About.tsx
git add src/components/Gallery.tsx
git add src/components/StickyCTA.tsx
git add src/assets/trainer-gio.webp

git status
git commit -m "Fix truncated About.tsx + smoother animations"
git push origin main
echo.
echo DONE - check Vercel for new deployment
pause
