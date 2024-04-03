#! /usr/bin/env node

import inquirer from "inquirer";

let todos : string[] = [];

let todosQuestion;

do {

    todosQuestion = await inquirer.prompt(
        {
            name: "task",
            type: "confirm",
            message: "Do you want to add any task?",
        }
    );

    if (todosQuestion.task) {
        let addTask = await inquirer.prompt(
            {
                name: "taskToAdd",
                type: "input",
                message: "Please type in your task here: ",
            }
        );
        todos.push(addTask.taskToAdd);

    } else {
        let todosQuestion;
        do {
            todosQuestion = await inquirer.prompt(
                {
                    name: "delete",
                    type: "confirm",
                    message: "Do you want to delete any task?",
                }
            );
            if (todosQuestion.delete) {
                let deleteQuestion = await inquirer.prompt(
                    {
                        name: "deleteTask",
                        type: "list",
                        message: "Select any task to delete",
                        choices: todos,
                    }
                );

                if (todos.includes(deleteQuestion.deleteTask))
                {
                  let i : number = todos.indexOf(deleteQuestion.deleteTask);
                  todos.splice(i, 1);
                  console.log("Your task has been deleted");
                }
            }
            
        } while(todosQuestion.delete);
    }
     
    console.log("Here is your todo list: ");
    for (let todo of todos)
    {
        console.log(todo);
    }
} while (todosQuestion.task);