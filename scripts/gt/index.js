/**
 * @since 2017-03-21 15:55:59
 * @author vivaxy
 */

import Listr from 'listr';
import execa from 'execa';

const sleep = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

const copyFiles = (options) => {
    const { presets } = options;
    const files = [
        'docs',
        'mock-server',
        'scripts',
        'src',
        '.babelrc',
        '.editorconfig',
        '.gitignore',
        '.npmrc',
        'LICENSE',
    ];
    return async() => {
        await sleep(500);
        await presets.copyFiles(files);
    };
};

const updatePackageJSON = (options) => {
    const { project, presets } = options;
    const projectGit = project.git || {};
    const filename = 'package.json';

    return async() => {
        await sleep(500);
        await presets.updateJson(filename, (data) => {
            const {
                version,
                description,
                main,
                scripts,
                repository,
                keywords,
                author,
                license,
                bugs,
                dependencies,
                devDependencies,
                peerDependencies,
            } = data;

            return {
                name: project.name,
                version: '0.0.0',
                gtScaffoldVersion: version,
                description,
                main,
                scripts,
                repository: {
                    ...repository,
                    url: projectGit.repositoryURL,
                },
                keywords,
                author: projectGit.username,
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
};

const updateREADME = (options) => {
    const { project, presets } = options;
    const filename = 'README.md';

    return async() => {
        await sleep(500);
        await presets.updateFile(filename, (content) => {
            const projectData = content.split('----------\n\n')[1];
            return projectData.replace(/gt-react-scaffold/g, `${project.name}

Initialized by [vivaxy/gt-react-scaffold](https://github.com/vivaxy/gt-react-scaffold)`);
        });
    };
};

const updateTemplate = (options) => {
    const { project, presets } = options;
    const filename = 'src/html/index.html';

    return async() => {
        await sleep(1000);
        await presets.updateFile(filename, (content) => {
            return content.replace(/gt-react-scaffold/g, project.name);
        });
    };
};

const updateRender = (options) => {
    const { project, presets } = options;
    const filename = 'src/lib/render.js';

    return async() => {
        await sleep(1000);
        await presets.updateFile(filename, (content) => {
            return content.replace(/gt-react-scaffold/g, project.name);
        });
    };
};

const yarnInstall = () => {
    return async() => {
        await execa('yarn', ['install']);
    };
};

export const init = (options) => {
    return new Listr([
        {
            title: 'copy files',
            task: copyFiles(options),
        },
        {
            title: 'update template',
            task: updateTemplate(options),
        },
        {
            title: 'update render',
            task: updateRender(options),
        },
        {
            title: 'update package.json',
            task: updatePackageJSON(options),
        },
        {
            title: 'update README.md',
            task: updateREADME(options),
        },
        {
            title: 'run yarn install',
            task: yarnInstall(options),
        },
    ]);
};

/* eslint-disable no-console */
export const after = () => {
    console.log(`
    please run following command to start dev server

        - yarn run dev
`);
};
