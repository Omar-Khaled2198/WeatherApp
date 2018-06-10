$(document).ready(function () {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.weatherbit.io/v2.0/forecast/daily?ip=auto&days=7&key=6b29a8ccbffb4e888306ae9f9d69698a",
        "method": "GET",
        "headers": {}
    };

    $.ajax(settings).done(function (response) {
        injectData(response,0);
        for(var i=0;i<response['data'].length;i++)
        {
            var date=getTheDay(response['data'][i]['datetime']);
            var button=document.createElement('button');
            button.setAttribute('class','day');
            if(i===0)
                button.style.backgroundColor='transparent';
            button.setAttribute('value',response['data'][i]['datetime']);
            button.innerText=date;
            button.setAttribute('onclick','change(this)');
            document.getElementById('flex3').append(button);
        }
    })
})

function injectData(response,i)
{
    $('#location').html(response['city_name']);
    $('#temp').html(response['data'][i]['temp']+'&#176');
    $('#image-container').children()[0].src='img/icons/'+response['data'][i]['weather']['icon']+'.png';
    $('#wind').html(response['data'][i]['wind_spd']+' m/s');
    $('#description').html(response['data'][i]['weather']['description']);
}

function change(date)
{
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.weatherbit.io/v2.0/forecast/daily?ip=auto&days=7&key=6b29a8ccbffb4e888306ae9f9d69698a",
        "method": "GET",
        "headers": {}
    };

    $.ajax(settings).done(function (response) {
        for(var i=0;i<response['data'].length;i++)
        {
            console.log(date.value);
            if(response['data'][i]['datetime']==date.value)
            {
                injectData(response,i);
                break;
            }
        }
    });

    for(var i=0;i<document.getElementsByClassName("day").length;i++)
        document.getElementsByClassName("day")[i].style.backgroundColor="#1890a8";
    date.style.backgroundColor="transparent";

}


function getTheDay(date)

{

    var myDays= ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    var myDate=new Date(eval('"'+date+'"'));

    return myDays[myDate.getDay()];

}
