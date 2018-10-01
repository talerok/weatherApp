cd ..\other
call download-modules.bat 
cd com\other
call ..\other\build-vendor.bat 
cd com\start
call start.bat