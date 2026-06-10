@echo off
cd /d "%~dp0"
echo Deleting unused original PNGs and source JPEGs...

del /f "src\assets\client1.png"
del /f "src\assets\client2.png"
del /f "src\assets\client3.png"
del /f "src\assets\client4.png"
del /f "src\assets\client5.png"
del /f "src\assets\client6.png"
del /f "src\assets\openart-image_1779075649340_ede57d4d_1779075649781_1bf8fe0d.png"
del /f "src\assets\openart-image_1779076598682_6a5cce3b_1779076599122_65595d51.png"
del /f "src\assets\openart-image_1779297328009_ed8a7f73_1779297329299_fa6d34b4.png"
del /f "src\assets\openart-image_1779367017627_ad6521c1_1779367018687_a2063ffc.png"
del /f "src\assets\openart-image_1779570166997_cb318c5f_1779570167669_8d2b9cc7.png"
del /f "src\assets\openart-image_1779570864245_7809ad7a_1779570864568_0cfe4aae.png"
del /f "src\assets\trainer-gio.png"
del /f "src\assets\trainer-gio edited.jpg"
del /f "src\assets\new photo edited.jpg"
del /f "src\assets\trainer-gio-mobile.webp"

echo Done. Now committing cleanup...
del /f ".git\index.lock" 2>nul
git add -A
git commit -m "Remove 140MB of unused source images"
git push origin main
echo.
echo ALL DONE
pause
