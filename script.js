console.log(countries)

const infoMsg = document.getElementById('info-msg')

const inputText = document.getElementById('input-text')

const nameBtn = document.getElementById('name-btn')
const capitalBtn = document.getElementById('capital-btn')
const populationBtn = document.getElementById('population-btn')
const arrangementBtn = document.getElementById('arrangement-btn')

const populationBtnDown = document.getElementById('population')
const languageBtnDown = document.getElementById('languages')

const outputFlagContainer = document.querySelector('.output-flag-container')

const columnCountry = document.querySelector('.column-country')
const columnChart = document.querySelector('.column-chart')
const columnValue = document.querySelector('.column-value')

const arrowUpBtn = document.querySelector('.arrow-up-btn')
const mainContainer = document.querySelector('.main-container')

let buttonValue = ''
let buttonDownValue = ''
function clearButtons(){
    nameBtn.innerHTML ='NAME'
    capitalBtn.innerHTML ='CAPITAL'
    populationBtn.innerHTML ='POPULATION'
}


nameBtn.addEventListener('click', ()=>{
    clearButtons()
    nameBtn.innerHTML ='NAME&nbsp&nbsp<i class="fa-solid fa-arrow-down"></i>'

    buttonValue ='name'
    console.log(buttonValue)
    inputText.dispatchEvent(new Event('input'));
})

capitalBtn.addEventListener('click', ()=>{
    clearButtons()
    capitalBtn.innerHTML ='CAPITAL &nbsp&nbsp<i class="fa-solid fa-arrow-down"></i>'

    buttonValue ='capital'
    console.log(buttonValue)
    inputText.dispatchEvent(new Event('input'));
})

populationBtn.addEventListener('click', ()=>{
    clearButtons()
    populationBtn.innerHTML ='POPULATION &nbsp&nbsp<i class="fa-solid fa-arrow-down"></i>'
    inputText.dispatchEvent(new Event('input'));
})

arrangementBtn.addEventListener('click', ()=>{
    populationBtnDown.scrollIntoView({ behavior: 'smooth' });
})
arrowUpBtn.addEventListener('click', ()=>{
    mainContainer.scrollIntoView({ behavior: 'smooth' });
})

//====
populationBtnDown.addEventListener('click', () => {
    buttonDownValue = 'populationDown'

    inputText.dispatchEvent(new Event('input'));
})
languageBtnDown.addEventListener('click', ()=>{
    buttonDownValue = 'languageDown'

    inputText.dispatchEvent(new Event('input'));
})


function slice(data){
    const slicedData = data.slice(0,10)
    return slicedData
}

window.onload = function() {
    buttonValue = 'name'
    buttonDownValue = 'populationDown'
    inputText.dispatchEvent(new Event('input'));
}

function createTable(data){
    outputFlagContainer.innerHTML = ''
    data.forEach(item =>{
        const outputFlagSmallContainer = document.createElement('div')
        outputFlagSmallContainer.className = 'output-flag-small-container'
        
        const outputFlag = document.createElement('div')
        outputFlag.classList = 'output-flag'

        const flagImg = document.createElement('img')
        flagImg.src = `${item.flag}`

        const outputTitle = document.createElement('div')
        outputTitle.classList = 'output-title'

        const outputTitleText = document.createElement('p')
        outputTitleText.classlist = 'output-title-text'
        outputTitleText.textContent = item.name.toUpperCase()

        const outputInfo = document.createElement('div')
        outputInfo.classList = 'output-info'

        const para1 = document.createElement('p')
        const para2 = document.createElement('p')
        const para3 = document.createElement('p')
        para1.textContent = `Capital:${item.capital}`
        para2.textContent = `Languages:${item.languages}`
        para3.textContent = `Population:${item.population}`


        outputFlagContainer.appendChild(outputFlagSmallContainer)

        outputFlagSmallContainer.appendChild(outputFlag)
        outputFlagSmallContainer.appendChild(outputTitle)
        outputFlagSmallContainer.appendChild(outputInfo)

        outputFlag.appendChild(flagImg)
        outputTitle.appendChild(outputTitleText)
        outputInfo.appendChild(para1)
        outputInfo.appendChild(para2)
        outputInfo.appendChild(para3)




    })
    infoMsg.innerHTML =''
    infoMsg.textContent = `${data.length} countries satisfied the search criteria`
}
function resetChart(){
    columnCountry.innerHTML = ''
    columnChart.innerHTML=''
    columnValue.innerHTML = ''
}
const languageFrequency = (countries) => {
    const languageCount = {};
  
    countries.forEach((country) => {
      country.languages.forEach((language) => {
        languageCount[language] = (languageCount[language] || 0) + 1;
      });
    });
  
    const sortedLanguages = Object.entries(languageCount)
      .sort((a, b) => b[1] - a[1])
      .map(([language, count]) => ({ name: language, count: count }));
  
    return sortedLanguages;
};
const maxValuePopulation = Math.max(...countries.map(item => item.population))

inputText.addEventListener('input', ()=> {
    const query = inputText.value.toLowerCase()
    

    if(buttonValue === 'name'){
        let filteredCountries = countries.filter(country =>
            country.name.toLowerCase().startsWith(query)
        )
        console.log(filteredCountries)
        createTable(filteredCountries)
        if(filteredCountries.length === 0){
            filteredCountries = countries.filter(country =>
                // country.languages içinde arama yap
                country.languages.some(language => language.toLowerCase().startsWith(query))
            );
            console.log(filteredCountries);
            createTable(filteredCountries);
        }


    }else if(buttonValue === 'capital'){
       
        let filteredCountries = countries.filter(country =>
            country.capital && country.capital.toLowerCase().startsWith(query)
            // capital varsa --- buraya gec
        )
        console.log(filteredCountries)
        createTable(filteredCountries)
    }else{
        let filteredCountries = countries.filter(country =>
            country.name.toLowerCase().startsWith(query)
        )
        filteredCountries = filteredCountries.sort((a, b) =>{
            const popA = a.population != null ? a.population : 0;  // Eğer null veya undefined ise 0 al
            const popB = b.population != null ? b.population : 0;  // Aynı şekilde
            return popB - popA;
        })
        console.log(filteredCountries)
        createTable(filteredCountries)
    }

    if(buttonDownValue === 'populationDown'){
        resetChart()

        let filteredCountries = countries.filter(country =>
            country.name.toLowerCase().startsWith(query)
        )
        filteredCountries = filteredCountries.sort((a, b) =>{
            const popA = a.population != null ? a.population : 0;  // Eğer null veya undefined ise 0 al
            const popB = b.population != null ? b.population : 0;  // Aynı şekilde
            return popB - popA;
        })
        filteredCountries.forEach(item =>{
            const textStyle = document.createElement('p')
            textStyle.className = 'text-style'
            textStyle.textContent = item.name
    
            const numberStyle = document.createElement('p')
            numberStyle.className = 'number-style'
            numberStyle.textContent = item.population
    
            const chartStyle = document.createElement('div');
            chartStyle.className = 'chart-style'
            chartStyle.style.width = ((item.population / maxValuePopulation) *100) + '%'
            
            
            columnChart.appendChild(chartStyle)
            columnValue.appendChild(numberStyle)
            columnCountry.appendChild(textStyle)
    
        })
    }else if(buttonDownValue === 'languageDown'){
        resetChart()

        let filteredCountries = countries.filter(country =>
            // country.languages içinde arama yap
            country.languages.some(language => language.toLowerCase().startsWith(query))
        );

        filteredCountries = languageFrequency(filteredCountries)
        const maxValueLanguage = Math.max(...filteredCountries.map(item => item.count))
        console.log(maxValueLanguage)
        filteredCountries.forEach(item =>{
            const textStyle = document.createElement('p')
            textStyle.className = 'text-style'
            textStyle.textContent = item.name
    
            const numberStyle = document.createElement('p')
            numberStyle.className = 'number-style'
            numberStyle.textContent = item.count
    
            const chartStyle = document.createElement('div');
            chartStyle.className = 'chart-style'
            chartStyle.style.width = ((item.count / maxValueLanguage) *100) + '%'
    
            columnChart.appendChild(chartStyle)
            columnValue.appendChild(numberStyle)
            columnCountry.appendChild(textStyle)
    
           
        })
    }
    
})
