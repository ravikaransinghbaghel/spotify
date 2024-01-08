document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get user input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;

    // Get uploaded image
    const profileImage = document.getElementById('profileImage').files[0];
    let imageUrl = '';

    if (profileImage) {
        imageUrl = URL.createObjectURL(profileImage);
    }

    // Display user profile
    displayUserProfile(username, email, bio, imageUrl);
});

function displayUserProfile(username, email, bio, imageUrl) {
    const profileDiv = document.getElementById('displayProfile');

    // Clear previous content
    profileDiv.innerHTML = '';

    // screen hidden 
    let form=document.getElementById('form');
    form.style.display='none'

    let heading=document.getElementById('heading');
    heading.innerHTML='User Profile :-'

    // Create elements to display user profile
    const usernameElement = document.createElement('p');
    usernameElement.textContent = `Username: ${username}`;

    const emailElement = document.createElement('p');
    emailElement.textContent = `Email: ${email}`;

    const bioElement = document.createElement('p');
    bioElement.textContent = `Bio: ${bio}`;

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = 'Profile Image';
    imageElement.style.width = '150px';
    imageElement.style.borderRadius = '50%';
    imageElement.style.border = '5px solid gray';

    // Append elements to display profile
    profileDiv.appendChild(imageElement);
    profileDiv.appendChild(usernameElement);
    profileDiv.appendChild(emailElement);
    profileDiv.appendChild(bioElement);
}
