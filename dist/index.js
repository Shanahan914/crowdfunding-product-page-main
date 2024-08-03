document.addEventListener("DOMContentLoaded", function () {
  //dom queries
  const backThisProjectBtn = document.querySelector(".backBtn");
  const bkmark = document.querySelector(".bookmark");
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav");
  const selectRewardBtns = document.querySelectorAll(".select-button");
  const radioBtns = document.querySelectorAll("input[type=radio]");
  const continueBtns = document.querySelectorAll(".continue");
  const modalSection = document.querySelector("#modal-section");
  const modalSuccess = document.querySelector("#modal-success");
  const totalBackers = document.querySelector("#total-backers");
  const backedAmount = document.querySelector("#backed-amount");
  const progressBar = document.querySelector("#progress-bar");
  const successBtn = document.querySelector("#success-btn");
  const modalClose = document.querySelector("#modal-close");

  // variables
  const closeIcon = "images/icon-close-menu.svg";
  const menuIcon = "images/icon-hamburger.svg";

  // utility functions

  const show = (element) => {
    element.showModal();
  };

  const hide = (element) => {
    element.close();
  };

  const formatNumbers = (element) => {
    content = element.textContent;
    newContent = content.replace(/[\$,]/g, "");
    return Number(newContent);
  };

  const displayNumber = (num) => {
    return num.toLocaleString();
  };

  const updateProgress = (newTotal) => {
    target = Number(progressBar.dataset.target);
    percentage = newTotal / target;
    console.log(newTotal, target, percentage);
    if (percentage > 0.99) {
      progressBar.classList.add("w-[100%]");
    } else {
      formattedPercentage = Math.round(percentage * 100);
      progressBar.style.width = `${formattedPercentage}%`;
    }
  };

  const updateFigures = (amountPledged) => {
    //number of backers
    let cleanNumBackers = formatNumbers(totalBackers);
    cleanNumBackers++;
    totalBackers.textContent = displayNumber(cleanNumBackers);

    // amount pledged
    let cleanAmount = formatNumbers(backedAmount);
    cleanAmount = cleanAmount + Number(amountPledged);
    updateProgress(Number(cleanAmount));
    backedAmount.textContent = "$" + displayNumber(cleanAmount);
  };

  // event listeners

  backThisProjectBtn.addEventListener("click", () => {
    show(modalSection);
  });

  selectRewardBtns.forEach((element) => {
    element.addEventListener("click", () => {
      show(modalSection);
    });
  });

  //js for selection modal

  radioBtns.forEach((element) => {
    element.addEventListener("change", function () {
      radioBtns.forEach((element) => {
        element.closest("section").classList.remove("border-teal-700");
        element
          .closest("section")
          .querySelector(".pledge")
          .classList.add("hidden");
      });
      if (this.checked) {
        this.closest("section").classList.add("border-teal-700");
        this.closest("section")
          .querySelector(".pledge")
          .classList.remove("hidden");
      }
    });
  });

  // continue buttons

  continueBtns.forEach((element) => {
    element.addEventListener("click", function () {
      const nearestInput = this.closest("div").querySelector("input");
      const amount = nearestInput ? nearestInput.value : "0";
      // add validation in next version
      updateFigures(amount);
      hide(modalSection);
      show(modalSuccess);
    });
  });

  //bookmark btn
  bkmark.addEventListener("click", () => {
    const circle = bkmark.querySelector("circle");
    const path = bkmark.querySelector("path");
    const closestP = bkmark.closest("div").querySelector("p");

    if (bkmark.classList.contains("not-bookmarked")) {
      circle.style.fill = "#0f766e";
      path.style.fill = "white";
      closestP.innerHTML = "Bookmarked";
      bkmark.classList.remove("not-bookmarked");
    } else {
      circle.style.fill = "#2F2F2F";
      path.style.fill = "#B1B1B1";
      closestP.innerHTML = "Bookmark";
      bkmark.classList.add("not-bookmarked");
    }
  });

  //menu btn
  menuBtn.addEventListener("click", () => {
    if (nav.classList.contains("hidden")) {
      show(nav);
      menuBtn.querySelector("img").src = closeIcon;
    } else {
      hide(nav);
      menuBtn.querySelector("img").src = menuIcon;
    }
  });

  //succes btn
  successBtn.addEventListener("click", () => {
    modalSuccess.close();
  });

  //modal close btn
  modalClose.addEventListener("click", () => {
    hide(modalSection);
  });
});
