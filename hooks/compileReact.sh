echo "[react] Build started";
rm -R www/*
npm run build;
echo "[react] Build done!";
echo "[cordova] Copy files started";
mv build/* www
chmod -R 777 www/*
rm  -R build
echo "[cordova] Copy files finished";
