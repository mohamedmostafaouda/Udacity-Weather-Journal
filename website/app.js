// Personal API Key for OpenWeatherMap API
const key = 'b741bc4a613647a1a082a80f8f12bcc4';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',changeView)
/* Function called by event listener */
async function changeView(e){
    e.preventDefault();
    let zip = document.getElementById('zip').value;
    const data = await getData(zip);
    let dataObject = {
        userResponse: document.getElementById('feelings').value,  
        temperature: data.main.temp,
        date: getCurDate()
    };
    postData('/add', dataObject);
    let recentData = await getAllData(); 
    changeTemp(recentData.temperature)
    changeDate(recentData.date);
    changeEntry(recentData.userResponse); 
}

function changeEntry(feelings){
    document.getElementById('content').textContent = `Feelings: ${feelings}`;
}

function changeTemp(temp){
    document.getElementById('temp').textContent = `Temperature: ${temp}`
}

function changeDate(date){
    document.getElementById('date').textContent = `Date: ${date}`;
}

function getCurDate() {
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    return newDate;
}

/* Function to GET Web API Data*/
const getData = async (zip)=>{
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${zip}&appid=${key}&units=imperial`;
    const response = await fetch(url);
    try{
        const newData = response.json();
        return await newData;
    } catch(err){
        console.log('eror '+err);
    }
}

/* Function to POST data */
const postData = async (url, data)=>{
    const response = await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
   });
}

/* Function to GET Project Data */
async function getAllData(){
    let data = await fetch('/all');
    return data.json();
}

