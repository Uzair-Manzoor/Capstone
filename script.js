const gElem = (x) => document.querySelector(x);
const gElemAll = (x) => document.querySelectorAll(x);
const toggleMnav = () => gElem('.m-nav').classList.toggle('df');
const menu = gElem('.menu-icon');
menu.addEventListener('click', toggleMnav);

gElemAll('.m-nav .nav-link').forEach((item) => {
  item.addEventListener('click', toggleMnav);
});

gElem('.cross-icon').addEventListener('click', toggleMnav);

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.onscroll = () => {
  sections.forEach((section) => {
    const top = window.scrollY;
    const offset = section.offsetTop - 200;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (top >= offset && top < height + offset) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        document.querySelectorAll(`a[href*=${id}]`).forEach((item) => item.classList.add('active'));
      });
    }
  });
};
const toursData = [
  {
    id: 'tour1',
    profileImage: './resources/image/Samina Baig.jpg',
    name: 'Samina Baig',
    position: 'Karwan Leaders',
    description: 'Pakistani Mountaineer and first woman to summit K2 also by climbing Mount Everest made Pakistan proud',
  },
  {
    id: 'tour2',
    profileImage: './resources/image/Uzair Kiyani 4.jpg',
    name: 'Uzair Manzoor',
    position: 'Karwan Leaders',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque error earum minus aliquam obcaecati',
  },
  {
    id: 'tour3',
    profileImage: './resources/image/Uzair Kiyani 2.jpg',
    name: 'Uzair Manzoor',
    position: 'Karwan Leaders',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque error earum minus aliquam obcaecati',
  },
  {
    id: 'tour4',
    profileImage: './resources/image/Uzair Kiyani 3.jpg',
    name: 'Uzair Manzoor',
    position: 'Karwan Leaders',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque error earum minus aliquam obcaecati',
  },
  {
    id: 'tour5',
    profileImage: './resources/image/Uzair Kiyani 1.jpg',
    name: 'Uzair Manzoor',
    position: 'Karwan Leaders',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque error earum minus aliquam obcaecati',
  },
  {
    id: 'tour6',
    profileImage: './resources/image/Uzair Kiyani.jpg',
    name: 'Uzair Manzoor',
    position: 'Karwan Leaders',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque error earum minus aliquam obcaecati',
  },
];

let currentPage = 1;
const perpage = 3;

const seeMoreTours = document.querySelector('.see-more-tours');
const updateTourDom = (data, hasPage, d = false) => {
  let mobileTour = document.querySelector('#m-tour-group');

  if (d) {
    mobileTour = document.querySelector('#d-tour-group');
  }

  if (!hasPage && !d) {
    seeMoreTours.classList.remove('df');
  } else {
    seeMoreTours.classList.add('df');
  }

  data.forEach((item) => {
    const mobileTourList = document.createElement('li');
    mobileTourList.id = item.id;
    mobileTourList.className = 'tour-list';
    mobileTourList.innerHTML = `
    <div class="tour-img">
      <img class="tiles" src="./resources/image/tiles.png" alt="tiles"/>
      <img class="profile" src="${item.profileImage}" alt="${item.name}"/>
    </div>
    <div class="tour-info">
      <h3 class="tour-name">${item.name}</h3>
      <h6 class="tour-position">
        ${item.position}
      </h6>
      <P class="tour-details">${item.description}</P>
    </div>`;
    mobileTour.append(mobileTourList);
  });
};

const fecthTourDataForMobile = (page = 1) => {
  currentPage = page;
  const hasPage = currentPage * perpage < toursData.length;
  const mobileTourArr = [];
  if (perpage < toursData.length) {
    for (
      let i = Math.abs(currentPage * perpage - perpage);
      i < currentPage * perpage && i <= toursData.length && i >= 0; i += 1) {
      mobileTourArr.push(toursData[i]);
    }
  }

  updateTourDom(mobileTourArr, hasPage);
};

seeMoreTours.addEventListener('click', () => {
  if (currentPage * perpage < toursData.length) {
    fecthTourDataForMobile(currentPage + 1);
  } else {
    seeMoreTours.classList.remove('df');
  }
});

const fecthTourDataForDesktop = () => updateTourDom(toursData, false, true);

window.onload = () => {
  fecthTourDataForMobile();
  fecthTourDataForDesktop();
};
