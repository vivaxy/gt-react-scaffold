/**
 * @since 2016-10-22 13:12
 * @author vivaxy
 */

import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';

const remove = async(file) => {
    const result = await new Promise(((resolve) => {
        fse.remove(file, (err) => {
            if (err) {
                throw err;
            }
            resolve();
        });
    }));
    console.log(`Removed ${file}`);
    return result;
};

const read = async(file) => {
    return await new Promise((resolve) => {
        fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                resolve(data);
            }
        );
    });
};

const write = async(file, data) => {
    const result = new Promise((resolve) => {
        fse.outputFile(file, data, (err) => {
            if (err) {
                throw err;
            }
            resolve();
        });
    });
    console.log(`Write to ${file}`);
    return result;
};

const createPackageJSON = async() => {
    const filename = `./package.json`;
    const data = await read(filename);
    const packageData = JSON.parse(data);
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
    } = packageData;

    Reflect.deleteProperty(scripts, `setup`);
    Reflect.deleteProperty(devDependencies, `babel-cli`);
    Reflect.deleteProperty(devDependencies, `fs-extra`);

    const outputPackage = {
        name: path.resolve(__dirname, 'script'),
        version: `0.0.0`,
        reactScaffoldVersion: version,
        description: `project from ${description}`,
        main,
        scripts: scripts,
        repository: {
            ...repository,
            url: ``,
        },
        keywords,
        author,
        license,
        bugs: {
            ...bugs,
            url: ``,
        },
        homepage: ``,
        dependencies,
        devDependencies,
        peerDependencies,
    };

    return await write(filename, JSON.stringify(outputPackage, null, 2));
};

const createREADME = async() => {
    const filename = `./README.md`;
    const data = await read(filename);
    const partsToRemove = [
        `INITIALIZE`,
        `CONTRIBUTE`,
        `TODO`,
    ];
    let data_removed = data;
    partsToRemove.forEach((part) => {
        data_removed = data_removed.replace(new RegExp(`## ${part}[\\s\\S]+?##`), `##`);
    });
    return await write(filename, data_removed);
};

const createCHANGELOG = async() => {
    const filename = `./CHANGELOG.md`;
    return await write(filename, `# 0.0.0\n`);
};

/**
 - remove git info `rm -rf .git`
 - update config in files
    - package.json
        - name
        - version
        - repository
            - url
        - bugs
            - url
        - homepage
        - scripts
            - setup
    - webpack.config.js
        - DEVELOPMENT_PORT
    - README.md
        - INITIALIZE
        - CONTRIBUTE
        - TODO
        - CHANGELOG.md
    - .gitignore
 - remove scripts
 */
const setup = async() => {
    await remove(`.git`);
    await createPackageJSON();
    await createREADME();
    await createCHANGELOG();
    await remove(`scripts`);
};

setup();
