const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

let mont_slider = document.getElementById("myRange");
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

const compute_stawi_savings = rate => {
  let stawing_interest_and_charges = "";
};

mont_slider.oninput = function() {
  let month = $("#myRange").val();
  months_text.textContent = month + " months.";
  repayment_period.textContent = month;
};

$(".digits").click(function() {
  let id = this.id;
  let currentInput = document.getElementById("loan_amount");
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

  let amount = parseInt(currentInput.textContent);

  if (amount >= 30000 && amount <= 250000) {
    $("#loan_amount").css("color", "white");
    // computeInterest(principal, period, interest_rate);
    let months = parseInt($("#myRange").val());
    principal_des.innerText = "Principal: KSH " + amount;

    let result = computeInterest(amount, months, 9);
    let fees = result.facility_fee + result.credit_life + result.excise_duty;
    total_fees.innerText = fees;

    interest.innerText = result.interest;

    repayment_amount.innerText = result.principal_and_interest + fees;

    console.table(result);

    let results = {
      result_13: computeInterest(amount, months, 13),
      result_14: computeInterest(amount, months, 14)
    };

    interest_13.innerText = parseFloat(results.result_13.interest).toFixed(2);
    interest_14.innerText = parseFloat(results.result_14.interest).toFixed(2);
    stawi_savings_13.innerText = parseFloat(
      flastLoanCost(amount, 14, months) - result.interest
    ).toFixed(2);
    stawi_savings_14.innerText = parseFloat(
      flastLoanCost(amount, 13, months) - result.interest
    ).toFixed(2);

    console.table(result);

    console.log(flastLoanCost(amount, 13, months));
  } else {
    $("#loan_amount").css("color", "red");
  }
});

const computeInterest = (principal, months, rate) => {
  let interest = principal * (rate / 100) * (months / 12);
  return {
    interest: interest,
    principal_and_interest: parseFloat(interest + principal),
    facility_fee: 0.02 * principal,
    credit_life: 0.007 * principal,
    excise_duty: +(0.1 * (0.02 * 0.007 * principal)).toFixed(2)
  };
};

const flastLoanCost = (principal, rate, months) => {
  return parseFloat((principal *= (rate / 100) * (months / 12)));
};
