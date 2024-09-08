// Regular Expressions for validation
const strRegex: RegExp = /^[a-zA-Z\s]*$/; // Only letters and spaces
const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex: RegExp = /^\d+$/; // Only digits

// HTML Form Elements
const mainForm = document.getElementById('cv-form') as HTMLFormElement | null;

// Validation types enum
enum ValidType {
    TEXT = 'text',
    TEXT_EMP = 'text_emp',
    EMAIL = 'email',
    DIGIT = 'digit',
    PHONENO = 'phoneno',
    ANY = 'any',
}

// User input elements
const firstnameElem = mainForm?.firstname as HTMLInputElement;
const middlenameElem = mainForm?.middlename as HTMLInputElement;
const lastnameElem = mainForm?.lastname as HTMLInputElement;
const imageElem = mainForm?.image as HTMLInputElement;
const designationElem = mainForm?.designation as HTMLInputElement;
const addressElem = mainForm?.address as HTMLInputElement;
const emailElem = mainForm?.email as HTMLInputElement;
const phonenoElem = mainForm?.phoneno as HTMLInputElement;
const summaryElem = mainForm?.summary as HTMLTextAreaElement;

// Display elements
const nameDsp = document.getElementById('fullname_dsp') as HTMLElement;
const imageDsp = document.getElementById('image_dsp') as HTMLImageElement;
const phonenoDsp = document.getElementById('phoneno_dsp') as HTMLElement;
const emailDsp = document.getElementById('email_dsp') as HTMLElement;
const addressDsp = document.getElementById('address_dsp') as HTMLElement;
const designationDsp = document.getElementById('designation_dsp') as HTMLElement;
const summaryDsp = document.getElementById('summary_dsp') as HTMLElement;
const projectsDsp = document.getElementById('projects_dsp') as HTMLElement;
const achievementsDsp = document.getElementById('achievements_dsp') as HTMLElement;
const skillsDsp = document.getElementById('skills_dsp') as HTMLElement;
const educationsDsp = document.getElementById('educations_dsp') as HTMLElement;
const experiencesDsp = document.getElementById('experiences_dsp') as HTMLElement;

// Function to fetch values
const fetchValues = (attrs: string[], ...nodeLists: NodeListOf<HTMLInputElement | HTMLTextAreaElement>[]): object[] => {
    const elemsAttrsCount = nodeLists.length;
    const elemsDataCount = nodeLists[0].length;
    let tempDataArr: object[] = [];

    for (let i = 0; i < elemsDataCount; i++) {
        let dataObj: { [key: string]: string } = {};
        for (let j = 0; j < elemsAttrsCount; j++) {
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
};

// Function to get user inputs
const getUserInputs = (): object => {
    const achievementsTitleElem = document.querySelectorAll('.achieve_title') as NodeListOf<HTMLInputElement>;
    const achievementsDescriptionElem = document.querySelectorAll('.achieve_description') as NodeListOf<HTMLTextAreaElement>;

    const expTitleElem = document.querySelectorAll('.exp_title') as NodeListOf<HTMLInputElement>;
    const expOrganizationElem = document.querySelectorAll('.exp_organization') as NodeListOf<HTMLInputElement>;
    const expLocationElem = document.querySelectorAll('.exp_location') as NodeListOf<HTMLInputElement>;
    const expStartDateElem = document.querySelectorAll('.exp_start_date') as NodeListOf<HTMLInputElement>;
    const expEndDateElem = document.querySelectorAll('.exp_end_date') as NodeListOf<HTMLInputElement>;
    const expDescriptionElem = document.querySelectorAll('.exp_description') as NodeListOf<HTMLTextAreaElement>;

    const eduSchoolElem = document.querySelectorAll('.edu_school') as NodeListOf<HTMLInputElement>;
    const eduDegreeElem = document.querySelectorAll('.edu_degree') as NodeListOf<HTMLInputElement>;
    const eduCityElem = document.querySelectorAll('.edu_city') as NodeListOf<HTMLInputElement>;
    const eduStartDateElem = document.querySelectorAll('.edu_start_date') as NodeListOf<HTMLInputElement>;
    const eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date') as NodeListOf<HTMLInputElement>;
    const eduDescriptionElem = document.querySelectorAll('.edu_description') as NodeListOf<HTMLTextAreaElement>;

    const projTitleElem = document.querySelectorAll('.proj_title') as NodeListOf<HTMLInputElement>;
    const projLinkElem = document.querySelectorAll('.proj_link') as NodeListOf<HTMLInputElement>;
    const projDescriptionElem = document.querySelectorAll('.proj_description') as NodeListOf<HTMLTextAreaElement>;

    const skillElem = document.querySelectorAll('.skill') as NodeListOf<HTMLInputElement>;

    return {
        firstname: firstnameElem?.value ,
        middlename: middlenameElem?.value,
        lastname: lastnameElem?.value,
        designation: designationElem?.value,
        address: addressElem?.value,
        email: emailElem?.value,
        phoneno: phonenoElem?.value,
        summary: summaryElem?.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem),
    };
};

// Form validation
const validateFormData = (elem: HTMLInputElement | HTMLTextAreaElement, elemType: ValidType, elemName: string) => {
    const value = elem.value.trim();
    let isValid = true;

    if (elemType === ValidType.TEXT || elemType === ValidType.TEXT_EMP) {
        isValid = strRegex.test(value) && (elemType === ValidType.TEXT ? value.length > 0 : true);
    } else if (elemType === ValidType.EMAIL) {
        isValid = emailRegex.test(value);
    } else if (elemType === ValidType.PHONENO) {
        isValid = phoneRegex.test(value);
    } else if (elemType === ValidType.ANY) {
        isValid = value.length > 0;
    }

    if (!isValid) {
        addErrMsg(elem, elemName);
    } else {
        removeErrMsg(elem);
    }
};

// Error message handlers
const addErrMsg = (formElem: HTMLInputElement | HTMLTextAreaElement, formElemName: string) => {
    const nextElem = formElem.nextElementSibling as HTMLElement | null;
    if (nextElem) {
        nextElem.innerHTML = `${formElemName} is invalid`;
    }
};

const removeErrMsg = (formElem: HTMLInputElement | HTMLTextAreaElement) => {
    const nextElem = formElem.nextElementSibling as HTMLElement | null;
    if (nextElem) {
        nextElem.innerHTML = '';
    }
};

// Show the list data
const showListData = (listData: object[], listContainer: HTMLElement) => {
    listContainer.innerHTML = '';
    listData.forEach(listItem => {
        const itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');

        for (const key in listItem) {
            const subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }

        listContainer.appendChild(itemElem);
    });
};

// Display the CV
const displayCV = (userData: any) => {
    nameDsp.innerHTML = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
};

// generate CV
const generateCV = () => {
    let userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
}

// function previewImage(){
//     let oFReader = new FileReader();
//     oFReader.readAsDataURL(imageElem.files[0]);
//     oFReader.onload = function(ofEvent){
//         imageDsp.src = ofEvent.target.result;
//     }
// }
function previewImage(): void {
    const imageElem = document.getElementById("imageElem.files[0]") as HTMLInputElement;
    const imageDsp = document.getElementById('yourImageDisplayId') as HTMLImageElement;

    if (imageElem && imageElem.files && imageElem.files[0]) {
        const oFReader = new FileReader();
        oFReader.readAsDataURL(imageElem.files[0]);

        oFReader.onload = function (ofEvent: ProgressEvent<FileReader>) {
            if (ofEvent.target) {
                imageDsp.src = ofEvent.target.result as string;
            }
        };
    }
}

// print CV
function printCV(){
    window.print();
}