// import functions
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllJobs, searchJobs, fetchJobDetails, saveJob, getSavedJobs } from './api/jobs.js';

// display jobs when called
function displayJobs(jobs) {
    const jobList = document.getElementById('searched-jobs');
    // clear page
    jobList.innerHTML = ''; 

    // error handling
    if (jobs.length === 0) {
        jobList.innerHTML = '<div class="text-dark">No Results Found</div>';
        return;
    }

    jobs.forEach(job => {
        // create card with appropriate information provided
        const jobCard = `
            <li class="job-card card my-1" style="width: 18rem;">
                <div class="card-header">${job.company}</div>
                <div class="card-body">
                    <h5 class="card-title">${job.title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${new Date(job.date_posted).toLocaleDateString()}</h6>
                    <button class="btn btn-primary view-job-button" job-data-id="${job.id}">View Job</button>
                </div>
            </li>`;
        jobList.insertAdjacentHTML('beforeend', jobCard); // add card to page
    });
}

// event handling for form submission
async function handleFormSubmit(event) {
    event.preventDefault(); // prevent refresh

    // get user value for search then query jobs.js
    const searchQuery = document.getElementById('query-input').value; 
    const jobs = await searchJobs(searchQuery); 

    // display results
    displayJobs(jobs);
}

// event handling for view job button
async function handleViewJobClick(event) {
    if (event.target.classList.contains('view-job-button')) {
        // get job id from button attribute then retrieve all data for said id
        const jobId = event.target.getAttribute('job-data-id'); 
        const jobDetails = await fetchJobDetails(jobId);

        // create card with full details
        const jobDetailsCard = `
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">${jobDetails.title}</h3>
                    <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${jobDetails.company}</h4>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${jobDetails.location}</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted ${new Date(jobDetails.date_posted).toLocaleDateString()}</h6>
                    
                    <h5 class="card-subtitle mb-2">Description</h5>
                    <p class="card-text">${jobDetails.description}</p>
                    <h5 class="card-subtitle mb-2">Qualifications</h5>
                    <p class="card-text">${jobDetails.qualifications}</p>
                    <button class="btn btn-success save-job">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                        </svg>
                        Save Job
                    </button>
                </div>
            </div>`;
        // display card
        document.getElementById('job-details-card').innerHTML = jobDetailsCard;
    }
}

// event listener for form submission
document.getElementById('search-jobs-form').addEventListener('submit', handleFormSubmit);

// event listener for view job button
document.getElementById('searched-jobs').addEventListener('click', handleViewJobClick);

// event listener for when page is loaded
window.addEventListener('load', async () => {
    // get and display all jobs
    const jobs = await getAllJobs();
    displayJobs(jobs);
});
