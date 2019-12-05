const Manager = require("./classes/Manager");
const Engineer = require("./classes/Engineer");
const Intern = require("./classes/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const outputPath = path.resolve(__dirname, "output", "team.html");
const render = require("./classes/htmlRenderer");
const teamMembers = [];
// const idArray = [];

function appMenu() {
  createManager(); 
}
function createManager() {
      inquirer.prompt([
        {
              type: "input",
              name: "managerName",
              message: "What is your manager's name?",
              validate: answer => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter at least one character.";
              }
            },
            {
              type: "input",
              name: "managerId",
              message: "What is your manager's id?",
              validate: answer => {
                const pass = answer.match(
                  /^[1-9]\d*$/
                );
                if (pass) {
                  return true;
                }
                return "Please enter a positive number greater than zero.";
              }
            },
            {
              type: "input",
              name: "managerEmail",
              message: "What is your manager's email?",
              validate: answer => {
                const pass = answer.match(
                  /\S+@\S+\.\S+/
                );
                if (pass) {
                  return true;
                }
                return "Please enter a valid email address.";
              }
            },
            {
              type: "input",
              name: "managerOfficeNumber",
              message: "What is your manager's office number?",
              validate: answer => {
                const pass = answer.match(
                  /^[1-9]\d*$/
                );
                if (pass) {
                  return true;
                }
                return "Please enter a positive number greater than zero.";
              }
            }
      ]).then(answers => {
        /* build manager */
        const manager = new Manager(answers.managerName,answers.managerId,answers.managerEmail,answers.managerOfficeNumber);
        teamMembers.push(manager);
        createTeam();
      });
}
    function createTeam() {
      inquirer.prompt([
      /* prompt choice here */
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members"
          ]
        }

      ]).then(userChoice => {
        /* call one function below based on choice */
        if(userChoice.memberChoice === "Engineer"){
          addEngineer();
        }
        else if(userChoice.memberChoice === "Intern"){
          addIntern();
        } else {
          buildTeam();
          process.exit(0);
        }
      });
    }
    function addEngineer() {
      inquirer.prompt([
        /* prompts here */
        {
          type: "input",
          name: "engineerName",
          message: "What is your engineer's name?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          }
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is your engineers's id?",
          validate: answer => {
            const pass = answer.match(
              /^[1-9]\d*$/
            );
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          }
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is your engineer's email?",
          validate: answer => {
            const pass = answer.match(
              /\S+@\S+\.\S+/
            );
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          }
        },
        {
          type: "input",
          name: "engineersGitHub",
          message: "What is your engineer's  gitHub?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          }
        }
      ]).then(answers => {
        /* create engineer */
        const engineer = new Engineer(answers.engineerName,answers.engineerId,answers.engineerEmail,answers.engineersGitHub);
        teamMembers.push(engineer);
        createTeam();
      });
    }
    function addIntern() {
      inquirer.prompt([
        /* prompts here */
        {
          type: "input",
          name: "internName",
          message: "What is your intern's name?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          }
        },
        {
          type: "input",
          name: "internId",
          message: "What is your engineers's id?",
          validate: answer => {
            const pass = answer.match(
              /^[1-9]\d*$/
            );
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          }
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your intern's email?",
          validate: answer => {
            const pass = answer.match(
              /\S+@\S+\.\S+/
            );
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          }
        },
        {
          type: "input",
          name: "internsSchool",
          message: "What is your intern's  school?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          }
        }
      ]).then(answers => {
        /* create intern */
        const intern = new Intern(answers.internName,answers.internId,answers.internEmail,answers.internsSchool);
        teamMembers.push(intern);
        createTeam();
      });
    }
    function buildTeam() {
      fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
  
  appMenu();