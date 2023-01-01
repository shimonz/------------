const select = document.querySelector(".dropdown-menu");
const btn_all_job = document.querySelector("#btn_all_job");
const btn_home = document.querySelector("#btn_home");
const btn_fs = document.querySelector("#btn_fs");
const save_job = document.querySelector("#save_job");
const btn_search = document.querySelector("#btn_search");
const url_cat = "https://remotive.com/api/remote-jobs/categories";
const url_alljobs = " https://remotive.com/api/remote-jobs?limit=50 "
const container = document.querySelector(".container");



const loadFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

let jobes = loadFromStorage("jobes") ? loadFromStorage("jobes") : [];
let full_save = loadFromStorage("full_save") ? loadFromStorage("full_save") : [];

function local_save(job) {

    jobes.push(job);
    localStorage.setItem("jobes", JSON.stringify(jobes));
}



/* ************************  Category tab in nav_Bar   *************************** */


const get_categories = async () => {
    try {
        const response = await fetch(url_cat);
        const data = await response.json();
        /*   console.log(data); */
        data.jobs.map(cat => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.setAttribute("class", "dropdown-item");
            a.setAttribute("href", "");

            a.append(cat.name);
            li.append(a);
            select.append(li);

            a.addEventListener("click", async (e) => {
                e.preventDefault();
                container.innerHTML = "";
                container.innerHTML = `
                 <div class="spinner-border" role="status">
                 <span class="visually-hidden">Loading...</span>
                 </div>
                `;

                const response = await fetch(`https://remotive.com/api/remote-jobs?category=${cat.name}`);
                const data = await response.json();
                console.log(data.jobs);

                card(data.jobs);
            })

        })

    }
    catch (eror) {
        console.log(eror);
    }
}

get_categories()




/* ************************  Clicking the button displays saved jobs   *************************** */


save_job.addEventListener("click", async (e) => {

    e.preventDefault();
    container.innerHTML = "";
    container.innerHTML = `
     <div class="spinner-border" role="status">
     <span class="visually-hidden">Loading...</span>
     </div>
    `;

    try {

        loadFromStorage(save_card(full_save))
    }

    catch (error) {

        container.innerHTML = error;
    }

})


/* ************************ Clicking the button displays All jobs   *************************** */



btn_all_job.addEventListener("click", async (e) => {

    e.preventDefault();
    container.innerHTML = "";
    container.innerHTML = `
     <div class="spinner-border" role="status">
     <span class="visually-hidden">Loading...</span>
     </div>
    `;

    try {

        const response = await fetch(url_alljobs);
        const data = await response.json();
        card(data.jobs);
    }
    catch (error) {

        container.innerHTML = error;
    }

})


/* ************************ Clicking the button displays the tab Full-stack   *************************** */


btn_fs.addEventListener("click", async (e) => {

    e.preventDefault();
    container.innerHTML = "";
    container.innerHTML = `
    <h1>Wellcome to our jobs search service</h1><br>
    <p>To use our service all what you need is agood heart, and a little mind &#129312</p>
    <br><br><hr>
    <h4>Enjoy</h4>
    `;

});


/* ************************  Clicking the button displays the tab Home-page   *************************** */



btn_home.addEventListener("click", async (e) => {

    e.preventDefault();
    container.innerHTML = "";
    container.innerHTML = `
    <h1>Wellcome to our jobs search service</h1><br>
    <p>To use our service all what you need is agood heart, and a little mind &#129312</p>
    <br><br><hr>
    <h4>Enjoy</h4>
    `;

});


/* ************************  Search bar function   *************************** */


btn_search.addEventListener("click", async (e) => {
    e.preventDefault();
    container.innerHTML = "";
    container.innerHTML = `
     <div class="spinner-border" role="status">
     <span class="visually-hidden">Loading...</span>
     </div>
    `;

    const input = document.querySelector("#input_val")
    const val = input.value;

    const response = await fetch(`https://remotive.com/api/remote-jobs?search=${val}`);
    const data = await response.json();
    const new_search = data.jobs;

    if (val === '') {
        container.innerHTML = "";

        card(new_search);

    }

    else if (new_search.length == 0) {
        container.innerHTML = "The search not found";
    }

    else {
        container.innerHTML = "";

        card(new_search);

    }

})



/* ************************  A card function that displays the jobs   *************************** */



function card(array) {

    container.innerHTML = ""
    const row = document.createElement("div");
    row.classList.add("row");

    for (let job of array) {


        const div_1 = document.createElement("div");
        div_1.setAttribute("class", "col-md-4 col-sm-6 mt-3");


        const div_2 = document.createElement("div");
        div_2.setAttribute("class", "card bg-light mb-3 border-primary");


        const div_3 = document.createElement("div");
        div_3.setAttribute("class", "card-header text-center");

        div_3.append(`Company Name : ${job.company_name ?? ""}`);


        const img = document.createElement("img");
        img.setAttribute("src", job.company_logo ?? "")
        img.style = "max-height: 150px; object-fit: contain; margin-top: 20px;"


        const card_body = document.createElement("div");
        card_body.classList.add("card-body");


        const h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title text-center text-decoration-underline");
        h5.append(job.title ?? "");


        const p2 = document.createElement("p");
        p2.classList.add("card-text");
        p2.innerHTML = `${job.description ?? ""}`;
        p2.style = "min-height: 280px; max-height: 280px; overflow: scroll;";


        const p1 = document.createElement("p");
        p1.classList.add("card-text");
        p1.append(`Salary : ${job.salary ?? ""}`);


        const a = document.createElement("a");
        a.setAttribute("class", "btn btn-success");
        a.setAttribute("href", job.url ?? "");
        a.setAttribute("target", "_blank");
        a.style.marginLeft = "12px"
        a.append("See this JOB");


        const i = document.createElement("i");
        i.setAttribute("class", "bi bi-heart");


        const button = document.createElement("button");
        button.setAttribute("class", "btn ml-2");
        button.id = "button";
        button.style.backgroundColor = "#FFC0CB" //#DE3163
        button.innerHTML = `Save this JOB`;


        button.addEventListener("click", () => {
            if (jobes.includes(job.id)) {
                button.innerHTML = "Saved in favorites";
                button.style.backgroundColor = "#DE3163";


            } else {
                jobes.push(job.id);
                console.log("save this job");
                localStorage.setItem("jobes", JSON.stringify(jobes));
                button.innerHTML = `Saved in favorites`
                button.style.backgroundColor = "#DE3163"
                full_save.push(job);
                localStorage.setItem("full_save", JSON.stringify(full_save));


            }

            saveStatus = !saveStatus;
            if (saveStatus) {
                // The user clicked the button for the first time
                button.innerHTML = "Saved in favorites";
                button.style.backgroundColor = "#DE3163";

            } else {
                // The user clicked the button a second time
                delete_job(job.id)
                button.innerHTML = "Save this JOB";
                button.style.backgroundColor = "#FFC0CB";

            }
        })
        if (jobes.includes(job.id)) {
            button.innerHTML = `Saved in favorites`
            button.style.backgroundColor = "#DE3163"
        } else {
            button.innerHTML = `Save this JOB`;
            button.style.backgroundColor = "#FFC0CB"
        }


        button.append(i);

        let saveStatus = false;


        const card_footer = document.createElement("div");
        card_footer.setAttribute("class", "card-footer text-muted");
        card_footer.append(`Type : ${job.job_type ?? ""}`);



        card_body.append(h5, p1, p2, button, a);
        div_2.append(div_3, img, card_body, card_footer);
        div_1.append(div_2);


        row.append(div_1);
    }

    container.append(row);

}

/* ************************  Card function showing the Saved jobs   *************************** */


function save_card(array) {

    container.innerHTML = ""
    const row = document.createElement("div");
    row.classList.add("row");

    for (let job of array) {


        const div_1 = document.createElement("div");
        div_1.setAttribute("class", "col-md-4 col-sm-6 mt-3");


        const div_2 = document.createElement("div");
        div_2.setAttribute("class", "card bg-light mb-3 border-primary");


        const div_3 = document.createElement("div");
        div_3.setAttribute("class", "card-header text-center");

        div_3.append(`Company Name : ${job.company_name ?? ""}`);


        const img = document.createElement("img");
        img.setAttribute("src", job.company_logo ?? "")
        img.style = "max-height: 150px; object-fit: contain; margin-top: 20px;"


        const card_body = document.createElement("div");
        card_body.classList.add("card-body");


        const h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title text-center text-decoration-underline");
        h5.append(job.title ?? "");


        const p2 = document.createElement("p");
        p2.classList.add("card-text");
        p2.innerHTML = `${job.description ?? ""}`;
        p2.style = "min-height: 280px; max-height: 280px; overflow: scroll;";


        const p1 = document.createElement("p");
        p1.classList.add("card-text");
        p1.append(`Salary : ${job.salary ?? ""}`);


        const a = document.createElement("a");
        a.setAttribute("class", "btn btn-success");
        a.setAttribute("href", job.url ?? "");
        a.setAttribute("target", "_blank");
        a.style.marginLeft = "12px"
        a.append("See this JOB");


        const i = document.createElement("i");
        i.setAttribute("class", "bi bi-heart");


        const button = document.createElement("button");
        button.setAttribute("class", "btn ml-2");
        button.id = "button";
        button.style.backgroundColor = "#DE3163"
        button.innerHTML = `Remove &#128151`;
        button.addEventListener("click", () => deleteJob(job.id));

        button.append(i);


        const card_footer = document.createElement("div");
        card_footer.setAttribute("class", "card-footer text-muted");
        card_footer.append(`Type : ${job.job_type ?? ""}`);

        card_body.append(h5, p1, p2, button, a);
        div_2.append(div_3, img, card_body, card_footer);
        div_1.append(div_2);


        row.append(div_1);
    }

    container.append(row);

}



/* ************************  A function that deletes a value from the array  *************************** */


const deleteJob = (id) => {

    full_save = full_save.filter(job => job.id != id);
    jobes = jobes.filter(id1 => id1 != id);

    container.innerHTML = "";
    for (let job of full_save) {
        loadFromStorage(save_card(full_save))

    }
    localStorage.setItem("full_save", JSON.stringify(full_save));
    localStorage.setItem("jobes", JSON.stringify(jobes));

}



const delete_job = (id) => {

    full_save = full_save.filter(job => job.id != id);
    jobes = jobes.filter(id1 => id1 != id);

    for (let job of full_save) {
        loadFromStorage(save_card(full_save))
    }
    localStorage.setItem("full_save", JSON.stringify(full_save));
    localStorage.setItem("jobes", JSON.stringify(jobes));
}



