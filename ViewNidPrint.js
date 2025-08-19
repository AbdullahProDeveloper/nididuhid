// Function to generate NID card in new tab with auto-print
function generateNidPreview() {
    // Get all form values
    const formData = {
        nidNumber: document.getElementById('nidNumber').value,
        pinNumber: document.getElementById('pinNumber').value || generateAutoPIN(),
        fullName: document.getElementById('fullName').value,
        fullNameBangla: document.getElementById('fullNameBangla').value,
        fatherName: document.getElementById('fatherName').value,
        motherName: document.getElementById('motherName').value,
        dob: document.getElementById('dob').value,
        bloodGroup: document.getElementById('bloodGroup').value,
        birthPlace: document.getElementById('birthPlace').value,
        issueDate: document.getElementById('issueDate').value,
        presentAddress: document.getElementById('presentAddress').value,
        photo: document.getElementById('photoPreview').src,
        signature: document.getElementById('signaturePreview').src
    };

    // Create raw data for barcode
    const raw = 
        `<pin>${formData.pinNumber}</pin>` +
        `<name>${formData.fullName}</name>` +
        `<DOB>${formData.dob}</DOB>` +
        `<FP></FP>` +
        `<F>Right Index</F>` +
        `<TYPE>A</TYPE>` +
        `<V>2.0</V>` +
        `<ds>302c021438a45829c83c874e5074f99611dd1082f9b6ff8202145371bebf64410f2a615cca948bbc2a6f732502e4</ds>`;

    // Create a new window for the NID card
    const nidWindow = window.open('', '_blank');
    
    // Write the complete HTML document to the new window
    nidWindow.document.write(`



              <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>nid-${formData.fullName}</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            <link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">

            <script src="bkuzmic-pdf417-js-d3c7db0/bcmath-min.js" type="text/javascript"></script>
            <script src="bkuzmic-pdf417-js-d3c7db0/pdf417-min.js" type="text/javascript"></script>
            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                
                body {
                    font-family: 'SolaimanLipi', Arial, sans-serif;
                    background: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 50vh;
                    padding: 5px;
                }
                
                .page-container {
                    width: 210mm;
                    height: 280mm;
                    padding: 10mm;
                    display: flex;
                    flex-direction: column;
                }
                
                .cards-container {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }
                
                .nid-card {
                    width: 47%;
                    height: 210px;
                    border: 1.5px solid #000;
                    position: relative;
                    padding: 4px;
                    margin-left: 30px;
                }
                
                .card-header {
                    text-align: center;
                    padding-left: 40px;
                    margin: 4px;
                }

                .header-Government {
                    font-size: 12px;
                    white-space: nowrap;
                    color: #16cd19;
                    padding-left: 2px;
                }

                .header-natiol-id {
                    font-size: 11px;
                }
                
                .card-content {
                    display: flex;
                }

                .card-header-photo {
                    position: relative; 
                    height: auto;
                }

                .header-photo-top-laf {
                    width: 40px;
                    height: auto;
                    position: absolute;
                    top: 3px;
                    left: 1px;
                    padding: 1px;
                }

                .header-natiol-id {
                    display: flex;
                    align-items: center;
                    padding-left: 51px;
                    gap: 4px;
                }

                #header-natiol-id {
                    text-align: center;
                    color: hsl(0, 100%, 55%);
                }
                
                .photo-section {
                    width: 23%;
                    height: auto;
                    padding: 0;
                    text-align: left;
                    padding-left: 0;
                    padding-top: 0;
                    margin: 0;
                    padding-right: 0;
                }
                
                .photo-box {
                    width: 75px;
                    height: 80px;
                    object-fit: cover;
                    position: relative;
                    margin-bottom: 5px;
                }
                
                .signature-box {
                    width: 75px;
                    height: 25px;
                    object-fit: cover;
                    position: relative;
                }
                
                .info-section {
                    width: 31%;
                    padding: 0px;
                    padding-left: 0px;
                    padding-top: 0px;
                    text-align: left;
                }

                .info-bagrount-image {
                    width: 340px;
                    height: 135px;
                    background-image: url('image/supla.jpg');
                    background-size: 120px auto;
                    background-repeat: no-repeat;
                    background-position: 55% 3px;
                }

                .card-header-border {
                    border-top: 1.5px solid #000;
                    margin: 0;
                    margin-left: -5px;
                    padding: 0;
                    width: 336px; 
                    box-sizing: border-box;
                    border-left: 40px solid black;
                }
                
                .info-row {
                    display: flex;
                    margin: 7px;
                    font-size: 11px;
                }
                
                .info-label {
                    width: 100%;
                    font-weight: bold;
                }
                
                .info-value {
                    white-space: nowrap;
                    width: 48px;
                    text-align: left;
                    position: absolute;
                    margin-left: 44px;
                    font-weight: bold;
                    color: #493f3f;
                }
                
                .info-label-Date {
                    width: 200px;
                    font-weight: bold;
                    text-align: center;
                    white-space: nowrap;
                }
                
                #info-label-Date {
                    color: hwb(8 0% 0% / 0.973);
                    margin-left: 5px;
                    font-weight: bold;
                    white-space: nowrap;
                    font-size: 12px;
                }
                
                .card-footer {
                    font-size: 11px;
                    text-align: center;
                    margin-top: 1px;
                }

                .Name-Bangla-bold {
                    color: rgb(0, 0, 0);
                    font-size: 13px;
                }
                
                #Name-Bangla-botm {
                    padding-bottom: 2px;
                }

                #englash-name-valu {
                    font-size: 11px;
                    color: #401f1f;
                    text-transform: uppercase;
                }

                .info-label-nidno {
                    white-space: nowrap;
                    font-weight: bold;
                }
                
                #info-label-idno {
                    white-space: nowrap;
                    padding-left: 3px;
                    color: #f10000;
                    font-weight: bold;
                    font-size: 13px;
                }
                
                #motherName-botum {
                    padding-bottom: 2px;
                }


                

                /* Second NID Card */
                .Second-NID-Card {
                    width: 47%;
                    height: 210px;
                    font-size: 10px;
                    border: 1.5px solid #000;
                    position: relative; 
                }

                .hader-fixed-text {
                    width: 340px;
                    height: 26px;
                    white-space: nowap;                
                    margin: 4px;
                    padding-left: 5px;
                    font-size: 9px;
                } 

                .header-border-Second {
                    width: 335px;
                    border-top: 1.5px solid #000;
                    display: block;
                }
                
                .majer_border_Second {
                    width: 335px;
                    border-top: 1.5px solid #000;
                    position: relative;
                    top: -5px;
                }
                
                .info-Address {
                    width: 330px;
                    height: 48px;
                    margin: 4px;
                    text-align: left;
                    border: 1px solid hidden;
                    box-sizing: border-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                .info-card-sened-all {
                    margin: 4px;
                    white-space: nowap;
                    display: block;  
                }
                
                .info-Blood-alldive {
                    display: flex;
                }
                
                .info_alldive_send_pat_majkhane {
                    padding-left: 4px;
                    display: flex;
                }
                
                .Blood-Group-hader {
                    font-weight: bold;
                    padding-left: 3px;
                    font-size: 9px;
                    padding-top: 2px;
                }
                
                .info-Blood-Group {
                    display: flex;
                    font-display: block;
                    white-space: nowrap;
                }
                
                .info-Blood-Group-value {
                    width: 32px;
                    height: 13px;
                    border: 1px solid hidden;
                    box-sizing: border-box;
                    white-space: nowrap;
                    overflow: hidden;
                    display: flex;
                    color: #f10000;
                    font-weight: bold;
                    padding-left: 4px;
                    font-size: 10px;
                }

                .info-birthPlace {
                    padding-left: 1px;
                    white-space: nowrap;
                }
                
                .birthPlace_valu {
                    width: 140px;
                    height: 13px;
                    padding-left: 4px;
                    white-space: nowrap;
                    border: 1px solid hidden;
                    box-sizing: border-box;
                    overflow: hidden;
                    text-overflow: ellipsis;

                }
                
                .info-son-mudron {
                    width: 35px;
                    height: 15px;
                    border: 1px solid hidden;
                    box-sizing: border-box;
                    background: #000;
                    float: right;
                    margin-right: -4px;
                    display: flex;
                }
                
                .info-mudron-valu {
                    color: #ffffff;
                    text-align: center;
                    white-space: nowrap;
                    margin: 1px;
                }
                .sine_tarikh_all{
                    width: 300px;
                    height: 45px;
                    white-space: nowrap;
                    padding-left: 4px;

                }

                .card-header-sine {
                    width: 110px;
                    height: 25px;
                    object-fit: cover;
                    position: relative;
                    display: block;
                    background-color: honeydew;
                }

                .header-photo-top-sine {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                }
                
                .podankare_sain_text {
                    padding-top: 28px;
                    font-size: 10px;
                }
                
                .podankare_tarikh_text {
                    display: flex;
                    padding-top: 3px;
                    padding-left: 190px;
                }
                
                .podankare_tarikh_hader {
                    white-space: nowrap;
                    display: block;
                }
                
                .podankare_tarikh_valu {
                    display: inline-block;
                    padding-left: 5px;
                }



                /* Constrain the display height */
.barcode-container {
    width: 340px;
    height: 40px; /* Fixed height container */
    overflow: hidden;
}

#barcode canvas {
    height: 40px !important; /* Force height */
    width: 330px;
    image-rendering: crisp-edges; /* Keep sharp */
}

            </style>
        </head>
        <body>
            <div class="page-container">
                <div class="cards-container">
                    <!-- First NID Card -->
                    <div class="nid-card">
                        <div class="card-header-photo">
                            <img src="image/gono.jpg" class="header-photo-top-laf">
                        </div>
                        <div class="card-header">
                            <p>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার<p>
                            <p class="header-Government">Government of the People's Republic of Bangladesh</p>
                            <div class="header-natiol-id">
                                <p id="header-natiol-id">National ID Card</p>
                                <p>/ জাতীয় পরিচয়পত্র</p>
                            </div>
                        </div>
                        <section class="info-bagrount-image">
                            <div class="card-header-border"></div>
                            <div class="card-content">
                                <div class="photo-section">
                                    <div>
                                        <img class="photo-box" src="${formData.photo}">
                                    </div>
                                    <div>
                                        <img src="${formData.signature}" class="signature-box">
                                    </div>
                                </div>
                                
                                <div class="info-section">
                                    <div>
                                        <div class="info-row" id="Name-Bangla-botm">
                                            <div class="info-label">নাম:</div>
                                            <div class="info-value"><strong class="Name-Bangla-bold">${formData.fullNameBangla}</strong></div>
                                        </div>
                                        <div class="info-row" ld="Name-englash-botm">
                                            <div class="info-label">Name:</div>
                                            <div class="info-value" id="englash-name-valu">${formData.fullName}</div>
                                        </div>
                                        <div class="info-row">
                                            <div class="info-label">পিতা:</div>
                                            <div class="info-value">${formData.fatherName}</div>
                                        </div>
                                        <div class="info-row" id="motherName-botum">
                                            <div class="info-label">মাতা:</div>
                                            <div class="info-value">${formData.motherName}</div>
                                        </div>
                                        <div class="info-row">
                                            <div class="info-label-Date">Date of Birth:</div>
                                            <div id="info-label-Date">${formData.dob}</div>
                                        </div>
                                        <div class="info-row">
                                            <div class="info-label-nidno">ID NO:</div>
                                            <div id="info-label-idno">${formData.nidNumber}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <!-- Second NID Card -->
                    <div class="Second-NID-Card">
                        <div class="hader-fixed-text">
                            এই কার্ডটি গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সম্পত্তি। কার্ডটি ব্যবহারকারী ব্যতীত অন্য কোথাও পাওয়া গেলে নিকটস্থ পোস্ট অফিসে জমা দেবার জন্য অনুরোধ করা হলো।
                        </div>

                        <div class="header-border-Second"></div>

                        <section class="info-card-sened-all">
                            <div class="info-Address">
                                ঠিকানা: ${formData.presentAddress}
                            </div>

                            <div class="info_alldive_send_pat_majkhane">
                                <div class="info-Blood-Group-gap">
                                    <div class="info-Blood-Group">
                                        রক্তের গ্রুপ /<p class="Blood-Group-hader">Blood Group:</p>
                                        <div class="info-Blood-Group-value">${formData.bloodGroup}</div>
                                    </div>
                                </div>
                                
                                <div class="info-birthPlace">জন্মস্থান:</div>
                                <div class="birthPlace_valu">${formData.birthPlace}</div>

                                <div class="info-son-mudron">
                                    <div class="info-mudron-valu">মূদ্রণ: ০১</div>
                                </div>
                            </div>
                        </section>

                        <div class="majer_border_Second"></div>

                        <section class="info-card-sened-all">
                            <div class="sine_tarikh_all">
                                <div class="card-header-sine">
                                    <img src="image/saine.jpg" class="header-photo-top-sine">
                                    <div class="podankare_sain_text">প্রদানকারী কর্তৃপক্ষের স্বাক্ষর</div>
                                </div>
                                <div class="podankare_tarikh_text">
                                    <div class="podankare_tarikh_hader">প্রদানের তারিখ:</div>
                                    <div class="podankare_tarikh_valu">${formData.issueDate}</div>
                                </div>
                            </div>

                            <div class="barcode-container">
                                <div id="barcode"></div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <script>


            try {
    const rawData = '${raw}';
    
    // Optimized for narrower width
    PDF417.init(rawData, 5, 2); // Lower error correction level (2)
    
    const barcodeArray = PDF417.getBarcodeArray();
    const moduleWidth = 6;  // Reduced from 10
    const moduleHeight = 3; // Slightly reduced height
    const padding = 2;      // Reduced padding
    
    const canvas = document.createElement('canvas');
    canvas.width = (barcodeArray.num_cols * moduleWidth) + (padding * 2);
    canvas.height = (barcodeArray.num_rows * moduleHeight) + (padding * 2);

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    
    // Draw modules
    for (let row = 0; row < barcodeArray.num_rows; row++) {
        for (let col = 0; col < barcodeArray.num_cols; col++) {
            if (barcodeArray.bcode[row][col] === '1') {
                ctx.fillRect(
                    col * moduleWidth + padding,
                    row * moduleHeight + padding,
                    moduleWidth,
                    moduleHeight
                );
            }
        }
    }
    
    const container = document.getElementById('barcode');
    container.innerHTML = '';
    container.appendChild(canvas);

} catch (e) {
    console.error("Barcode error:", e);
    document.getElementById('barcode').innerHTML = 
        '<div style="color:red;font-size:10px;">Barcode Error</div>';
}

            

            </script>
        </body>
        </html>



    `);
    
    // Close the document writing
    nidWindow.document.close();
}

// Update the view button event listener to handle both view and print
document.getElementById('viewBtn').addEventListener('click', function() {
    // Validate form first
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
    
    // Validate photo and signature
    const photoInput = document.getElementById('photoInput');
    const signatureInput = document.getElementById('signatureInput');
    
    if (!photoInput.files[0]) {
        alert(document.getElementById('photoLabel').textContent + ' আপলোড করুন');
        isValid = false;
    }
    
    if (!signatureInput.files[0]) {
        alert(document.getElementById('signatureLabel').textContent + ' আপলোড করুন');
        isValid = false;
    }
    
    if (isValid) {
        generateNidPreview();
    } else {
        // Scroll to first error
        document.querySelector('.form-group.error')?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
});