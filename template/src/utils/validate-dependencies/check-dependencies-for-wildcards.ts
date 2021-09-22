/* eslint-disable */
const packageJson = require('../../../package.json');

console.log('Checking dependencies for wildcards');

const dependencySections = [packageJson.dependencies, packageJson.devDependencies];
dependencySections.forEach(checkDependencySection);

function checkDependencySection(dependencySection: Array<string>) {
  Object.keys(dependencySection).forEach((dependencyName: any) => {
    const versionString = dependencySection[dependencyName];
    if (versionString.startsWith('http')) {
      return;
    }
    const allowedCharacters = /^[a-zA-Z\d.:@\/-]+$/;
    const valid = allowedCharacters.test(versionString);
    console.log('DEP NAME, VERSION NAME: ', dependencyName, versionString, valid);
    if (!valid) {
      throw new Error(
        `Dependency ${dependencyName} has a version string (${versionString}) with invalid characters`,
      );
    }
  });
}

console.log('All dependencies are wildcard free');

export {};
