/**
 * @since 2016-11-16 15:37
 * @author vivaxy
 */

import Listr from 'listr';

const sleep = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

let data;

const copyFiles = async() => {

    const {
        presets,
    } = data;

    const files = [
        `docs`,
        `mock-server`,
        `scripts/dev.js`,
        `src`,
        `.babelrc`,
        `.editorconfig`,
        `.gitignore`,
        `LICENSE`,
        `webpack.config.js`,
    ];

    await sleep(1000);
    await presets.copyFiles(files);
};

const updatePackageJSON = async() => {

    const {
        project,
        scaffold,
        presets,
    } = data;

    const projectGit = project.git || {};

    const filename = `package.json`;

    await sleep(1000);
    await presets.updateJson(filename, (data) => {

        const {
            name,
            version,
            description,
            main,
            scripts,
            repository,
            keywords,
            author,
            license,
            bugs,
            homepage,
            dependencies,
            devDependencies,
            peerDependencies,
        } = data;

        return {
            name: project.name,
            version: `0.0.0`,
            gtScaffoldVersion: version,
            description,
            main,
            scripts,
            repository: {
                ...repository,
                url: projectGit.repositoryURL,
            },
            keywords,
            author,
            license,
            bugs: {
                ...bugs,
                url: undefined,
            },
            dependencies,
            devDependencies,
            peerDependencies,
        };

    });

};

const updateREADME = async() => {

    const {
        project,
        scaffold,
        presets,
    } = data;

    const filename = `README.md`;

    await sleep(1000);
    await presets.updateFile(filename, (data) => {
        const projectData = data.split(`----------\n\n`)[1];
        return projectData.replace(/gt-react-scaffold/g, `${project.name}

Initialized by [vivaxy/gt-react-scaffold](https://github.com/vivaxy/gt-react-scaffold)`);
    });
};

const updateTemplate = async() => {
    const {
        project,
        scaffold,
        presets,
    } = data;

    const filename = `src/html/index.html`;

    await sleep(1000);
    await presets.updateFile(filename, (data) => {
        const projectData = data.split(`----------\n\n`)[1];
        return projectData.replace(/gt-react-scaffold/g, `${project.name}`);
    });
};

const updateRender = async() => {
    const {
        project,
        scaffold,
        presets,
    } = data;

    const filename = `src/lib/render.js`;

    await sleep(1000);
    await presets.updateFile(filename, (data) => {
        const projectData = data.split(`----------\n\n`)[1];
        return projectData.replace(/gt-react-scaffold/g, `${project.name}`);
    });
};

export const init = async(options) => {

    data = options;

    return new Listr([
        {
            title: `copy files`,
            task: copyFiles,
        },
        {
            title: `update template`,
            task: updateTemplate,
        },
        {
            title: `update render`,
            task: updateRender,
        },
        {
            title: `update package.json`,
            task: updatePackageJSON,
        },
        {
            title: `update README.md`,
            task: updateREADME,
        },
    ]);

};

export const after = async() => {
    console.log(`
    please exec following command to initialize your project

    - yarn install

    then exec following command to start dev server

    - yarn start
`);
};
