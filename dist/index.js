document.addEventListener("DOMContentLoaded", function () {
  backThisProjectBtn = document.querySelector(".backBtn");
  bkmark = document.querySelector(".bookmark");
  menuBtn = document.querySelector(".menu-btn");
  nav = document.querySelector("nav");
  selectRewardBtns = document.querySelectorAll(".select-button");
  radioBtns = document.querySelectorAll("input[type=radio]");
  continueBtns = document.querySelectorAll(".continue");
  modalSection = document.querySelector("#modal-section");
  modalSuccess = document.querySelector("#modal-success");
  totalBackers = document.querySelector("#total-backers");
  backedAmount = document.querySelector("#backed-amount");
  progressBar = document.querySelector("#progress-bar");
  successBtn = document.querySelector("#success-btn");
  modalClose = document.querySelector("#modal-close");

  closeIcon = "images/icon-close-menu.svg";
  menuIcon = "images/icon-hamburger.svg";


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

  const updateProgress = (newTotal) =>{
    target = Number(progressBar.dataset.target)
    percentage = newTotal / target
    console.log(newTotal, target, percentage)
    if (percentage > 0.99) {
      progressBar.classList.add('w-[100%]')
    } else{
      formattedPercentage = Math.round((percentage*100))
      progressBar.style.width = `${formattedPercentage}%`;
    }
  }


  const updateFigures = (amountPledged) => {
    //number of backers
    cleanNumBackers = formatNumbers(totalBackers);
    cleanNumBackers++;
    totalBackers.textContent = displayNumber(cleanNumBackers);

    // amount pledged
    cleanAmount = formatNumbers(backedAmount);
    cleanAmount = cleanAmount + Number(amountPledged);
    updateProgress(Number(cleanAmount))
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

  modalSuccess.close();
  // continue buttons

  continueBtns.forEach((element) => {
    element.addEventListener("click", function () {
      let nearestInput = this.closest("div").querySelector("input");
      if (nearestInput) {
        // add validation in next version
        updateFigures(nearestInput.value);
        hide(modalSection);
        show(modalSuccess);
      } else {
        updateFigures("0");
        hide(modalSection);
        show(modalSuccess);
      }
    });
  });

  //bookmark btn
  bkmark.addEventListener("click", () => {
    if (bkmark.classList.contains("not-bookmarked")) {
      bkmark.querySelector("circle").style.fill = "#0f766e";
      bkmark.querySelector("path").style.fill = "white";
      bkmark.closest("div").querySelector("p").innerHTML = "Bookmarked";
      bkmark.classList.remove("not-bookmarked");
    } else {
      bkmark.querySelector("circle").style.fill = "#2F2F2F";
      bkmark.querySelector("path").style.fill = "#B1B1B1";
      bkmark.closest("div").querySelector("p").innerHTML = "Bookmark";
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
