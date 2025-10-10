# React – Class Components Task

Hey there! 👋

This is a small React project I made for the [React 2025Q3 course](https://rs.school/). The idea was to build an app using **class components only**, with a simple search feature and results from an API.

Check out the full task here:
🔗 [Class Components Task](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/class-components.md)

---

## What it does

- **Top section:** search input + button
- **Bottom section:** list of results as cards
- Fetches **initial data** on load
- With new search makes **another API request**
- Shows a **loader** while data is coming
- Last search is saved in **LocalStorage** and restored on reload
- Handles **API errors** nicely
- Includes an **Error Boundary** + a test button to try it out

---

## Tech stuff

- All **class components** (`extends React.Component`)
- API calls in `componentDidMount()`
- State via `this.state` and `this.setState()`

---

## Run locally

```bash
git clone https://github.com/Tatiana-Golub/tatiana-golub-React2025Q3.git
cd tatiana-golub-React2025Q3
git checkout class-components
npm install
npm run dev
