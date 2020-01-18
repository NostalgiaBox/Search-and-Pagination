/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
By Murray Fenstermaker
******************************************/

// Global variables for the student list and the items allowed per page
const studentList = document.querySelectorAll('li.student-item');
const itemsPerPage = 10;


// the showPage function takes in a list and a page number and displays
// the proper amount of entries fo r the page.

function showPage(list, page) {
   // Establish the old student list and page container
   const students = document.querySelector('.student-list');
   const pageContainer = document.querySelector('.page');
   // Create a new list item to hold our new student list
   const studentUL = document.createElement('ul');
   studentUL.className = 'student-list';
   // Remove the old list
   pageContainer.removeChild(students);
   // Add the new list before the pagination div
   pageContainer.insertBefore(studentUL, document.querySelector('div.pagination'));
   //Establish start and end index, end index is a var because it could change
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   var endIndex = page * itemsPerPage;
   // if the number of entries in the list are less than the endIndex, set the endIndex to list.length
   if (endIndex > list.length){
      endIndex = list.length;
   }
   //Loop through from startIndex to endIndex and add the appropriate student to the list
   for (let i = startIndex; i < endIndex; i += 1){
      studentUL.appendChild(list[i]);
   }
   
   // if there ARE no entries in the list display the appropriate message
   if(list.length == 0){
      const noResults = document.createElement('li');
      noResults.innerText = "Sorry, no results found. Please try another query";
      studentUL.appendChild(noResults);
   }

}



// appendPage generates the bottom links dynamically based on an input list.
function appendPageLinks(list) {
   // establish page container
   const page = document.querySelector('div.page');
   // Check to see if pagination div already exists, if so, remove it to start fresh
   if(document.querySelector('.pagination')){
      const oldDiv = document.querySelector('.pagination');
      page.removeChild(oldDiv);
   }

   // Set up the div and UL eleents and establish the number of links
   const div = document.createElement('div');
   const ul = document.createElement('ul');
   const linkCount = list.length / itemsPerPage;
   div.className = 'pagination';
   div.appendChild(ul);

   // Loop through each required page link
   for (let i = 0; i < linkCount; i += 1) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = "#";
      a.innerText = (i + 1);
      // First time this is called it will establish 1 as the active link
      if(i == 0){
         a.className = "active";
      }
      // Each a tag gets a listener that removes the old active class and establishes it to this a tag
      // Then it runs showPage on its page number.
      a.addEventListener('click', (e) => {
         const oldActive = document.querySelector('.active');
         oldActive.className = "";
         a.className = "active";
         showPage(list, (i + 1));
      });
      // Add the LI and A to the page
      li.appendChild(a);
      ul.appendChild(li);
   }
   // Finally add the div we just built
   page.appendChild(div);
}

// This is just a function to clean up the starting code into one launch function
function pageSetup() {
   searchSetup();

   appendPageLinks(studentList);
   showPage(studentList, 1);
}

// This function handles all parts of the search
function searchSetup () {
   // Set up the constants and establish the div, input, and button.
   const pageHeader = document.querySelector('.page-header');
   const searchDiv = document.createElement('div');
   const searchInput = document.createElement('input');
   const searchButton = document.createElement('button');
   searchButton.innerText = 'search';
   searchInput.placeholder = 'Type here to search...';
   searchDiv.className = 'student-search';
   searchDiv.appendChild(searchInput);
   searchDiv.appendChild(searchButton);
   pageHeader.appendChild(searchDiv);

   // This is the actual search function
   function executeSearch(text){
      //Build a new empty array to hold the search results
      const searchResults = [];
      // Loop through all the students to find matches, append matches to results
      for (let i = 0; i < studentList.length; i += 1){
         const currentStudent = studentList[i].querySelector('h3');
         if(currentStudent.innerText.indexOf(text) != -1){
            searchResults.push(studentList[i]);
         }
      }
      //run show page and appendpagelinks with the search results
      showPage(searchResults, 1);
      appendPageLinks(searchResults);

   }

   //set up event listeners for both keyup and click events.
   searchInput.addEventListener('keyup', (e) => {
      executeSearch(searchInput.value);
   });

   searchButton.addEventListener('click', (e) => {
      executeSearch(searchInput.value);
   });
}

//Run the pagesetup method to kick off everything.
pageSetup();
