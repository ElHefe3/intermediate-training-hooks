"use strict";
exports.__esModule = true;
/* eslint-disable */
var packageJson = require('../../../package.json');
console.log('Checking dependencies for wildcards');
var dependencySections = [packageJson.dependencies, packageJson.devDependencies];
dependencySections.forEach(checkDependencySection);
function checkDependencySection(dependencySection) {
    Object.keys(dependencySection).forEach(function (dependencyName) {
        var versionString = dependencySection[dependencyName];
        if (versionString.startsWith('http')) {
            return;
        }
        var allowedCharacters = /^[a-zA-Z\d.:@\/-]+$/;
        var valid = allowedCharacters.test(versionString);
        console.log('DEP NAME, VERSION NAME: ', dependencyName, versionString, valid);
        if (!valid) {
            throw new Error("Dependency " + dependencyName + " has a version string (" + versionString + ") with invalid characters");
        }
    });
}
console.log('All dependencies are wildcard free');
