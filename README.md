# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- Drag and drop to reorder items on the list

### Screenshot

![](./design/desktop-preview.jpg)

### Links

- Live Site URL: [https://fem-todo.pages.dev/](https://fem-todo.pages.dev/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Typescript
- [React](https://reactjs.org/) - JS library
- [Vite](https://vitejs.dev/) - Build Tool
- [DnD Kit](https://dndkit.com/) - For Drag and Drop

### What I learned

Theming the application was a new learning.

```css
body {
  /* colors light */
  --clr-body-bg: hsl(236, 33%, 92%);
  --clr-item-bg: hsl(0, 0%, 98%);
  --clr-text: hsl(235, 19%, 35%);
  ...;
}
```

```css
body.dark {
  /* colors dark */
  --clr-body-bg: hsl(235, 21%, 11%);
  --clr-item-bg: hsl(235, 24%, 19%);
  --clr-text: hsl(236, 33%, 92%);
  ...;
}
```

## Author

- Website - [Bal Krishna](https://imbekrishna.github.io)
- Frontend Mentor - [@imbekrishna](https://www.frontendmentor.io/profile/imbekrishna)
