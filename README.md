# react-scaffold

## FEATURE

- react
- redux
- webpack packaging
- material ui
- hot reload
- html template
- mock server
- unified error center
- internationalization
- environments
- webpack visualizer

## STRUCTURE

![flowchart](./docs/flowchart.png)

As we find out html are mostly same in react projects, we extract the same html into a template file which lays in `html` folder.

`html-webpack-plugin` is used to generate released html files, which load corresponding js files.

`entry` stores js main methods, we split main container to `container` because entry could not be hot-module-replaced.

`entry`s import `container`s, which is one to one correspondent. `render` method in entry provides all commonly used setups, such as redux store, provider, injectTapEventPlugin for material-ui, and custom styles.

`container` is the headquarters which imports all dummy components, passing through props to them. Also, `container` interacts with redux `reducer` and `action`.

We do not use async redux for ajax requests because ajax status is not that important for us to record. So, we invoke `api` in `container`, get response, and determine what `action` to call.

We store every string in `i18n` for better internationalization.

Built project files will be in the `release` folder. With `build.log`, you can see every build details. With `stats.html`, you can optimize your dependencies to make project smaller.

## INITIALIZE

- install nodejs
- create your project directory
- clone project from git repository into existing directory `git clone https://github.com/vivaxy/react-scaffold.git .`
- run `npm install`
- run `npm run setup`

## DEVELOP

- `npm start`
- open in browser `http://127.0.0.1:8080/release/html/demo.html`

## BUILD

- `npm run build`

## CONTRIBUTE

Feel free to submit any issue.

## TODO

- single page support
    - fix hot reload for react route
    - add react route redux
    - update readme
- eslint for code styles

## REFERENCE

- https://github.com/webpack/docs/wiki/webpack-dev-server
- https://github.com/gaearon/react-hot-loader/tree/master/docs
- https://github.com/reactjs/react-router-redux
- https://github.com/ampedandwired/html-webpack-plugin
- https://github.com/ReactTraining/react-router
