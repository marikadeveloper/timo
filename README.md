# Timo (Work in Progress 👷‍♀️)

This will be a Chrome Extension that allows users to keep track of their work.
It consists of a timer that can be started and stopped, that will keep track of the time spent on a task.
The user can also add a description to the task, and the task will be saved in the browser's local storage.

## Important Notes

This is a simple tool that I use to keep track of my work, and I decided to share it with the world in case someone else finds it useful.
It is not perfect, and it is not meant to be a professional tool.
Data is only saved in the browser's IndexedDB, so if you clear your browser's data, you will lose all your tasks.
Since data is saved in the browser's local storage, it is not possible to sync tasks between devices.
Also, the data is not encrypted, so it is not recommended to use it to store sensitive information.
I am not planning to add any of these features in the near future, as I believe there are already many tools that do this job better than this extension.
The only advantage of this extension is that it is simple and easy to use, it is completely free, it does not require any registration, and data is only stored in the user's device.

## Features

- Start and stop a timer
- Create tasks and subtasks
- View all tasks created, divided by day
- Delete tasks
- Edit tasks
  - ? Merge tasks (combine two tasks into one)
- Export tasks to a CSV file

## Installation (Temp solution until I publish it on the Chrome Web Store!)

1. Clone the repository
2. Open the repository in your terminal
3. Run `npm install`
4. Run `npm run build`
5. Open Chrome
6. Go to `chrome://extensions/`
7. Enable Developer Mode
8. Click on `Load unpacked`
9. Select the `dist` folder in the repository
10. The extension should now be installed :)
