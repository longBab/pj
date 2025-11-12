
cd node_modules&&ls  -a /home/public/uni-vue-vite/node_modules |  awk '{if(!($0~/^(\\.vite|.|..)$/)){print "ln -s /home/public/uni-vue-vite/node_modules/"$0" "$0}}'

rm dapp.zip&& \
npm run build:h5 && \
cd dist/build/h5 && \
7z a ../../../dapp.zip ./* && cd ../../../ && \
scp dapp.zip magadi:~/ && \
ssh magadi "cd ~/dapp&&rm -rf assets&&7z x -y ../dapp.zip"

7z a licensing.zip ./licensing