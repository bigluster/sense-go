# sense-go

> Library to easily handle validation, deployment, packaging and testing of Qlik Sense Visualization Extensions.

**Note: This library is in development and not ready to use, yet**

***

<!-- toc -->

+ [Purpose](#purpose)
+ [Deployment by convention](#deployment-by-convention)
+ [Tasks](#tasks)
  - [Bump](#bump)
  - [Copy](#copy)
* [Task Chains](#task-chains)
+ [Author](#author)
+ [License](#license)

_(Table of contents generated by [verb])_

<!-- tocstop -->

***

## Purpose

Main purpose of this library is to provide a framework to easily

+ validate
+ package
+ deploy and
+ test

**Visualization Extensions** created for Qlik Sense.

The implementation is a based on the deployment functionality in the [Yeoman Generator for Visualization Extensions](https://github.com/stefanwalther/generator-qsExtension).

The main reason behind creating this library is that I am creating a lot of different visualization extensions for Qlik Sense, but in any of these projects I include some kind of deployment system (so far always using grunt). If I have to make changes to the general deployment approach I have to change every single visualization extension repository, which is not really ideal. So introducing this library centralizes the deployment needs and allows me to re-use a central approach.

Technically speaking sense-go is just a collection of configurable gulp tasks which can be easily re-used when developing your Qlik Sense visualization extensions.

## Deployment by convention

The entire concept follows **conventions** I am using when setting up a project:

```
| PROJECT-ROOT
|-- build           <= all builds, including source code or zipped files
    |-- dev         <= target for the development build
    |-- release     <= target for the release build
|-- docs            <= documentation files, then used by verb
|-- src             <= all source files
    |-- lib
        |-- css     <= see below *
        |-- less    <= less files
| .sense-go.yml     <= sense-go configuration file
| .verb.md          <= verbs readme template
| gulpfile.js       <= gulp file using sense-go
| package.json
```

* If using less files is preferred for a project I keep this folder empty, otherwise all the .css files will be place here

**_sense-go_** works best if you follow these conventions, otherwise everything is configurable, it's just a bit more work to get sense-go running immediately.

## Tasks

### Bump

> Bumps the version in your package.json file

**`gulp bump:patch`**

Changes the version in package.json from `0.2.1` to `0.2.2`

**`gulp bump:minor`**

Changes the version in package.json from `0.2.1` to `0.3.1`

**`gulp bump:major`**

Changes the version in package.json from `0.2.1` to `1.0.0`

**Possible command line parameters**

**`--tag`**

Tags the current version of your commit with the newly created version created by any of the bump-tasks.

**`--commit="Your commit message"`**

Commits all files with the given commit message, if no commit message is defined, "." will be committed as a message.

### Copy

> Copy files to a specific directory on your system

**`gulp copy:toTmp`**

Copies all files from the `src` folder to the `.tmp` folder

_Settings used:_

+ srcDir
+ tmpDir

**`copy:tmpToDev`**

Copies all files from the `.tmp` folder to `.\build\dev` folder

_Settings used:_

+ tmpDir
+ buildDevDir

**`copy:tmpToLocal`**

Copies all files from the `.tmp` directory to the local extension directory, creating a new folder for the current package and eventually deleting any already existing files in the targeted folder.

_Settings used:_

+ tmpDir
+ localExtensionDir

## Task Chains

Based on gulp tasks provided by sense-go you can then create your task chains.
Some are already predefined:

**`gulp build`**

`gulp.task( 'build', gulp.series( 'init', 'clean:tmp', 'copy:toTmp', 'replace:tmp', 'clean:buildDev', 'copy:tmpToDev', 'clean:localExtensionDir', 'copy:tmpToLocal' ) );`

## Create your own task-chains

You can add additional tasks on top of sense-go, mixing your very own tasks with sense-go tasks, etc.

+ Always initialize a task chain with the `init` task
+ When creating your own tasks, note that sense-go relies on Gulp4

**Example:**

```js
'use strict';
var gulp = require('gulp');
var senseGo = require('./lib/');

var userConfig = {
    "packageName": "sense-go"
};

senseGo.init( gulp, userConfig,  function (  ) {
  
  // Create your own task chain, and overwrite the current 'build' task
  `gulp.task( 'build', gulp.series( 'init', 'clean:tmp', 'copy:toTmp', 'myTask1', 'myTask2' ) );`
  
});
```

## Author

**Stefan Walther**

+ [qliksite.io](http://qliksite.io)
+ [twitter/waltherstefan](http://twitter.com/waltherstefan)
+ [github.com/stefanwalther](http://github.com/stefanwalther)

## License

Copyright © 2015
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on July 22, 2015._