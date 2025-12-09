# Pokémon SPA

Frontend application originally built for a Coodboost course project. The initial version used **Pure JavaScript**, **HTML**, and **SASS**, but this version was rebuilt using **React** with **Vite** for a more modern component-based structure.

## Purpose
Display data from the [PokéAPI](https://pokeapi.co) in a **Single Page Application (SPA)** with smooth navigation and interactive UI elements.

## Main Features

### Type Filter
Shows only the Pokémon that match the selected type.

### Search Bar
Find any Pokémon by **name** or **ID**, fetching data directly from the API.

### Details Modal
Clicking any Pokémon card opens a modal displaying:
- Image and general info  
- Types  
- Stats and other key details  

## Technologies
- **React**
- **Vite**
- **PokéAPI**

## ▶️ Project Commands

### Install dependencies
```
npm install
```
Installs all packages listed in package.json.

### Development server
```
npm run dev
```
run executes a script from package.json. Script dev starts the Vite development server.

### Production build
```
npm run build
```
Generates optimized files for deployment.

### Preview the production build
```
npm run preview
```
Starts a local server to preview the final build.