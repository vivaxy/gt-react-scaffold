/**
 * @since 2016-11-16 15:37
 * @author vivaxy
 */

const copyFiles = (options) => {

    const {
        presets,
    } = options;

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

    console.log(`copying files...`);
    presets.copyFiles(files);
};

const updatePackageJSON = (options) => {

    const {
        project,
        scaffold,
        presets,
    } = options;

    const projectGit = project.git || {};

    const filename = `package.json`;

    console.log(`updating package.json...`);
    presets.updateJson(filename, (data) => {

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

const updateREADME = (options) => {
    const {
        project,
        scaffold,
        presets,
    } = options;

    const filename = `README.md`;

    console.log(`updating README.md...`);
    presets.updateFile(filename, (data) => {
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

export const init = (options) => {
    copyFiles(options);
    updatePackageJSON(options);
    updateREADME(options);
};
