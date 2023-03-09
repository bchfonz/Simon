# Simon
Replica of the simon game

Tags like <div> and <header> aren't always neccessary but they help keep everything organized

  
  You can add things in your class to edit the html.
  i.e. bg-primary/secondary
 container-fluid
  text-light/dark/bold/thick/thin/center/reset
  fixed-top
  class-dark/light
  
  <script src='.js'></script> is how you add the JS file to an HTML file. add the .js file at the end of the body of the HTML file
  onclick="class.function(parameters)" is how to add JS functionality to your HTML
  
  document.querySelector pulls certain items from the DOM (HTML code)
  document.createElement('html tag') allows you to create HTML elements via javascript. This is useful for things like displaying the scores
  localStorage.setItem creates a new item in the local storage. This is used for the login page as well as a way to keep track of the scores 
  localStorage.getItem gets items from the local storage. Use JSON.parse to then convert it into a string for JS
  
  View JS almost as a little editor. There is all this HTML that breaks down into nodes and a tree of nodes and the JS picks nodes and edits and adds to the nodes. 
  
