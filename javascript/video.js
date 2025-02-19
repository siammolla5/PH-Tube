function timeSpiniSet(time) {
  const hour = parseInt(time / 3600);
  let hourRemenider = hour % 3600;
  const minute = parseInt(hourRemenider / 60);
  hourRemenider = hourRemenider % 60;
  return `${hour} hour ${minute} minute ${hourRemenider} secnd ago `;
}
const lodeVideo = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeButton = document.getElementById(`btn-${id}`);
      activeButton.classList.add("active");
      displyVideo(data.category);
    }) /////
    .catch((error) => console.log(error));
};
const removeActiveClass = () => {
  const buttons = document.getElementById("category-btn");
  console.log("this is my buttons ", buttons);
};

const dataLoded = () => {
  fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayDataLode(data.categories))
    .catch((error) => console.log(error));
};

// {
//   "category_id": "1001",
//   "category": "Music"
// }
const displayDataLode = (catagoris) => {
  const showCatagoris = document.getElementById("catagoris");
  catagoris.forEach((item) => {
    console.log(item);

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="lodeVideo(${item.category_id})" class="category-btn">
    ${item.category}
    </button>
    `;
    showCatagoris.append(buttonContainer);
  });
};

const videoLoded = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((Response) => Response.json())
    .then((data) => displyVideo(data.videos))
    .catch((error) => console.log(error));
};
const cardDemo = {
  category_id: "1001",
  video_id: "aaaa",
  thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
  title: "Shape of You",
  authors: [
    {
      profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
      profile_name: "Olivia Mitchell",
      verified: "",
    },
  ],
  others: {
    views: "100K",
    posted_date: "16278",
  },
  description:
    "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey.",
};
const displyVideo = (videoData) => {
  console.log("tis is video", videoData);
  const videoContainer = document.getElementById("video ");
  videoContainer.innerHTML = "";
  if (videoData.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-screen flex flex-col gap-5 relative  justify-center items-center">
    <img src="https://img.icons8.com/?size=160&id=nIZ6QarDy4M7&format=png" >
    <h2 class="font-bold text-2xl"> No content Here in  this category</h2>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }
  videoData.forEach((items) => {
    console.log(items);
    const card = document.createElement("div");
    card.classList = "card card-compact ";
    card.innerHTML = `
    <figure class="h-[200px] relative">
    <img
      src=${items.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
     
      ${
        items.others.posted_date?.length == 0
          ? ""
          : ` <span class="absolute right-2 bottom-2 bg-black p-2 rounded text-white text-xs">${timeSpiniSet(
              items.others.posted_date
            )}</span>`
      }
     
  </figure>
<div class="px-0 py-2 flex  gap-2">
    
   <div> 
    <img class="h-10 w-10 rounded-full object-cover" src="${items.authors[0].profile_picture}" 
   </div>


  <div>
  <h2 class="font-bold">${items.title}</h2>
   
   <div class="flex items-center gap-3">
    <p class="text-gray-500 font-semibold">${items.authors[0].profile_name}</p>
    ${
      items.authors[0].verified == true
        ? `<img class="h-5 w-5" src="https://img.icons8.com/?size=64&id=7sSZVDKAbwO0&format=png" >`
        : " "
    }
   
   </div>
    <p></p>
  </div>
  

</div>
    
    `;
    videoContainer.append(card);
  });
};

dataLoded();
videoLoded();
