/**
 * @since 2016-11-16 15:37
 * @author vivaxy
 */

import Listr from 'listr';

let data;

const copyFiles = async() => {

    const {
        presets,
    } = data;

    const files = [
        `docs`,
        `mock-server`,
        `source`,
        `.babelrc`,
        `.editorconfig`,
        `.gitignore`,
        `LICENSE`,
        `webpack.config.js`,
    ];

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
            reactScaffoldVersion: version,
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

    await presets.updateFile(filename, (data) => {
        const partsToRemove = [
            `INITIALIZE`,
            `CONTRIBUTE`,
            `TODO`,
        ];
        let data_removed = data;
        partsToRemove.forEach((part) => {
            data_removed = data_removed.replace(new RegExp(`## ${part}[\\s\\S]+?##`), `##`);
        });
        return data_removed;
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
            title: `update package.json`,
            task: updatePackageJSON,
        },
        {
            title: `update README.md`,
            task: updateREADME,
        },
    ]);

};
