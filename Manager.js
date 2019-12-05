const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const outputPath = path.resolve(__dirname, "output", "team.html");
const render = require("./lib/htmlRenderer");
const teamMembers = [];
const idArray = [];

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