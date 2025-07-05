let resumeData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        summary: ''
    },
    experience: [],
    education: [],
    skills: []
};

let experienceCounter = 0;
let educationCounter = 0;
let skillCounter = 0;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updatePreview();
});

// Setup event listeners for form inputs
function setupEventListeners() {
    // Personal info listeners
    document.getElementById('fullName').addEventListener('input', updatePersonalInfo);
    document.getElementById('email').addEventListener('input', updatePersonalInfo);
    document.getElementById('phone').addEventListener('input', updatePersonalInfo);
    document.getElementById('location').addEventListener('input', updatePersonalInfo);
    document.getElementById('website').addEventListener('input', updatePersonalInfo);
    document.getElementById('summary').addEventListener('input', updatePersonalInfo);
}

// Update personal info
function updatePersonalInfo() {
    resumeData.personalInfo = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        website: document.getElementById('website').value,
        summary: document.getElementById('summary').value
    };
    updatePreview();
}

// Add experience item
function addExperience() {
    experienceCounter++;
    const experienceItem = {
        id: experienceCounter,
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
    };
    
    resumeData.experience.push(experienceItem);
    
    const container = document.getElementById('experienceContainer');
    const experienceDiv = createExperienceForm(experienceItem);
    container.appendChild(experienceDiv);
    
    updatePreview();
}

// Create experience form element
function createExperienceForm(experience) {
    const div = document.createElement('div');
    div.className = 'experience-item';
    div.setAttribute('data-id', experience.id);
    
    div.innerHTML = `
        <div class="item-header">
            <h3>Experience ${experience.id}</h3>
            <button class="remove-btn" onclick="removeExperience(${experience.id})">Remove</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" data-field="jobTitle" placeholder="Software Engineer">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" data-field="company" placeholder="Tech Corp">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Location</label>
                <input type="text" data-field="location" placeholder="New York, NY">
            </div>
            <div class="form-group">
                <label>Start Date</label>
                <input type="month" data-field="startDate">
            </div>
        </div>
        <div class="form-row">
            <div class="checkbox-group">
                <input type="checkbox" data-field="current" id="current-${experience.id}">
                <label for="current-${experience.id}">Currently work here</label>
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input type="month" data-field="endDate" id="endDate-${experience.id}">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea data-field="description" rows="3" placeholder="Describe your responsibilities and achievements..."></textarea>
        </div>
    `;
    
    // Add event listeners to the new form elements
    const inputs = div.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => updateExperience(experience.id));
    });
    
    // Handle current job checkbox
    const currentCheckbox = div.querySelector(`#current-${experience.id}`);
    const endDateInput = div.querySelector(`#endDate-${experience.id}`);
    
    currentCheckbox.addEventListener('change', function() {
        endDateInput.disabled = this.checked;
        if (this.checked) {
            endDateInput.value = '';
        }
        updateExperience(experience.id);
    });
    
    return div;
}

// Update experience data
function updateExperience(id) {
    const experienceDiv = document.querySelector(`[data-id="${id}"]`);
    const experienceIndex = resumeData.experience.findIndex(exp => exp.id === id);
    
    if (experienceIndex !== -1) {
        const inputs = experienceDiv.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const field = input.getAttribute('data-field');
            if (field) {
                if (input.type === 'checkbox') {
                    resumeData.experience[experienceIndex][field] = input.checked;
                } else {
                    resumeData.experience[experienceIndex][field] = input.value;
                }
            }
        });
        updatePreview();
    }
}

// Remove experience
function removeExperience(id) {
    resumeData.experience = resumeData.experience.filter(exp => exp.id !== id);
    const experienceDiv = document.querySelector(`[data-id="${id}"]`);
    experienceDiv.remove();
    updatePreview();
}

// Add education item
function addEducation() {
    educationCounter++;
    const educationItem = {
        id: educationCounter,
        degree: '',
        institution: '',
        location: '',
        graduationDate: '',
        gpa: ''
    };
    
    resumeData.education.push(educationItem);
    
    const container = document.getElementById('educationContainer');
    const educationDiv = createEducationForm(educationItem);
    container.appendChild(educationDiv);
    
    updatePreview();
}

// Create education form element
function createEducationForm(education) {
    const div = document.createElement('div');
    div.className = 'education-item';
    div.setAttribute('data-id', education.id);
    
    div.innerHTML = `
        <div class="item-header">
            <h3>Education ${education.id}</h3>
            <button class="remove-btn" onclick="removeEducation(${education.id})">Remove</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Degree</label>
                <input type="text" data-field="degree" placeholder="Bachelor of Science in Computer Science">
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" data-field="institution" placeholder="University Name">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Location</label>
                <input type="text" data-field="location" placeholder="City, State">
            </div>
            <div class="form-group">
                <label>Graduation Date</label>
                <input type="month" data-field="graduationDate">
            </div>
        </div>
        <div class="form-group">
            <label>GPA (Optional)</label>
            <input type="text" data-field="gpa" placeholder="3.8">
        </div>
    `;
    
    // Add event listeners
    const inputs = div.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => updateEducation(education.id));
    });
    
    return div;
}

// Update education data
function updateEducation(id) {
    const educationDiv = document.querySelector(`[data-id="${id}"]`);
    const educationIndex = resumeData.education.findIndex(edu => edu.id === id);
    
    if (educationIndex !== -1) {
        const inputs = educationDiv.querySelectorAll('input');
        inputs.forEach(input => {
            const field = input.getAttribute('data-field');
            if (field) {
                resumeData.education[educationIndex][field] = input.value;
            }
        });
        updatePreview();
    }
}

// Remove education
function removeEducation(id) {
    resumeData.education = resumeData.education.filter(edu => edu.id !== id);
    const educationDiv = document.querySelector(`[data-id="${id}"]`);
    educationDiv.remove();
    updatePreview();
}

// Add skill category
function addSkill() {
    skillCounter++;
    const skillItem = {
        id: skillCounter,
        category: '',
        items: []
    };
    
    resumeData.skills.push(skillItem);
    
    const container = document.getElementById('skillsContainer');
    const skillDiv = createSkillForm(skillItem);
    container.appendChild(skillDiv);
    
    updatePreview();
}

// Create skill form element
function createSkillForm(skill) {
    const div = document.createElement('div');
    div.className = 'skill-item';
    div.setAttribute('data-id', skill.id);
    
    div.innerHTML = `
        <div class="item-header">
            <h3>Skill Category ${skill.id}</h3>
            <button class="remove-btn" onclick="removeSkill(${skill.id})">Remove</button>
        </div>
        <div class="form-group">
            <label>Category Name</label>
            <input type="text" data-field="category" placeholder="Technical Skills">
        </div>
        <div class="form-group">
            <label>Skills (Press Enter to add)</label>
            <input type="text" class="skill-input-field" placeholder="Add a skill and press Enter" onkeypress="addSkillTag(event, ${skill.id})">
            <div class="skills-input" id="skillTags-${skill.id}">
                <!-- Skill tags will be added here -->
            </div>
        </div>
    `;
    
    // Add event listener for category name
    const categoryInput = div.querySelector('input[data-field="category"]');
    categoryInput.addEventListener('input', () => updateSkill(skill.id));
    
    return div;
}

// Add skill tag
function addSkillTag(event, skillId) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = event.target;
        const skillText = input.value.trim();
        
        if (skillText) {
            const skillIndex = resumeData.skills.findIndex(skill => skill.id === skillId);
            if (skillIndex !== -1) {
                resumeData.skills[skillIndex].items.push(skillText);
                input.value = '';
                renderSkillTags(skillId);
                updatePreview();
            }
        }
    }
}

// Render skill tags
function renderSkillTags(skillId) {
    const skillIndex = resumeData.skills.findIndex(skill => skill.id === skillId);
    if (skillIndex !== -1) {
        const container = document.getElementById(`skillTags-${skillId}`);
        const skills = resumeData.skills[skillIndex].items;
        
        container.innerHTML = skills.map((skill, index) => `
            <span class="skill-tag">
                ${skill}
                <button class="remove-tag" onclick="removeSkillTag(${skillId}, ${index})">×</button>
            </span>
        `).join('');
    }
}

// Remove skill tag
function removeSkillTag(skillId, tagIndex) {
    const skillIndex = resumeData.skills.findIndex(skill => skill.id === skillId);
    if (skillIndex !== -1) {
        resumeData.skills[skillIndex].items.splice(tagIndex, 1);
        renderSkillTags(skillId);
        updatePreview();
    }
}

// Update skill data
function updateSkill(id) {
    const skillDiv = document.querySelector(`[data-id="${id}"]`);
    const skillIndex = resumeData.skills.findIndex(skill => skill.id === id);
    
    if (skillIndex !== -1) {
        const categoryInput = skillDiv.querySelector('input[data-field="category"]');
        resumeData.skills[skillIndex].category = categoryInput.value;
        updatePreview();
    }
}

// Remove skill category
function removeSkill(id) {
    resumeData.skills = resumeData.skills.filter(skill => skill.id !== id);
    const skillDiv = document.querySelector(`[data-id="${id}"]`);
    skillDiv.remove();
    updatePreview();
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString + '-01'); // Add day for month input
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

// Update preview section
function updatePreview() {
    // Update name
    const nameElement = document.getElementById('previewName');
    nameElement.textContent = resumeData.personalInfo.fullName || 'Your Name';
    
    // Update contact info
    const contactElement = document.getElementById('previewContact');
    const contactInfo = [];
    if (resumeData.personalInfo.email) contactInfo.push(`<span>${resumeData.personalInfo.email}</span>`);
    if (resumeData.personalInfo.phone) contactInfo.push(`<span>${resumeData.personalInfo.phone}</span>`);
    if (resumeData.personalInfo.location) contactInfo.push(`<span>${resumeData.personalInfo.location}</span>`);
    if (resumeData.personalInfo.website) contactInfo.push(`<span>${resumeData.personalInfo.website}</span>`);
    contactElement.innerHTML = contactInfo.join('');
    
    // Update summary
    const summarySection = document.getElementById('previewSummary');
    const summaryText = document.getElementById('previewSummaryText');
    if (resumeData.personalInfo.summary) {
        summaryText.textContent = resumeData.personalInfo.summary;
        summarySection.style.display = 'block';
    } else {
        summarySection.style.display = 'none';
    }
    
    // Update experience
    const experienceSection = document.getElementById('previewExperience');
    const experienceList = document.getElementById('previewExperienceList');
    if (resumeData.experience.length > 0) {
        experienceList.innerHTML = resumeData.experience.map(exp => `
            <div class="experience-preview">
                <div class="experience-header">
                    <div class="experience-title">
                        <h3>${exp.jobTitle}</h3>
                        <p class="experience-company">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</p>
                    </div>
                    <div class="experience-date">
                        ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                </div>
                ${exp.description ? `<div class="experience-description">${exp.description.split('\n').map(line => `<p>${line}</p>`).join('')}</div>` : ''}
            </div>
        `).join('');
        experienceSection.style.display = 'block';
    } else {
        experienceSection.style.display = 'none';
    }
    
    // Update education
    const educationSection = document.getElementById('previewEducation');
    const educationList = document.getElementById('previewEducationList');
    if (resumeData.education.length > 0) {
        educationList.innerHTML = resumeData.education.map(edu => `
            <div class="education-preview">
                <div class="education-header">
                    <div class="education-title">
                        <h3>${edu.degree}</h3>
                        <p class="education-institution">${edu.institution}${edu.location ? ` • ${edu.location}` : ''}</p>
                        ${edu.gpa ? `<p style="font-size: 0.875rem; color: #64748b;">GPA: ${edu.gpa}</p>` : ''}
                    </div>
                    <div class="education-date">
                        ${formatDate(edu.graduationDate)}
                    </div>
                </div>
            </div>
        `).join('');
        educationSection.style.display = 'block';
    } else {
        educationSection.style.display = 'none';
    }
    
    // Update skills
    const skillsSection = document.getElementById('previewSkills');
    const skillsList = document.getElementById('previewSkillsList');
    if (resumeData.skills.length > 0) {
        skillsList.innerHTML = resumeData.skills.map(skillCategory => `
            <div class="skill-category">
                <h3>${skillCategory.category}</h3>
                <div class="skill-tags">
                    ${skillCategory.items.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `).join('');
        skillsSection.style.display = 'block';
    } else {
        skillsSection.style.display = 'none';
    }
}

// Print resume
function printResume() {
    window.print();
}