function loadScore(){
    //Creates vector of scores that we can print out later
    let scores = [];
    //Grabs 'scores' objects from localStorage
    const scoresText = localStorage.getItem('scores');
    if(scoresText){
            //JSON.parse takes the JSON item that we got from the local storage and puts it into string format for JS
        scores = JSON.parse(scoresText);
    }

    //creates table body element that pulls from the id scores from the HTML page
    const tableBodyEl = document.querySelector('#scores');

    //Checking to see if the scores vector is empty. Executes if not
    if(scores.length){
        //for loop that pulls the values of the entries in the scores vector
        //?how does the const[i, score] syntax work?
        for(const[i, score] of scores.entries()){
            //Creating table data elements ie position, name, score, and date
            const positionTdEl = document.createElement('td');
            const nameTdEl = document.createElement('td');
            const scoreTdEl = document.createElement('td');
            const dateTdEl = document.createElement('td');

            //Assigning values to each of the table data elements
            positionTdEl.textContent = i + 1;
            nameTdEl.textContent = score.name;
            scoreTdEl.textContent = score.score;
            dateTdEl.textContent = score.date;

            //creating a table row element
            const rowEl = document.createElement('tr');
            //adding each table data element to the table row element
            rowEl.appendChild(positionTdEl);
            rowEl.appendChild(nameTdEl);
            rowEl.appendChild(scoreTdEl);
            rowEL.appendChild(dateTdEl);

            //adding the table row element to the table body element
            tableBodyEl.appendChild(rowEl);
        }
    }else{
        //Default table row and table data if the scores vector is empty
        tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to score</td></tr>';
    }


}