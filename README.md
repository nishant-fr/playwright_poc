install Playwright plugin for windows
install Cucumber plugin for windows
install dependencies

npm i @cucumber/cucumber -D
npm i ts-node -D

create folder structure

- src - tests
				- features - login.feature
				- steps - login.ts
				
create cucumber configuration by creating cucumber.json under root folder

To make step definitions mapped, under Cucumber plaugin, navigate to 
Extenstions, edit in settings.json

https://github.com/WasiqB/multiple-cucumber-html-reporter
for charts reports

npm run tes
npum run test:failed to rerun the failed tests

https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md

to make sure the folders are created if not exists

npm i fs-extra -D

   /*      "parallel": 2,
        "retry": 1 */
