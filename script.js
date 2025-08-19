// DOM Elements
const photoUploadArea = document.getElementById('photoUploadArea');
const photoInput = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');
const photoPreviewWrapper = document.getElementById('photoPreviewWrapper');
const removePhotoBtn = document.getElementById('removePhotoBtn');

const signatureUploadArea = document.getElementById('signatureUploadArea');
const signatureInput = document.getElementById('signatureInput');
const signaturePreview = document.getElementById('signaturePreview');
const signaturePreviewWrapper = document.getElementById('signaturePreviewWrapper');
const removeSignatureBtn = document.getElementById('removeSignatureBtn');

const downloadBtn = document.getElementById('downloadBtn');
const viewBtn = document.getElementById('viewBtn');
const resetBtn = document.getElementById('resetBtn');
const successMessage = document.getElementById('successMessage');
const issueDate = document.getElementById('issueDate');

// Language toggle buttons
const banglaBtn = document.getElementById('banglaBtn');
const englishBtn = document.getElementById('englishBtn');

// Bangla and English digits mapping
const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Set today's date in DD/MM/YYYY format (always in Bangla)
function setCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    
    issueDate.value = toBanglaNumber(day + '/' + month + '/' + year);
}

// Convert English number to Bangla
function toBanglaNumber(number) {
    return number.toString().replace(/[0-9]/g, digit => banglaDigits[digit]);
}

// Convert Bangla number to English
function fromBanglaNumber(banglaNumber) {
    return banglaNumber.toString().replace(/[০-৯]/g, digit => banglaDigits.indexOf(digit));
}

// Function to convert Bangla digits to English
function convertToEnglishNumber(input) {
    return input.replace(/[০-৯]/g, function(digit) {
        return englishDigits[banglaDigits.indexOf(digit)];
    });
}

// Function to allow only English digits
function allowOnlyEnglishDigits(input) {
    return input.replace(/[^0-9]/g, '');
}

// NID Number Field (10 digits only)
document.getElementById('nidNumber').addEventListener('input', function(e) {
    let convertedValue = convertToEnglishNumber(this.value);
    convertedValue = allowOnlyEnglishDigits(convertedValue);
    
    if (convertedValue.length > 10) {
        convertedValue = convertedValue.substring(0, 10);
    }
    
    this.value = convertedValue;
});

// PIN Number Field (10 or 17 digits)
document.getElementById('pinNumber').addEventListener('input', function(e) {
    let convertedValue = convertToEnglishNumber(this.value);
    convertedValue = allowOnlyEnglishDigits(convertedValue);
    
    if (convertedValue.length > 17) {
        convertedValue = convertedValue.substring(0, 17);
    }
    
    this.value = convertedValue;
});

// Validate date in DD/MM/YYYY format (Bangla)
function validateDate(dateStr) {
    if (!dateStr) return false;
    
    const englishDateStr = dateStr.replace(/[০-৯]/g, digit => banglaDigits.indexOf(digit));
    const parts = englishDateStr.split('/');
    if (parts.length !== 3) return false;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2999) {
        return false;
    }
    
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() + 1 === month && date.getFullYear() === year;
}

// Format date input automatically with validation and auto-conversion to Bangla
issueDate.addEventListener('input', function(e) {
    let convertedValue = this.value.replace(/[0-9]/g, digit => banglaDigits[digit]);
    convertedValue = convertedValue.replace(/[^০-৯/]/g, '');
    
    const valueWithoutSlashes = convertedValue.replace(/\//g, '');
    
    if (valueWithoutSlashes.length > 0) {
        let day = valueWithoutSlashes.substring(0, 2);
        if (day.length > 0) {
            const dayNum = parseInt(fromBanglaNumber(day)) || 0;
            if (dayNum > 31) {
                day = '৩১';
            }
        }
        
        let formattedValue = day;
        
        if (valueWithoutSlashes.length > 2) {
            let month = valueWithoutSlashes.substring(2, 4);
            if (month.length > 0) {
                const monthNum = parseInt(fromBanglaNumber(month)) || 0;
                if (monthNum > 12) {
                    month = '১২';
                }
            }
            
            formattedValue += '/' + month;
            
            if (valueWithoutSlashes.length > 4) {
                let year = valueWithoutSlashes.substring(4, 8);
                if (year.length > 4) {
                    year = year.substring(0, 4);
                }
                formattedValue += '/' + year;
            }
        }
        
        this.value = formattedValue;
    } else {
        this.value = '';
    }
});

// Validate NID number (10 digits)
function validateNID(nid) {
    return /^\d{10}$/.test(nid);
}

// Validate PIN number (10 or 17 digits)
function validatePIN(pin) {
    return /^\d{10}$/.test(pin) || /^\d{17}$/.test(pin);
}

// Date of Birth (DOB) Field Handling - Auto-formatted version with Bangla to English conversion (1900-2999)
document.getElementById('dob').addEventListener('input', function(e) {
    // Save cursor position and input value
    const cursorPos = this.selectionStart;
    let value = this.value;
    const originalLength = value.length;
    
    // Convert Bangla numbers to English
    value = value.replace(/[০-৯]/g, function(digit) {
        return banglaDigits.indexOf(digit);
    });
    
    // Remove all non-alphanumeric characters except spaces
    value = value.replace(/[^a-zA-Z0-9 ]/g, '');
    
    // Split into parts based on existing spaces
    let parts = value.split(' ');
    parts = parts.filter(part => part !== '');
    
    // Process day part (01-31)
    let day = parts[0] || '';
    if (day.length > 0) {
        // Allow only digits
        day = day.replace(/\D/g, '');
        
        // Limit to 2 digits and valid day (01-31)
        if (day.length > 2) day = day.substring(0, 2);
        if (day.length > 0) {
            const dayNum = parseInt(day) || 0;
            day = Math.min(31, Math.max(1, dayNum)).toString().padStart(2, '0');
        }
    }
    
    // Process month part (Jan-Dec)
    let month = parts[1] || '';
    if (month.length > 0) {
        // Allow only letters
        month = month.replace(/[^a-zA-Z]/g, '');
        
        // Convert to proper case (Jan, Feb, etc.)
        if (month.length > 0) {
            const monthMap = {
                'jan': 'Jan', 'feb': 'Feb', 'mar': 'Mar', 'apr': 'Apr', 
                'may': 'May', 'jun': 'Jun', 'jul': 'Jul', 'aug': 'Aug', 
                'sep': 'Sep', 'oct': 'Oct', 'nov': 'Nov', 'dec': 'Dec'
            };
            
            // Match first 3 letters of month
            const monthKey = month.toLowerCase().substring(0, 3);
            if (monthMap[monthKey]) {
                month = monthMap[monthKey];
            } else {
                // If not a valid month, keep only what matches
                month = '';
                for (let i = 1; i <= monthKey.length; i++) {
                    const partialKey = monthKey.substring(0, i);
                    for (const [key, val] of Object.entries(monthMap)) {
                        if (key.startsWith(partialKey)) {
                            month = val.substring(0, i);
                            break;
                        }
                    }
                }
            }
        }
    }
    
    // Process year part (4 digits, 1900-2999)
    let year = parts[2] || '';
    if (year.length > 0) {
        // Allow only digits
        year = year.replace(/\D/g, '');
        
        // Limit to 4 digits
        if (year.length > 4) year = year.substring(0, 4);
        
        // Validate year range (1900-2999)
        if (year.length === 4) {
            const yearNum = parseInt(year);
            if (yearNum < 1900 || yearNum > 2999) {
                year = year.substring(0, 3); // Keep first 3 digits if invalid
            }
        }
    }
    
    // Build formatted value with automatic spaces
    let formattedValue = day;
    
    // Add space after day if typing month or day is complete
    if (day.length === 2 && (originalLength > 2 || month.length > 0)) {
        formattedValue += ' ';
    }
    
    // Add month
    formattedValue += month;
    
    // Add space after month if typing year or month is complete
    if (month.length === 3 && (originalLength > 6 || year.length > 0)) {
        formattedValue += ' ';
    }
    
    // Add year
    formattedValue += year;
    
    // Set the input value
    this.value = formattedValue;
    
    // Adjust cursor position intelligently
    let newCursorPos = cursorPos;
    
    // If adding first digit of day
    if (cursorPos === 1 && day.length === 1 && originalLength === 1) {
        newCursorPos = 1;
    }
    // If completing day (2 digits)
    else if (cursorPos === 2 && day.length === 2 && originalLength === 2) {
        newCursorPos = 3; // Move cursor after space
    }
    // If typing month
    else if (cursorPos >= 3 && cursorPos <= 6) {
        if (month.length === 3 && cursorPos === 6 && originalLength === 6) {
            newCursorPos = 7; // Move cursor after space when month is complete
        } else {
            // Keep cursor relative to month typing
            newCursorPos = cursorPos;
        }
    }
    // If typing year
    else if (cursorPos >= 7) {
        newCursorPos = cursorPos;
    }
    
    // Ensure cursor doesn't go out of bounds
    newCursorPos = Math.min(newCursorPos, this.value.length);
    this.setSelectionRange(newCursorPos, newCursorPos);
});

// Validate DOB field (1900-2999)
function validateDOB(dob) {
    const pattern = /^(0[1-9]|[12][0-9]|3[01])\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(19|20|21|22|23|24|25|26|27|28|29)\d{2}$/;
    if (!pattern.test(dob)) return false;
    
    const parts = dob.split(' ');
    const day = parseInt(parts[0]);
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(parts[1]);
    const year = parseInt(parts[2]);
    
    // Check if day is valid for the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return day <= daysInMonth;
}

// Photo upload functionality
photoUploadArea.addEventListener('click', (e) => {
    if (e.target !== removePhotoBtn) {
        photoInput.click();
    }
});

photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            alert(document.getElementById('photoHint').textContent);
            return;
        }
        
        if (!file.type.match('image.*')) {
            alert('JPEG বা PNG ফরম্যাটের ছবি আপলোড করুন');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            photoPreview.src = e.target.result;
            photoPreview.style.display = 'block';
            photoPreviewWrapper.querySelector('i').style.display = 'none';
            photoPreviewWrapper.querySelector('p').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

removePhotoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    photoInput.value = '';
    photoPreview.src = '';
    photoPreview.style.display = 'none';
    photoPreviewWrapper.querySelector('i').style.display = 'block';
    photoPreviewWrapper.querySelector('p').style.display = 'block';
});

// Signature upload functionality
signatureUploadArea.addEventListener('click', (e) => {
    if (e.target !== removeSignatureBtn) {
        signatureInput.click();
    }
});

signatureInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 1 * 1024 * 1024) {
            alert(document.getElementById('signatureHint').textContent);
            return;
        }
        
        if (!file.type.match('image.*')) {
            alert('JPEG বা PNG ফরম্যাটের স্বাক্ষর আপলোড করুন');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            signaturePreview.src = e.target.result;
            signaturePreview.style.display = 'block';
            signaturePreviewWrapper.querySelector('i').style.display = 'none';
            signaturePreviewWrapper.querySelector('p').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

removeSignatureBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    signatureInput.value = '';
    signaturePreview.src = '';
    signaturePreview.style.display = 'none';
    signaturePreviewWrapper.querySelector('i').style.display = 'block';
    signaturePreviewWrapper.querySelector('p').style.display = 'block';
});

// Form validation
function validateField(fieldId, errorId, validationFn = null) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    if (!field.value.trim()) {
        formGroup.classList.add('error');
        return false;
    } else if (validationFn && !validationFn(field.value)) {
        formGroup.classList.add('error');
        return false;
    } else {
        formGroup.classList.remove('error');
        return true;
    }
}

// Form submission
downloadBtn.addEventListener('click', () => {
    let isValid = true;
    
    // Validate all required fields
    isValid &= validateField('nidNumber', 'nidError', validateNID);
    isValid &= validateField('pinNumber', 'pinError', validatePIN);
    isValid &= validateField('fullName', 'englishNameError');
    isValid &= validateField('fullNameBangla', 'banglaNameError');
    isValid &= validateField('fatherName', 'fatherError');
    isValid &= validateField('motherName', 'motherError');
    isValid &= validateField('dob', 'dobError', validateDOB);
    isValid &= validateField('birthPlace', 'birthPlaceError');
    isValid &= validateField('presentAddress', 'addressError');
    
    // Validate issue date
    if (!validateDate(issueDate.value)) {
        document.getElementById('issueDateError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('issueDateError').style.display = 'none';
    }
    
    // Validate photo and signature
    if (!photoInput.files[0]) {
        alert(document.getElementById('photoLabel').textContent + ' আপলোড করুন');
        isValid = false;
    }
    
    if (!signatureInput.files[0]) {
        alert(document.getElementById('signatureLabel').textContent + ' আপলোড করুন');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<span class="spinner"></span> ' + (document.activeElement.id === 'englishBtn' ? 'Processing...' : 'প্রসেসিং...');
        downloadBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset button state
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    } else {
        // Scroll to first error
        document.querySelector('.form-group.error')?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
});

// View button
viewBtn.addEventListener('click', () => {
    alert(document.activeElement.id === 'englishBtn' ? 'View functionality would be implemented here' : 'সব কিছু কি ঠিক আছে। থাকলে ok চাব দিন');
});

// Reset button - reset entire form
resetBtn.addEventListener('click', () => {
    // Reset all form fields
    document.getElementById('nidNumber').value = '';
    document.getElementById('pinNumber').value = '';
    document.getElementById('fullNameBangla').value = '';
    document.getElementById('fullName').value = '';
    document.getElementById('fatherName').value = '';
    document.getElementById('motherName').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('bloodGroup').selectedIndex = 0;
    document.getElementById('birthPlace').value = '';
    document.getElementById('presentAddress').value = '';
    
    // Reset file inputs and previews
    photoInput.value = '';
    signatureInput.value = '';
    photoPreview.src = '';
    signaturePreview.src = '';
    photoPreview.style.display = 'none';
    signaturePreview.style.display = 'none';
    photoPreviewWrapper.querySelector('i').style.display = 'block';
    photoPreviewWrapper.querySelector('p').style.display = 'block';
    signaturePreviewWrapper.querySelector('i').style.display = 'block';
    signaturePreviewWrapper.querySelector('p').style.display = 'block';
    
    // Set current date again
    setCurrentDate();
    
    // Hide success message
    successMessage.style.display = 'none';
    
    // Remove error states
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
});

// Add real-time validation for fields
document.querySelectorAll('input, select').forEach(field => {
    field.addEventListener('input', () => {
        if (field.value.trim()) {
            field.closest('.form-group')?.classList.remove('error');
        }
    });
});

// Language Toggle
const englishTexts = {
    formTitle: "National ID Application Form",
    photoLabel: "Applicant Photo",
    photoUploadText: "Click to upload your photo",
    photoHint: "Max size: 2MB | Format: JPG, PNG",
    signatureLabel: "Applicant Signature",
    signatureUploadText: "Click to upload your signature",
    signatureHint: "Max size: 1MB | Format: JPG, PNG",
    nidLabel: "National ID Number",
    nidPlaceholder: "Enter your national ID number",
    nidError: "Please enter 10-digit national ID number",
    pinLabel: "PIN Number Please enter 10-17 digit",
    pinPlaceholder: "Enter your PIN number",
    pinError: "Please enter 10 or 17-digit PIN number",
    banglaNameLabel: "Full Name (Bangla)",
    banglaNamePlaceholder: "Enter your full name in Bangla",
    banglaNameError: "Please enter your name in Bangla",
    englishNameLabel: "Full Name (English)",
    englishNamePlaceholder: "Enter your full name in English",
    englishNameError: "Please enter your name in English",
    fatherLabel: "Father's Name",
    fatherPlaceholder: "Father's name in Bangla",
    fatherError: "Please enter father's name",
    motherLabel: "Mother's Name",
    motherPlaceholder: "Mother's name in Bangla",
    motherError: "Please enter mother's name",
    dobLabel: "Date of Birth",
    dobPlaceholder: "25 Jun 2007",
    dobError: "Please enter valid date (25 Jun 2007 format)",
    bloodLabel: "Blood Group",
    bloodPlaceholder: "Select Blood Group (Optional)",
    birthPlaceLabel: "Place of Birth",
    birthPlacePlaceholder: "Please enter place of birth",
    birthPlaceError: "Please enter place of birth",
    issueDateLabel: "Issue Date",
    issueDatePlaceholder: "Enter date in DD/MM/YYYY format",
    issueDateError: "Please enter valid date (DD/MM/YYYY)",
    addressLabel: "Present Address",
    addressPlaceholder: "Enter your present address",
    addressError: "Please enter your address",
    downloadText: "Download",
    viewText: "View",
    resetText: "Reset All",
    successText: "Application submitted successfully!",
    footerText: "© 2023 National ID Registration System. All rights reserved."
};

const banglaTexts = {
    formTitle: "জাতীয় পরিচয়পত্র আবেদন ফর্ম",
    photoLabel: "আবেদনকারীর ছবি",
    photoUploadText: "ছবি আপলোড করতে ক্লিক করুন",
    photoHint: "সর্বোচ্চ সাইজ: ২MB | ফরম্যাট: JPG, PNG",
    signatureLabel: "আবেদনকারীর স্বাক্ষর",
    signatureUploadText: "স্বাক্ষর আপলোড করতে ক্লিক করুন",
    signatureHint: "সর্বোচ্চ সাইজ: ১MB | ফরম্যাট: JPG, PNG",
    nidLabel: "জাতীয় পরিচয়পত্র নম্বর",
    nidPlaceholder: "আপনার জাতীয় পরিচয়পত্র নম্বর লিখুন",
    nidError: "অনুগ্রহ করে ১০ ডিজিটের জাতীয় পরিচয়পত্র নম্বর লিখুন",
    pinLabel: "পিন নম্বর  ১০ বা ১৭ ডিজিটের",
    pinPlaceholder: "পিন নম্বর লিখুন  ১০ বা ১৭ ডিজিটের",
    pinError: "অনুগ্রহ করে ১০ বা ১৭ ডিজিটের পিন নম্বর লিখুন",
    banglaNameLabel: "পূর্ণ নাম (বাংলা)",
    banglaNamePlaceholder: "আপনার পূর্ণ নাম লিখুন",
    banglaNameError: "অনুগ্রহ করে আপনার বাংলা নাম লিখুন",
    englishNameLabel: "পূর্ণ নাম (ইংরেজি)",
    englishNamePlaceholder: "আপনার পূর্ণ নাম ইংরেজিতে লিখুন",
    englishNameError: "অনুগ্রহ করে আপনার ইংরেজি নাম লিখুন",
    fatherLabel: "পিতার নাম",
    fatherPlaceholder: "পিতার নাম বাংলায় লিখুন",
    fatherError: "অনুগ্রহ করে পিতার নাম লিখুন",
    motherLabel: "মাতার নাম",
    motherPlaceholder: "মাতার নাম বাংলায় লিখুন",
    motherError: "অনুগ্রহ করে মাতার নাম লিখুন",
    dobLabel: "জন্ম তারিখ",
    dobPlaceholder: "25 Jun 2007",
    dobError: "অনুগ্রহ করে সঠিক তারিখ লিখুন (25 Jun 2007 ফরম্যাটে)",
    bloodLabel: "রক্তের গ্রুপ",
    bloodPlaceholder: "রক্তের গ্রুপ নির্বাচন করুন (ঐচ্ছিক)",
    birthPlaceLabel: "জন্মস্থান",
    birthPlacePlaceholder: "অনুগ্রহ করে জন্মস্থান লিখুন",
    birthPlaceError: "অনুগ্রহ করে জন্মস্থান লিখুন",
    issueDateLabel: "ইস্যুর তারিখ",
    issueDatePlaceholder: "ডিডি/এমএম/বববব ফরম্যাটে তারিখ লিখুন",
    issueDateError: "অনুগ্রহ করে সঠিক তারিখ লিখুন (ডিডি/এমএম/বববব)",
    addressLabel: "বর্তমান ঠিকানা",
    addressPlaceholder: "আপনার বর্তমান ঠিকানা লিখুন",
    addressError: "অনুগ্রহ করে আপনার ঠিকানা লিখুন",
    downloadText: "ডাউনলোড করুন",
    viewText: "দেখুন",
    resetText: "রিসেট করুন",
    successText: "আবেদন সফলভাবে জমা দেওয়া হয়েছে!",
    footerText: "© ২০২৩ জাতীয় পরিচয়পত্র নিবন্ধন ব্যবস্থা। সর্বস্বত্ব সংরক্ষিত।"
};

function setLanguage(lang) {
    const texts = lang === 'en' ? englishTexts : banglaTexts;
    
    // Update all text elements
    document.getElementById('formTitle').textContent = texts.formTitle;
    document.getElementById('photoLabel').textContent = texts.photoLabel;
    document.getElementById('photoUploadText').textContent = texts.photoUploadText;
    document.getElementById('photoHint').textContent = texts.photoHint;
    document.getElementById('signatureLabel').textContent = texts.signatureLabel;
    document.getElementById('signatureUploadText').textContent = texts.signatureUploadText;
    document.getElementById('signatureHint').textContent = texts.signatureHint;
    document.getElementById('nidLabel').textContent = texts.nidLabel;
    document.getElementById('nidNumber').placeholder = texts.nidPlaceholder;
    document.getElementById('nidError').textContent = texts.nidError;
    document.getElementById('pinLabel').textContent = texts.pinLabel;
    document.getElementById('pinNumber').placeholder = texts.pinPlaceholder;
    document.getElementById('pinError').textContent = texts.pinError;
    document.getElementById('banglaNameLabel').textContent = texts.banglaNameLabel;
    document.getElementById('fullNameBangla').placeholder = texts.banglaNamePlaceholder;
    document.getElementById('banglaNameError').textContent = texts.banglaNameError;
    document.getElementById('englishNameLabel').textContent = texts.englishNameLabel;
    document.getElementById('fullName').placeholder = texts.englishNamePlaceholder;
    document.getElementById('englishNameError').textContent = texts.englishNameError;
    document.getElementById('fatherLabel').textContent = texts.fatherLabel;
    document.getElementById('fatherName').placeholder = texts.fatherPlaceholder;
    document.getElementById('fatherError').textContent = texts.fatherError;
    document.getElementById('motherLabel').textContent = texts.motherLabel;
    document.getElementById('motherName').placeholder = texts.motherPlaceholder;
    document.getElementById('motherError').textContent = texts.motherError;
    document.getElementById('dobLabel').textContent = texts.dobLabel;
    document.getElementById('dob').placeholder = texts.dobPlaceholder;
    document.getElementById('dobError').textContent = texts.dobError;
    document.getElementById('bloodLabel').textContent = texts.bloodLabel;
    document.getElementById('bloodGroup').options[0].text = texts.bloodPlaceholder;
    document.getElementById('birthPlaceLabel').textContent = texts.birthPlaceLabel;
    document.getElementById('birthPlace').placeholder = texts.birthPlacePlaceholder;
    document.getElementById('birthPlaceError').textContent = texts.birthPlaceError;
    document.getElementById('issueDateLabel').textContent = texts.issueDateLabel;
    document.getElementById('issueDate').placeholder = texts.issueDatePlaceholder;
    document.getElementById('issueDateError').textContent = texts.issueDateError;
    document.getElementById('addressLabel').textContent = texts.addressLabel;
    document.getElementById('presentAddress').placeholder = texts.addressPlaceholder;
    document.getElementById('addressError').textContent = texts.addressError;
    document.getElementById('downloadText').textContent = texts.downloadText;
    document.getElementById('viewText').textContent = texts.viewText;
    document.getElementById('resetText').textContent = texts.resetText;
    document.getElementById('successText').textContent = texts.successText;
    document.getElementById('footerText').textContent = texts.footerText;
    
    // Update button states
    if (lang === 'en') {
        englishBtn.classList.add('active');
        banglaBtn.classList.remove('active');
    } else {
        banglaBtn.classList.add('active');
        englishBtn.classList.remove('active');
    }
    
    // Update issue date format based on language
    setCurrentDate();
}

// Initialize the form
document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    setCurrentDate();
    
    // Set default language
    setLanguage('bn');
});

banglaBtn.addEventListener('click', () => setLanguage('bn'));
englishBtn.addEventListener('click', () => setLanguage('en'));

