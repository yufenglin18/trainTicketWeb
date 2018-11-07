"use strict";
var option;
var serviceTag;
var priceList;
var toDisplay;
var payNow;
var myForm;
var payFirstName;
var diffBill = false;
var singlePrice = 0;
var ticketA = 75.00;
var ticketB = 69.85;
var ticketC = 105;
var ticketD = 106.75;
var ticketE = 145;
var ticketF = 70.95;
var paymentForm;
var cardType;
//display the additional shipping address if the different billing checkbox is checked
function showDifferentBilling(){
    let billAdd = document.getElementById("billAdd");
    let billSub = document.getElementById("billSuburb");
    let billState = document.getElementById("billState");
    let billPost = document.getElementById("billPostcode");
    if(option.checked){
        toDisplay.style.display = "block";
        billAdd.required = "required";
        billSub.required = "required";
        billState.required = "required";
        billPost.required = "required";
        diffBill = true;
    }
    if(!option.checked){
        toDisplay.style.display = "none";
        billAdd.value = "";
        billSub.value = "";
        billState.value = "";
        billPost.value = "";
        billAdd.required = "";
        billSub.required = "";
        billState.required = "";
        billPost.required = "";
        diffBill = false;
    }
}
//form validation
function checkForm(){
    let result = true;
    let errMsg1 = "";
    let errMsg2 = "";
    sessionStorage.firstNameAttr = document.getElementById("givenname").value;
    sessionStorage.lastNameAttr = document.getElementById("familyname").value;
    sessionStorage.emailAttr = document.getElementById("emailadd").value;
    sessionStorage.phoneAttr = document.getElementById("phoneno").value;
    //only store the delivery adress in session storage
    if(diffBill == false){
        sessionStorage.addAttr = document.getElementById("streetadd").value;
        sessionStorage.suburbAttr = document.getElementById("suburb").value;
        sessionStorage.stateAttr = document.getElementById("state").value;
        sessionStorage.postAttr = document.getElementById("postcode").value;
    } else if(diffBill == true){
        sessionStorage.addAttr = document.getElementById("billAdd").value;
        sessionStorage.suburbAttr = document.getElementById("billSuburb").value;
        sessionStorage.stateAttr = document.getElementById("billState").value;
        sessionStorage.postAttr = document.getElementById("billPostcode").value;
    }
    sessionStorage.productAttr = document.getElementById("service").value;
    sessionStorage.dateAttr = document.getElementById("traveldate").value;
    sessionStorage.quantityAttr = document.getElementById("quantity").value;
    //quantity must be positive number
    if (sessionStorage.quantityAttr <= 0){
        errMsg1 = "Error! Ticket Quantity must be positive integer!";
    }
    //state and post code match
    if(sessionStorage.stateAttr == "vic"){
        if((sessionStorage.postAttr.charAt(0)!=3)||(sessionStorage.postAttr.charAt(0)!=8)){
            errMsg2 = `Error! The post code ${sessionStorage.postAttr} doesn't belong to State ${sessionStorage.stateAttr}`;
        }
        if((sessionStorage.postAttr.charAt(0)==3)||(sessionStorage.postAttr.charAt(0)==8)){
            errMsg2 = "";
        }
    }
    if(sessionStorage.stateAttr == "nsw"){
        if((sessionStorage.postAttr.charAt(0)!=1)||(sessionStorage.postAttr.charAt(0)!=2)){
            errMsg2 = `Error! The post code ${sessionStorage.postAttr} doesn't belong to State ${sessionStorage.stateAttr}`;
        }
        if((sessionStorage.postAttr.charAt(0)==1)||(sessionStorage.postAttr.charAt(0)==2)){
            errMsg2 = "";
        }
    }
    if(sessionStorage.stateAttr == "qld"){
        if((sessionStorage.postAttr.charAt(0)!=4)||(sessionStorage.postAttr.charAt(0)!=9)){
            errMsg2 = `Error! The post code ${sessionStorage.postAttr} doesn't belong to State ${sessionStorage.stateAttr}`;
        }
        if((sessionStorage.postAttr.charAt(0)==4)||(sessionStorage.postAttr.charAt(0)==9)){
            errMsg2 = "";
        }
    }
    if(sessionStorage.stateAttr == "nt"||sessionStorage.stateAttr == "act"){
        if((sessionStorage.postAttr.charAt(0)!=0)){
            errMsg2 = `Error! The post code ${sessionStorage.postAttr} doesn't belong to State ${sessionStorage.stateAttr}`;
        } else{
            errMsg2 = "";
        }
    }
    if(sessionStorage.stateAttr == "wa"){
        if((sessionStorage.postAttr.charAt(0)!=6)){
            errMsg2 = `Error! The post code ${sessionStorage.postAttr} doesn't belong to State ${sessionStorage.stateAttr}`;
        } else{
            errMsg2 = "";
        }
    }
    if(sessionStorage.stateAttr == "sa"){
        if((sessionStorage.postAttr.charAt(0)!=5)){
            errMsg2 = `Error! The post code ${sessionStorage.postAttr} doesn't belong to State ${sessionStorage.stateAttr}`;
        } else{
            errMsg2 = "";
        }
    }
    if(sessionStorage.stateAttr == "tas"){
        if((sessionStorage.postAttr.charAt(0)!=7)){
            errMsg2 = `Error! The post code ${sessionStorage.postAttr} doesn't belong to State ${sessionStorage.stateAttr}`;
        } else{
            errMsg2 = "";
        }
    }
    //error message check, cannot submit form if there is any error message
    if(errMsg1 != "" || errMsg2 != ""){
        result = false;
    } else{
        result = true;
    }
    if(errMsg1 != ""){
        alert(errMsg1);
    }
    if(errMsg2 != ""){
        alert(errMsg2);
    }
    return result;
}
//display price accroding to the selection
function checkPrice(){
    if(serviceTag.value != ""){
        switch(serviceTag.value){
            case "a":{
                priceList.value = "Ticket: Melbourne - Adelaide (via Bendigo and Nhill/Horsham) Single Price: AUD $"+ ticketA;
                break;
            }
            case "b":{
                priceList.value = "Ticket: Melbourne - Canberra (via Albury) Single Price: AUD $"+ ticketB;
                break;
            }
            case "c":{
                priceList.value = "Ticket: Melbourne - Canberra (via Bairnsdale)) Single Price: AUD $"+ ticketC;
                break;
            }
            case "d":{
                priceList.value = "Ticket: Mildura - Albury Single Price: AUD $"+ ticketD;
                break;
            }
            case "e":{
                priceList.value = "Charter Pickup Single Price: AUD $"+ ticketE;
                break;
            }
            case "f":{
                priceList.value = "Accomendation Single Price: AUD $"+ ticketF;
                break;
            }
        }
    } else{
        priceList.value ="Need to select a service!";
    }
}
// all the functions to be implemented in enquire page
function enquire(){
    serviceTag = document.getElementById("service");
    priceList = document.getElementById("priceTag");
    toDisplay = document.getElementById("billingAddress");
    payNow = document.getElementById("payNow");
    myForm = document.getElementById("form");
    prefill();
    serviceTag.onchange = checkPrice;
    option.onclick = showDifferentBilling;
    myForm.onsubmit = checkForm;
}
//round up to two decimal places for AUD currency
function aud(amount) {
    return Number.parseFloat(amount).toFixed(2);
}
//payment form check foe payment.html
function checkPayment(){
    let result = false;
    let errMsg1 = "";
    let errMsg2 = "";
    let cardName = document.getElementById("pay-nameOnCard").value;
    let cardNo = document.getElementById("pay-cardNo").value;
    let cardExpiry = document.getElementById("pay-Expiry").value;
    let cardCvv = document.getElementById("pay-cvv").value;
    let nameRegx = /[A-Z a-z]/;
    let visaRegx = /^4\d{15}$/;
    let amexRegx = /^3[4|7]\d{13}$/
    let masterRegx = /^5[1-5]\d{14}$/
    let cardExpRegx = /^(0[1-9]|10|11|12)\/\d{2}$/;
    let cardCvvRegx3 = /^\d{3}$/;
    let cardCvvRegx4 = /^\d{4}$/;
    console.log(cardType.value);
    console.log(cardCvv);
    if (!cardName.match(nameRegx)){
        errMsg1 += "Error! Name format is not valid!\n";
    }
    console.log(cardType.value);
    if (cardType.value == "visa" && !cardNo.match(visaRegx)){
        errMsg1 += "Bad visa input\n";
    } else if(cardType.value == "amex" && !cardNo.match(amexRegx)){
        errMsg1 += "Bad amex input\n";
    } else if(cardType.value == "mastercard" && !cardNo.match(masterRegx)){
        errMsg1 += "Bad mastercard input\n";
    }

    if(!cardExpiry.match(cardExpRegx)){
        errMsg1 += "Error! Invalid expiry date format, should be MM/YY\n";
    }
    if(cardType.value == "amex" && !cardCvv.match(cardCvvRegx4)){
        errMsg2 = "Error! CVV for Amex should be 4 digits!\n";
    }
    if(cardType.value == "visa" && !cardCvv.match(cardCvvRegx3)){
        errMsg2 = "Error! CVV for VISA should be 3 digits!\n";
    }
    if(cardType.value == "mastercard" && !cardCvv.match(cardCvvRegx3)){
        errMsg2 = "Error! CVV for MasterCard should be 3 digits!\n";
    }
    if(errMsg1 != "" || errMsg2 != ""){
        result = false;
    } else{
        result = true;
    }
    if(errMsg1 != ""){
        alert(errMsg1);
    } else if(errMsg2 != ""){
        alert(errMsg2);
    }
    return result;
}
//clear session storage if the cancel button is pressed
function deleteAll(){
    sessionStorage.clear();
    window.location.href = "index.html";
}
//all functions to be used in payment.html
function payment(){
    let payLastName = document.getElementById("pay-familyname");
    let payEmail = document.getElementById("pay-emailadd");
    let payPhone = document.getElementById("pay-phoneno");
    let payStAdd = document.getElementById("pay-streetadd");
    let paySub = document.getElementById("pay-suburb");
    let payState = document.getElementById("pay-state");
    let payPost = document.getElementById("pay-postcode");
    let payService = document.getElementById("pay-service");
    let payDate = document.getElementById("pay-date");
    let payAmount = document.getElementById("pay-quantity");
    let payTotal = document.getElementById("pay-total");
    cardType = document.getElementById("pay-cardType");
    let cancelOrder = document.getElementById("cancel");
    paymentForm = document.getElementById("paymentForm");
    payFirstName.value = sessionStorage.getItem("firstNameAttr");
    payLastName.value = sessionStorage.getItem("lastNameAttr");
    payEmail.value = sessionStorage.getItem("emailAttr");
    payPhone.value = sessionStorage.getItem("phoneAttr");
    payStAdd.value = sessionStorage.getItem("addAttr");
    paySub.value = sessionStorage.getItem("suburbAttr");
    payState.value = sessionStorage.getItem("stateAttr").toUpperCase();
    payPost.value = sessionStorage.getItem("postAttr");
    //passing in values in the sessionstorage
    document.getElementById("booking-name").textContent = payFirstName.value + " " + payLastName.value;
    document.getElementById("booking-emailadd").textContent = payEmail.value;
    document.getElementById("booking-phoneno").textContent = payPhone.value;
    document.getElementById("booking-streetadd").textContent = payStAdd.value;
    document.getElementById("booking-suburb").textContent = paySub.value;
    document.getElementById("booking-state").textContent = payState.value;
    document.getElementById("booking-postcode").textContent = payPost.value;
    switch(sessionStorage.getItem("productAttr")){
        case "a":{
            payService.value = "Ticket: Melbourne - Adelaide (via Bendigo and Nhill/Horsham)";
            singlePrice = ticketA;
            break;
        }
        case "b":{
            payService.value = "Ticket: Melbourne - Canberra (via Albury)";
            singlePrice = ticketB;
            break;
        }
        case "c":{
            payService.value = "Ticket: Melbourne - Canberra (via Bairnsdale))";
            singlePrice = ticketC;
            break;
        }
        case "d":{
            payService.value = "Ticket: Mildura - Albury";
            singlePrice = ticketD;
            break;
        }
        case "e":{
            payService.value = "Charter Pickup";
            singlePrice = ticketE;
            break;
        }
        case "f":{
            payService.value = "Accomendation";
            singlePrice = ticketF;
            break;
        }
    }
    payDate.value = sessionStorage.getItem("dateAttr");
    payAmount.value = sessionStorage.getItem("quantityAttr");
    payTotal.value = "$" + aud(singlePrice * sessionStorage.getItem("quantityAttr"));
    document.getElementById("booking-service").textContent = payService.value;
    document.getElementById("booking-date").textContent = payDate.value;
    document.getElementById("booking-quantity").textContent = payAmount.value;
    document.getElementById("booking-total").textContent = payTotal.value;
    cardType.required = "required";
    paymentTimer();
    paymentForm.onsubmit = checkPayment;
    cancelOrder.onclick = deleteAll;
}
//prefill the enquire form using the data stored in session storage
function prefill(){
	if(sessionStorage.firstNameAttr != undefined){
		document.getElementById("givenname").value = sessionStorage.firstNameAttr;
		document.getElementById("familyname").value = sessionStorage.lastNameAttr;
		document.getElementById("emailadd").value = sessionStorage.emailAttr;
		document.getElementById("phoneno").value = sessionStorage.phoneAttr;
		document.getElementById("streetadd").value = sessionStorage.addAttr;
		document.getElementById("suburb").value = sessionStorage.suburbAttr;
		switch (sessionStorage.stateAttr){
			case "vic":
				document.getElementById("state").options[1].selected = true;
				break;
			case "nsw":
				document.getElementById("state").options[2].selected = true;
				break;
			case "qld":
				document.getElementById("state").options[3].selected = true;
				break;
			case "nt":
				document.getElementById("state").options[4].selected = true;
				break;
			case "wa":
				document.getElementById("state").options[5].selected = true;
				break;
			case "sa":
				document.getElementById("state").options[6].selected = true;
				break;
			case "tas":
				document.getElementById("state").options[7].selected = true;
				break;
			case "act":
				document.getElementById("state").options[8].selected = true;
				break;
		}
		document.getElementById("postcode").value = sessionStorage.postAttr;
		switch(sessionStorage.productAttr){
			case "a":
				document.getElementById("service").options[1].selected = true;
				break;
			case "b":
				document.getElementById("service").options[2].selected = true;
				break;
			case "c":
				document.getElementById("service").options[3].selected = true;
				break;
			case "d":
				document.getElementById("service").options[4].selected = true;
				break;
			case "e":
				document.getElementById("service").options[5].selected = true;
				break;
			case "f":
				document.getElementById("service").options[6].selected = true;
				break;
		}
		document.getElementById("traveldate").value = sessionStorage.dateAttr;
		document.getElementById("quantity").value = sessionStorage.quantityAttr;
	}
}
function paymentTimer(){
    var countDownDate = 120000;
    var now = 0;
    var x = setInterval(function() {
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("timer").innerHTML =minutes + "m " + seconds + "s ";
        console.log(distance);
        now += 1000;
        if (distance < 60000){
            document.getElementById("timer").style.color = "red";
        }
        if (distance < 0) {
            deleteAll();
        }
    }, 1000);
}
function init(){
    option = document.getElementById("billing");
    payFirstName = document.getElementById("pay-givenname");
    if(option){
        //check if at the enquire page
        enquire();
    }
    if(payFirstName){
        //check if at payment page.
        payment();
    }
}
window.onload = init;
