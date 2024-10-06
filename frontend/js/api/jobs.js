// variable for use in later functions - holds backend URL
const BASE_URL = 'http://localhost:3000';

// get all jobs from backend w/ error handling
export async function getAllJobs() {
    try {
        const response = await fetch(`${BASE_URL}/jobs`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // convert JSON response into javascript object
        const jobs = await response.json();

        return jobs;
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
}

// search for job with provided id w/ error handling
export async function searchJobs(jobId) {
    try {
        const response = await fetch(`${BASE_URL}/jobs?q=${encodeURIComponent(jobId)}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // convert JSON response into javascript object
        const jobs = await response.json();

        return jobs;
    } catch (error) {
        console.error('Error searching for jobs:', error);
    }
}

// get job details using jobId w/ error handling
export async function fetchJobDetails(jobId) {
    try {
        const response = await fetch(`${BASE_URL}/jobs/${jobId}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // convert JSON response into javascript object
        const jobDetails = await response.json();

        return jobDetails;
    } catch (error) {
        console.error('Error fetching job details:', error);
    }
}
