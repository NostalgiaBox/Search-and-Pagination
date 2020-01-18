/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const studentList = document.querySelectorAll('li.student-item');
const itemsPerPage = 10;



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage(list, page) {
   const students = document.querySelector('.student-list');
   const pageContainer = document.querySelector('.page');
   const studentUL = document.createElement('ul');
   studentUL.className = 'student-list';
   pageContainer.removeChild(students);
   pageContainer.insertBefore(studentUL, document.querySelector('div.pagination'));
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   var endIndex = page * itemsPerPage;
   if (endIndex > list.length){
      endIndex = list.length;
   }
   for (let i = startIndex; i < endIndex; i += 1){
      studentUL.appendChild(list[i]);
   }
   
   if(list.length == 0){
      const noResults = document.createElement('li');
      noResults.innerText = "Sorry, no results found. Please try another query";
      studentUL.appendChild(noResults);
   }

}



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(list) {
   // div class pagination -> ul -> li -> a active
   const page = document.querySelector('div.page');
   if(document.querySelector('.pagination')){
      const oldDiv = document.querySelector('.pagination');
      page.removeChild(oldDiv);
   }
   const div = document.createElement('div');
   const ul = document.createElement('ul');
   const linkCount = list.length / itemsPerPage;
   div.className = 'pagination';
   div.appendChild(ul);

   for (let i = 0; i < linkCount; i += 1) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = "#";
      a.innerText = (i + 1);
      if(i == 0){
         a.className = "active";
      }
      a.addEventListener('click', (e) => {
         const oldActive = document.querySelector('.active');
         oldActive.className = "";
         a.className = "active";
         showPage(list, (i + 1));
      });
      li.appendChild(a);
      ul.appendChild(li);
   }
   page.appendChild(div);
}

function pageSetup() {
   searchSetup();

   appendPageLinks(studentList);
   showPage(studentList, 1);
}

function searchSetup () {
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

   function executeSearch(text){
      const newStudentList = [];
      for (let i = 0; i < studentList.length; i += 1){
         const currentStudent = studentList[i].querySelector('h3');
         if(currentStudent.innerText.indexOf(text) != -1){
            newStudentList.push(studentList[i]);
         }
      }
      showPage(newStudentList, 1);
      appendPageLinks(newStudentList);

   }

   searchInput.addEventListener('keyup', (e) => {
      executeSearch(searchInput.value);
   });

   searchButton.addEventListener('click', (e) => {
      executeSearch(searchInput.value);
   });
}

pageSetup();

// Remember to delete the comments that came with this file, and replace them with your own code comments.