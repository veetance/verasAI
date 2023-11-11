  ///////////// grab Data ////////////////

   // ofline overide for testing
    
    // setTimeout(() => {
    //     // hide display splash 
    //     document.querySelectorAll(".v-back").forEach((vBack) => {
    //       vBack.addEventListener("click", function () {
    //         const clickedRow = vBack.closest("tr");
  
    //         if (
    //           clickedRow &&
    //           clickedRow.classList.contains("expanded-row")
    //         ) {
    //           const textArea = clickedRow.querySelector("textarea");
    //           const closeButton =
    //             clickedRow.querySelector(".close-discrip");
  
    //           if (textArea && closeButton) {
    //             const alertElement = document.querySelector(".alert");
    //             if (alertElement) {
    //               alertElement.style.top = "50%"; // Adjust the position
    //               alertElement.style.backgroundColor = "#288369"; // Change the background color
    //             }
  
    //             alertFade("Your reply is now a draft")
    //               .then(() => {
    //                 // Assuming closeTextArea is a method to close or clear the textarea
    //                 textArea.closeTextArea();
    //                 handleRowClick(clickedRow);
    //                 if (clickedRow.rsetAugmt) {
    //                   clickedRow.rsetAugmt();
    //                 }
    //               })
    //               .catch(() => {
    //                 // If the user decides not to abort the reply, handle it here. (Maybe do nothing?)
    //               });
    //           } else {
    //             handleRowClick(clickedRow);
    //             if (clickedRow.rsetAugmt) {
    //               clickedRow.rsetAugmt();
    //             }
    //           }
    //         }
    //       });
    //     });
  
    //     document
    //       .querySelector("#data-surface table tbody")
    //       .addEventListener("click", function (event) {
    //         let clickedRow = event.target.closest("tr");
  
    //         if (
    //           clickedRow &&
    //           !clickedRow.classList.contains("expanded-row")
    //         ) {
    //           // Assume 'handleRowClick' is a function you've defined elsewhere to handle the row click.
    //           handleRowClick(clickedRow);
  
    //           const rowData = accessData(clickedRow);
  
    //           setTimeout(() => {
    //             console.log("Data-Post:", tableData); // Debugging line
    //             appendOptionData(clickedRow, rowData);
    //           }, 550);
  
  
    //         }
    //       });
  
    //     resolve(); // Resolve the promise when done
    //   }, 0);