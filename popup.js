document.addEventListener("DOMContentLoaded", function () {
  const stockNameElement = document.getElementById("stock-name");
  const noDataElement = document.getElementById("no-data");
  const tableContainer = document.getElementById("table-container");

  // Function to fetch the current stock name from TradingView
  function fetchStockName() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => {
            var headings = document.evaluate(
              "//div[contains(@class, 'js-button-text') and contains(@class, 'text-GwQQdU8S') and contains(@class, 'text-cq__ntSC')]",
              document,
              null,
              XPathResult.ANY_TYPE,
              null
            );
            var thisHeading = headings.iterateNext();

            if (thisHeading) {
              console.log(thisHeading.textContent); // Prints the text content in console
              return thisHeading.textContent;
            }
          },
        },
        (results) => {
          if (results && results[0] && results[0].result) {
            stockNameElement.textContent = results[0].result;
            checkSymbolInJson(results[0].result);
          } else {
            stockNameElement.textContent = "Error fetching stock name";
          }
        }
      );
    });
  }

  // Function to check if the symbol is present in the JSON file
  function checkSymbolInJson(stockName) {
    fetch("symbol_info/seed_shareholding_pattern.json")
      .then((response) => response.json())
      .then((data) => {
        if (data["symbol"].includes(stockName)) {
          loadCsvData(stockName);
        } else {
          noDataElement.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        noDataElement.style.display = "block";
      });
  }

  // Function to run the API with the stock name
  function loadCsvData(filename) {
    fetch(`data/${filename}.csv`)
      .then((response) => response.text())
      .then((csvText) => {
        const rows = csvText.split("\n").map((row) => row.split(","));
        transposeAndCreateTable(rows);
        tableContainer.style.display = "block";
      })
      .catch((error) => {
        console.error("Error:", error);
        tableContainer.style.display = "block";
      });
  }

  function formatDate(dateStr) {
    // Remove the "T" if it's part of the date string (e.g., "20230301T" -> "20230301")
    const cleanDateStr = dateStr.replace("T", "");

    // Parse the string to a Date object (assumes the format is YYYYMMDD)
    const year = cleanDateStr.substring(0, 4);
    const month = cleanDateStr.substring(4, 6);
    const day = cleanDateStr.substring(6, 8);

    // Create a Date object
    const date = new Date(`${year}-${month}-${day}`);

    // Options for formatting the date as "MMM YY" (e.g., "Mar 23")
    const options = { year: "2-digit", month: "short" };

    // Return the formatted date
    return date.toLocaleDateString("en-US", options);
  }

  function transposeAndCreateTable(data) {
    const table = document.createElement("table");
    table.border = "1";

    // Extract dates for column headers
    const dates = data.slice(0, -1).map(row => formatDate(row[0]));

    // Create table header
    const headerRow = document.createElement("tr");
    const emptyHeader = document.createElement("th");
    headerRow.appendChild(emptyHeader); // Empty cell for the top-left corner
    dates.forEach((date) => {
      const header = document.createElement("th");
      header.textContent = date;
      headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    // Define categories
    const categories = ["Promoters", "FIIs", "DIIs", "Government", "Public"];

    // Create table rows for each category
    categories.forEach((category, index) => {
      const row = document.createElement("tr");
      const categoryCell = document.createElement("th");
      categoryCell.textContent = category;
      row.appendChild(categoryCell);

      data.forEach((rowData) => {
        const cell = document.createElement("td");
        cell.textContent = rowData[index + 1]; // +1 to skip the date column
        row.appendChild(cell);
      });

      table.appendChild(row);
    });

    tableContainer.appendChild(table);
  }

  // Fetch the stock name when the popup is opened
  fetchStockName();
});
