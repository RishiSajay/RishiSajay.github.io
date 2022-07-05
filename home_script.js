//smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => 
    {
        anchor.addEventListener('click', function(e)
        {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView(
            {
                behavior : 'smooth' 
            });
            
        });
});
/////////////////////////////////////////////////////////////////////////////////////

//change navbar background based on position
doc = document.documentElement;
window.addEventListener("scroll", function(event)
{
    navbar = this.document.querySelector('.navbar');
    aboutMe = this.document.querySelector('.about_me_container');
    skills = this.document.querySelector('.skills_container');
    projects = this.document.querySelector('.projects_container');
    contact = this.document.querySelector('.contact_me_container');
    var top  = this.scrollY;

    if (top > 0)
    {
        navbar.classList.remove('aboutMe');
    }
    if (top > (aboutMe.getBoundingClientRect().top + this.scrollY - 80))
    {
        navbar.classList.remove('skills');
        navbar.classList.add('aboutMe');
    }
    if (top > (skills.getBoundingClientRect().top + this.scrollY - 80))
    {
        navbar.classList.remove('aboutMe');
        navbar.classList.remove('projects');
        navbar.classList.add('skills');
    }
    if (top > (skills.getBoundingClientRect().bottom + this.scrollY - 80))
    {
        navbar.classList.remove('skills');
        navbar.classList.remove('contact');
        navbar.classList.add('projects');
    }
    if (top > (contact.getBoundingClientRect().top + this.scrollY - 80))
    {
        navbar.classList.remove('projects');
        navbar.classList.add('contact');
    }
});
/////////////////////////////////////////////////////////////////////////////////////



//change background height based on lowest element location for each section. Useful to adjust to all screen sizes ie mobile, ipad, etc
//intro
home = document.querySelector('.home_container');
introCard = document.querySelector('.intro_card_container');

//about me
aboutMe = document.querySelector('.about_me_container');
myPic = document.querySelector('.my_picture');

//skills
skills = document.querySelector('.skills_container');
skillsBody = document.querySelector('.skills_body_container');

//projects
projects = document.querySelector('.projects_container');
lastProject = document.querySelector('.projects_card:nth-child(5)');

//contact
contact = document.querySelector('.contact_me_container');
message = document.querySelector('.message_container');

resizeHeight = function()
{
  /*
  if(window.innerWidth <= 500)
  {
    height1 = (introCard.getBoundingClientRect().bottom) - (home.getBoundingClientRect().top);
    home.style.height = height1 + "px";
  }
  else
  {
    height1 = (introCard.getBoundingClientRect().bottom + 200) - (home.getBoundingClientRect().top);
    home.style.height = height1 + "px";
  }*/

  height2 = (myPic.getBoundingClientRect().bottom + 150) - (aboutMe.getBoundingClientRect().top);
  aboutMe.style.height = height2 + "px";

  height3 = (skillsBody.getBoundingClientRect().bottom + 200) - (skills.getBoundingClientRect().top);
  skills.style.height = height3 + "px";

  height4 = (lastProject.getBoundingClientRect().bottom + 100) - (projects.getBoundingClientRect().top);
  projects.style.height = height4 + "px";

  height5 = (message.getBoundingClientRect().bottom + 70) - (contact.getBoundingClientRect().top);
  contact.style.height = height5 + "px";
}


window.onload = resizeHeight;
window.addEventListener("resize", resizeHeight);
/////////////////////////////////////////////////////////////////////////////////////

//mobile navbar functionality
const menu1 = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar_menu');
const menuContainer = document.querySelector('.navbar_menu_container');
//const intro = document.querySelector('.intro')

//toggle navbar when you click the 3 bars
menu1.addEventListener('click', function()
{
    menu1.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
    menuContainer.classList.toggle('active');

    if (window.innerWidth <= 500)
    {
      home.classList.toggle('active')
      aboutMe.classList.toggle('active')
      skills.classList.toggle('active')
      projects.classList.toggle('active')
      contact.classList.toggle('active')
    }

});

//disable active class if menu item is clicked
menuLinks.addEventListener('click', function()
{
  if(window.innerWidth <= 1000)
  {
    menu1.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
    menuContainer.classList.toggle('active');
  }
});

/////////////////////////////////////////////////////////////////////////////////////


//info card functionality
const card = document.querySelector('.intro_card');
const text = document.querySelector('.text');

card.addEventListener('click', function()
{
    card.classList.toggle('active');
    text.classList.toggle('active');
});
/////////////////////////////////////////////////////////////////////////////////////
 


//project card functionality
const projectCards = document.querySelectorAll('.projects_card');
const projectTexts = document.querySelectorAll('.projects_card p');

for (let i = 0; i < projectCards.length; i++)
{
    projectCards[i].addEventListener('click', function()
    {
        projectCards[i].classList.toggle('active');
        projectTexts[i].classList.toggle('active');
    });
}
/////////////////////////////////////////////////////////////////////////////////////

//contact me 
//The formspree api is used to generate a message and send it to my email after the user clicks submit
//This section removes the api success screen and puts my own success messages

var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission! I will get back to you as soon as I can";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)