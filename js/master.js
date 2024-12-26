
// التحقق من خيار اللون المخزن في Local Storage
let mainColors = localStorage.getItem("color_option");
let mmColor = localStorage.getItem("mm_color_option");

if (mainColors !== null) {
    // تعيين الألوان المخزنة على الجذر
    document.documentElement.style.setProperty('--main--color', mainColors);

    if (mmColor !== null) {
        document.documentElement.style.setProperty('--mm--color', mmColor);
    }

    // إزالة class="active" من جميع العناصر
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        // تعيين class="active" للعنصر المطابق للون المخزن
        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        }
    });
}

// إعداد زر تبديل الإعدادات
document.querySelector(".toggle-settings .bxs-cog").onclick = function () {
    this.classList.toggle("rotating");
    document.querySelector(".settings-box").classList.toggle("open");
};

// إضافة حدث النقر لجميع العناصر في قائمة الألوان
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {
    li.addEventListener('click', (e) => {
        // الحصول على اللون المختار
        let selectedColor = e.target.dataset.color;

        // تغيير اللون الأساسي
        document.documentElement.style.setProperty('--main--color', selectedColor);

        // تحويل اللون إلى RGBA مع الشفافية
        let rgbaColor = hexToRgba(selectedColor, 0.5); // الشفافية 50%
        document.documentElement.style.setProperty('--mm--color', rgbaColor);

        // تخزين الألوان في Local Storage
        localStorage.setItem("color_option", selectedColor);
        localStorage.setItem("mm_color_option", rgbaColor);

        // إزالة class="active" من جميع العناصر
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });

        // تعيين class="active" للعنصر الحالي
        e.target.classList.add("active");
    });
});

// دالة لتحويل اللون من صيغة Hex إلى صيغة RGBA مع الشفافية
function hexToRgba(hex, opacity) {
    // استخراج قيم RGB من الـ Hex
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // ارجع اللون بصيغة RGBA مع الشفافية
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const randomBackEl = document.querySelectorAll(".random-backgrounds span");

randomBackEl.forEach(span => {
    span.addEventListener('click', (e) => {
        // إزالة class="active" من جميع العناصر
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });

        // تعيين class="active" للعنصر الحالي
        e.target.classList.add("active");
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImage();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

// Select the Landing Page element
let LandingPage = document.querySelector(".Landing-Page");

// Array of images
let imgsArray = ["img01.jpeg", "img02.jpeg", "img03.jpeg", "img04.jpeg"];

// Check if there's a saved image in localStorage
let savedImage = localStorage.getItem("Image_option");
if (savedImage !== null) {
    // Set the last saved image as the background
    LandingPage.style.backgroundImage = `url('image/${savedImage}')`;
} else {
    // Set a default image if none is saved
    LandingPage.style.backgroundImage = `url('image/img01.jpeg')`;
}

// Function to change the background image periodically
let backgroundOption = true;
//check Local Storage random-backgrounds
let backgroundLocalItem = localStorage.getItem("background_option");
// Check if Random Background Local
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    }
    else {
        backgroundOption = false;
    }
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}
let backgroundInterval;
function randomizeImage() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Generate a random index
            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            // Get the image name
            let selectedImage = imgsArray[randomNumber];

            // Set it as the background
            LandingPage.style.backgroundImage = `url('image/${selectedImage}')`;

            // Save the image to localStorage
            localStorage.setItem("Image_option", selectedImage);
        }, 10000);
    }
}
randomizeImage();

// الحصول على جميع الروابط داخل القائمة
const links = document.querySelectorAll('.links a');

// استرجاع الرابط النشط من localStorage عند تحميل الصفحة
const activeLinkId = localStorage.getItem('activeLinkId');
if (activeLinkId) {
    // إذا كان هناك رابط نشط مخزن، إضافة الكلاس 'active' له
    const linkToActivate = document.querySelector(`.links a[data-id="${activeLinkId}"]`);
    if (linkToActivate) {
        linkToActivate.classList.add('active');
    }
}

links.forEach(link => {
    link.addEventListener('click', function () {
        // إزالة class="active" من جميع الروابط
        links.forEach(item => item.classList.remove('active'));

        // إضافة class="active" للرابط الذي تم النقر عليه
        this.classList.add('active');

        // تخزين قيمة data-id الخاصة بالرابط النشط في localStorage
        localStorage.setItem('activeLinkId', this.getAttribute('data-id'));
    });
});

// Create Popup with The Image
let ourGallery = document.querySelectorAll(".gallery .box .image img").forEach(img => {
    img.addEventListener('click', (e) => {
        // Create Overlay Element
        let overlay = document.createElement("div");
        // Add Class To Overlay
        overlay.className = 'popup-overlay';
        // Append Overlay To The Body
        document.body.appendChild(overlay);

        // Create Popup Box
        let popupBox = document.createElement("div");
        // Add Class To Popup Box
        popupBox.className = 'popup-box';

        // Create Title Element
        let popupTitle = document.createElement("p");
        // Add Class To Title
        popupTitle.className = 'popup-title';
        // Set Title Text Based On alt Attribute
        popupTitle.textContent = e.target.alt || "Default Title"; // النص الافتراضي في حالة عدم وجود alt
        // Append Title To Popup Box
        popupBox.appendChild(popupTitle);

        // Create The Image Element
        let popupImage = document.createElement("img");
        // Set Image Source
        popupImage.src = e.target.src;
        // Append Image To Popup Box
        popupBox.appendChild(popupImage);

        // Add The Popup Box To Body
        document.body.appendChild(popupBox);

        // Create The Close Button
        let closeButton = document.createElement("span");
        // Add Class To Close Button
        closeButton.className = 'close-button';
        // Add Text To Close Button
        closeButton.textContent = "X";
        // Append The Close Button To Popup Box
        popupBox.appendChild(closeButton);

        // Close Popup On Button Click
        closeButton.addEventListener('click', () => {
            popupBox.remove();
            overlay.remove();
        });

        // Close Popup On Overlay Click
        // overlay.addEventListener('click', () => {
        //     popupBox.remove();
        //     overlay.remove();
        // });
    });
});

let ScrollUp = document.querySelectorAll(".ScrollUp-options span");
let godown = document.querySelectorAll(".go-down");
let ScrollUplocalItem = localStorage.getItem("ScrollUp_options");

if (ScrollUplocalItem !== null) {
    ScrollUp.forEach(span => {
        span.classList.remove("active");
    });

    if (ScrollUplocalItem === 'block') {
        godown.forEach(item => {
            item.style.display = 'block';
        });
        document.querySelector(".ScrollUp-options .yes").classList.add("active");
    } else {
        godown.forEach(item => {
            item.style.display = 'none';
        });
        document.querySelector(".ScrollUp-options .no").classList.add("active");
    }
}

ScrollUp.forEach(span => {
    span.addEventListener("click", (e) => {
        godown.forEach(item => {
            if (span.dataset.background === 'show') {
                item.style.display = 'block';
                localStorage.setItem("ScrollUp_options", 'block');
            } else {
                item.style.display = 'none';
                localStorage.setItem("ScrollUp_options", 'none');
            }
        });

        ScrollUp.forEach(span => {
            span.classList.remove("active");
        });
        span.classList.add("active");
    });
});

//Reset options
document.querySelector(".reset-options").onclick = function () {
    // إزالة الإعدادات المخزنة في Local Storage
    localStorage.removeItem("color_option");
    localStorage.removeItem("mm_color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("Image_option");
    localStorage.removeItem("activeLinkId");
    localStorage.removeItem("ScrollUp_options");

    // إعادة تحميل الصفحة لتطبيق التغييرات
    window.location.reload();
}

document.oncopy = () => {
    let text = window.getSelection().toString();
    let url = window.location.href;
    let final_text = text + "\n\nFor More Information" + url;
    navigator.clipboard.writeText(final_text);
};