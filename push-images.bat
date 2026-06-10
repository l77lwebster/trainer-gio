@echo off
cd /d "%~dp0"
del /f ".git\index.lock" 2>nul
git add src/components/StickyCTA.tsx
git add src/components/Gallery.tsx
git add src/components/About.tsx
git add src/assets/trainer-gio.webp
git commit -m "Smoother mobile animations + new hero photo"
git push origin main
echo.
echo DONE - check Vercel for new deployment
pause
