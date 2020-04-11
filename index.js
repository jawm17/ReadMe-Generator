var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");

inquirer
    .prompt([
        {
            type: "input",
            message: "Enter your github username:",
            name: "username"
        },
        {
            type: "input",
            message: "Enter the title of your project:",
            name: "title"
        },
        {
            type: "input",
            message: "Enter the badges for your project:",
            name: "badges"
        },
        {
            type: "input",
            message: "Enter the description for your project:",
            name: "description"
        },
        {
            type: "input",
            message: "Enter details for installation:",
            name: "installation"
        },
        {
            type: "input",
            message: "Enter instructions for usage:",
            name: "usage"
        },
        {
            type: "input",
            message: "Enter licensing information:",
            name: "license"
        },
        {
            type: "input",
            message: "Enter the names of additional contributors:",
            name: "contributors"
        },
        {
            type: "input",
            message: "Enter details on your testing process:",
            name: "testing"
        },
        {
            type: "input",
            message: "Enter any questions:",
            name: "questions"
        }
    ])
    .then(function (data) {
        const queryUrl = `https://api.github.com/users/${data.username}`;
        axios
            .get(queryUrl)
            .then(function (res) {
                writeToFile(data, res.data.avatar_url);
            })
            .catch(error => {
                console.log("Your username was input incorrectly");
            });
    });

function writeToFile(data, avatar) {
    const badges = makeBadges(data.badges);
    const content =
`${badges}
# ${data.title}  
    
## Description

${data.description}
    

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
    

## Installation
    
${data.installation}


## Usage 

${data.usage}


## Credits

${data.contributors}


## License

${data.license}


## Tests 

${data.testing}


## Questions

${data.questions}

`;

    fs.writeFile("README.md", content, "utf8", function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Created new ReadMe!");
    });
}

function makeBadges(rawBadges) {
    const badgeUrls = [];
    const badges = rawBadges.split(";");
    let mdBadges = "";
    badges.forEach(badge => {
        badge = badge.split(",");
        if (badge.length === 3) {
            badgeUrls.push(`![${badge[0]}](https://img.shields.io/badge/${badge[0]}-${badge[1]}-${badge[2]})`);
        }
    });
    for (let i = 0; i < badgeUrls.length; i++) {
        mdBadges += badgeUrls[i] + " ";
    }
    return mdBadges;
}

function init() {

}

init();
