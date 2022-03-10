var addCardBtn = document.querySelector(".header_btn.addBtn");
var delCardBtn = document.querySelector(".header_btn.delBtn");
var saveBtn = document.getElementById("save-btn");
var closeBtn = document.getElementById("close-btn");
var userInput = document.querySelector(".user_input");
var cardsList = document.querySelector(".cards-list");
var inputQuestion = document.getElementById("user_input-question");
var inputAnswer = document.getElementById("user_input-answer");
let contentArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

//Tạo các flashcard có trong Local Storage 
contentArray.forEach(divMaker);

//Hiển thị bảng Create FlashCard 
function displayInput(){
    userInput.classList.remove("hide");
}

//Ẩn bảng Create FlashCard 
function hideInput(){
    userInput.classList.add("hide");

    inputQuestion.value = '';
    inputAnswer.value = '';
}

// Tạo thẻ flashcard nội dụng question và answer nhận được
function divMaker(item){
    if(item.my_question && item.my_answer){
        var newCard = document.createElement("div");
        var newCardHeader = document.createElement("h2");
        var newCardContent = document.createElement("h2");
        var newCardIcon = document.createElement("i");

        newCard.classList.add("card-item");
        newCardHeader.classList.add("card_header");
        newCardContent.classList.add("card_content");
        newCardIcon.classList.add("card-icon", "fa-solid", "fa-xmark");
        
        newCardHeader.innerHTML = item.my_question;
        newCardContent.innerHTML =  item.my_answer;
        
        newCard.appendChild(newCardHeader);
        newCard.appendChild(newCardContent);
        // Hiển thị nội dung card
        newCard.onclick = function(){
            newCardContent.classList.toggle("display");
        }
        newCard.appendChild(newCardIcon);
        // xóa 1 card khỏi list  
        newCardIcon.onclick = function(){
            cardsList.removeChild(newCard);
            contentArray.splice(contentArray.indexOf(item), 1);
            localStorage.setItem("items", JSON.stringify(contentArray));
        }
        
        cardsList.appendChild(newCard);

        inputQuestion.value = '';
        inputAnswer.value = '';
    }
}

// Thêm Card
function addCardItem(){
    var flashcard_info = {
        'my_question': inputQuestion.value,
        'my_answer' : inputAnswer.value
    }

    contentArray.push(flashcard_info);
    localStorage.setItem("items", JSON.stringify(contentArray));

    divMaker(contentArray[contentArray.length - 1]);
}

// Xóa tất cả Card
function removeAllCardItem(){
    cardsList.innerHTML = '';
    localStorage.clear();
    contentArray = [];
}

addCardBtn.addEventListener("click", displayInput);

delCardBtn.addEventListener("click", removeAllCardItem);

saveBtn.addEventListener("click", addCardItem);

closeBtn.addEventListener("click", hideInput);

// Nhấn Enter để thêm card khi đã thêm dữ liệu xong
userInput.onkeydown = function(event){
    if(event.key == "Enter"){
        addCardItem();
    }
}