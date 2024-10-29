/*
npm install axios
npm init
*/

//const axios = require('axios')

//insert API url here
var url = 'https://29c3-2804-14c-5fd9-80a7-f941-2c58-b539-fcc8.ngrok-free.app/api/cardapio/date/20-10-2024'

async function getMenu(){   
        let response = await axios.get(url);
        //wont be necessary anymore
        //document.getElementById('carne_segunda').innerText = JSON.stringify(response.data, null, 2);
        const menu = response.data[0];

        //cell filler function
        function fillCell(rowSelector, items) {
            const cell = document.querySelector(rowSelector);
            if (cell && items) {
                cell.textContent = items.join(', ');
            }
        }
        
        //monday TEST  
        fillCell('tbody tr:nth-child(1) td:nth-child(2)', menu.carnes); 
        fillCell('tbody tr:nth-child(2) td:nth-child(2)', menu.opcoes_vegana); 
        fillCell('tbody tr:nth-child(3) td:nth-child(2)', menu.carboidratos); 
        fillCell('tbody tr:nth-child(4) td:nth-child(2)', menu.sucos); 
        fillCell('tbody tr:nth-child(5) td:nth-child(2)', menu.saladas); 
        fillCell('tbody tr:nth-child(6) td:nth-child(2)', menu.sobremesa);
        
        //console test
        console.log(response.data)
}

getMenu();

//highly recomended changing json file from daily to full week, will make things easier to work with