
const spinner = (displaystyle, displaystyle1) => {
    document.getElementById('spinner').style.display = displaystyle;
    document.getElementById('parent').style.display = displaystyle1;
};

const togglebutton = (show) => {
    document.getElementById('showall').style.display = show;
}

const hideall = (hide) => {
    document.getElementById('parent1').style.display = hide;
}
const hideall1 = (hide) => {
    document.getElementById('father').style.display = hide;
}


const searchfood = () => {
    const inputfield = document.getElementById('input');
    const getinputvalue = inputfield.value;

    spinner('block', 'none');
    hideall('none');
    hideall1('none');

    inputfield.value = '';
    console.log(getinputvalue);


    const url = ` https://openapi.programming-hero.com/api/phones?search=${getinputvalue}

    `

    fetch(url)
        .then(res => res.json())
        .then(data => showitem(data.data))




    const showitem = (phones) => {
        //console.log(phones);
        const parent = document.getElementById('parent');
        parent.textContent = '';

        document.getElementById('showall').addEventListener('click', function () {
            showall(phones);
        })


        const items = phones.slice(0, 3);
        //console.log(items)

        if (items.length === 0) {
            const hub = document.getElementById('newhub');
            const info = document.createElement('div');
            info.innerHTML = `
            <div id="error" class="card text-dark bg-info  w-50 mx-auto mt-5 pt-5" >
                <div class="card-header text-center fw-bold">Sorry Data Not Found</div>
            </div>
            `
            hub.appendChild(info);
            spinner('none', 'none');
            hideall('none');
            hideall1('none');
            togglebutton('none')
        }

        items.forEach(phone => {

            const newdiv = document.createElement('div');
            newdiv.classList.add('col')
            newdiv.innerHTML = `
          
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${phone.brand}</h5>
                    <p class="card-text text-$gray-800 ">click on the details button to see the details</p>
                </div>
                
                 <button class="btn btn-outline-secondary btn-primary text-white FW-BOLD w-50" onclick="singleitem('${phone.slug}')">details</button>
            </div>`;
            // console.log(food.slug);

            parent.appendChild(newdiv);
            spinner('none', 'flex');
            togglebutton('block');



        });




    }




}



const singleitem = (singlephone) => {
    const url = `https://openapi.programming-hero.com/api/phone/${singlephone}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaysingle(data.data));

}

const displaysingle = (single) => {

    const father = document.getElementById('father');
    const newdiv2 = document.createElement('div');
    newdiv2.innerHTML = `
        <div class="card" style="width: 18rem;">
           <img src="${single.image}" class="card-img-top" alt="...">
           <div class="card-body">
           <h5 class="card-title">${single.name ? single.name : 'phone'}</h5>
           <p class="card-text">"${single.mainFeatures.storage ? single.mainFeatures.storage : 'Features are not avaiable'}"</p>
           <p class="card-text">"${single.mainFeatures.sensors ? single.mainFeatures.sensors : 'Features are not available'}"</p>
           <p class="card-text">"${single.others.WLAN ? single.others.WLAN : 'Features are not available'}"</p>
           <p>${single.releaseDate ? single.releaseDate : 'release date has not been updated'}</p>
           <a href="https://www.tomsguide.com/" target="blank" class="btn btn-primary">watch review</a>
  </div>
</div>`;

    father.appendChild(newdiv2);
    hideall1('block');

}

const showall = (all) => {
    const parent = document.getElementById('parent1');
    parent.textContent = '';

    //const items = phones.slice(0, 2);
    //console.log(items)

    if (all.length === 0) {
        const hub = document.getElementById('newhub');
        const info = document.createElement('div');
        info.innerHTML = `
            <div class="card text-dark bg-info  w-50 mx-auto" >
                <div class="card-header text-center fw-bold">Sorry Data Not Found</div>
            </div>
            `
        hub.appendChild(info);
        spinner('none', 'none');
        hideall('none');
        hideall1('none');
        togglebutton('none')
    }

    all.forEach(phone => {

        const newdiv = document.createElement('div');
        newdiv.classList.add('col')
        newdiv.innerHTML = `
          
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${phone.brand}</h5>
                    <p class="card-text text-primary">click on the details button to see the details</p>
                </div>
                <button class="btn btn-outline-secondary btn-primary text-white FW-BOLD w-50" onclick="singleitem('${phone.slug}')">details</button>
                
            </div>`;
        // console.log(food.slug);

        parent.appendChild(newdiv);
        spinner('none', 'none');
        togglebutton('none');
        hideall('flex');


    });
}


