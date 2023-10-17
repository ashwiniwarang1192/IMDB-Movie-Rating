setup:
	rm -rf node_modules && NODE_ENV=production npm  --registry https://registry.npmjs.org install &&  npm run build;
	rm -rf ./src/modules/v1/*/test/*
pm2install:
	npm install pm2 -g;
	pm2 install typescript;

serve:
	NODE_ENV=production NODE_SUBENV=production pm2 start pm2.json --env production;
	sleep 30;

kill-serve:
	rm -rf .live && sleep 10;
	pm2 kill || echo "WARN: wordle was not running on PM2.";

tar:
	rm -rf _nm.tgz && tar -czf _nm.tgz node_modules

.PHONY: tar
