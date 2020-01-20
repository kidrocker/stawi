const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

let months_slider = document.getElementById("myRange");
let months_text = document.getElementById("months");

let principal_des = document.getElementById("principal-des");
let repayment_period = document.getElementById("repayment-period");
let total_fees = document.getElementById("total-fees");
let interest = document.getElementById("interest");
let repayment_amount = document.getElementById("repayment-amount");

let interest_13 = document.getElementById("interest_13");
let interest_14 = document.getElementById("interest_14");

let stawi_savings_13 = document.getElementById("stawi_savings_13");
let stawi_savings_14 = document.getElementById("stawi_savings_14");
let currentInput = document.getElementById("loan_amount");
let months = parseInt($("#myRange").val());

months_slider.oninput = function() {
    months = $("#myRange").val();
};

$(".digits").click(function() {
  let id = this.id;
  if (currentInput.textContent === "0") {
    currentInput.textContent = "";
  }

  switch (id) {
    case "1":
      currentInput.textContent += id;
      break;
    case "2":
      currentInput.textContent += id;
      break;
    case "3":
      currentInput.textContent += id;
      break;
    case "4":
      currentInput.textContent += id;
      break;
    case "5":
      currentInput.textContent += id;
      break;
    case "6":
      currentInput.textContent += id;
      break;
    case "7":
      currentInput.textContent += id;
      break;
    case "8":
      currentInput.textContent += id;
      break;
    case "9":
      currentInput.textContent += id;
      break;
    case "0":
      if (currentInput.textContent !== "0") {
        currentInput.textContent += id;
        break;
      }
    case "Delete":
      if (currentInput.textContent == "0") {
        break;
      } else {
        currentInput.textContent = currentInput.textContent.slice(0, -1);
        break;
      }
    case "Clear":
      currentInput.textContent = "0";
      break;
  }

  amount = parseFloat(currentInput.textContent).toFixed(2);
});

const data = (amount, months) => {

  if (amount >= 30000 && amount <= 250000) {
    $("#loan_amount").css("color", "white");
    // computeInterest(principal, period, rate=9);

    principal_des.innerText = "KSH " + numberWithCommas(amount);

    // results object, default rate is 9%
    let result = computeInterest(amount, months);
    total_fees.innerText = numberWithCommas(result.total_fees);
    interest.innerText = numberWithCommas(
      parseFloat(result.interest).toFixed(2)
    );
    repayment_amount.innerText = numberWithCommas(
      parseFloat(result.principal_and_interest).toFixed(2)
    );

    let results = {
      result_13: computeInterest(amount, months, (rate = 13)),
      result_14: computeInterest(amount, months, (rate = 14))
    };

    interest_13.innerText = results.result_13.interest.toFixed(2);
    interest_14.innerText = results.result_14.interest.toFixed(2);

    stawi_savings_13.innerText = (
      results.result_13.total_fees - result.total_fees
    ).toFixed(2);
    stawi_savings_14.innerText = (
      results.result_14.total_fees - result.total_fees
    ).toFixed(2);
  } else {
    $("#loan_amount").css("color", "red");
  }
};

const computeInterest = () => {
    if (amount >= 30000 && amount <= 250000) {
        $("#loan_amount").css("color", "white");

  let loan_value = $("loan_value").textContent;
  let period = $("#myRange").val();

  let interest = Number(loan_value * (rate / 100) * (period / 12));
  let result = {
    interest,
    principal_and_interest: interest + Number(loan_value),
    facility_fee: facility_fee_rate * Number(loan_value),
    credit_life: credit_life_rate * Number(loan_value)
  };
  result.total_fees = Number(
    result.credit_life + result.facility_fee + result.interest
  );
  console.log("result object table");
  console.table(result);
  return result;
};

data();
