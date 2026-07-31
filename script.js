console.log("Hello Zick! The JavaScript file is connected!");

// Wait for the HTML to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Grab the button and the results container from the HTML
  const calculateBtn = document.getElementById("calculate-btn");
  const resultsContainer = document.getElementById("calc-results");

  // Listen for a click on the Calculate button
  calculateBtn.addEventListener("click", () => {
    // 1. Get values from the inputs (and convert them to numbers)
    const length =
      parseFloat(document.getElementById("room-length").value) || 0;
    const width = parseFloat(document.getElementById("room-width").value) || 0;
    const height =
      parseFloat(document.getElementById("room-height").value) || 0;
    const doors = parseInt(document.getElementById("doors").value) || 0;
    const windows = parseInt(document.getElementById("windows").value) || 0;
    const coats = parseInt(document.getElementById("coats").value) || 1;

    // 2. The Math
    // Total wall length (perimeter) * height
    const totalWallLength = length * 2 + width * 2;
    let totalSqFt = totalWallLength * height;

    // Standard deductions (20 sq ft per door, 15 sq ft per window)
    const deductions = doors * 20 + windows * 15;
    let netPaintableArea = totalSqFt - deductions;

    // Ensure we don't calculate negative space if they enter weird numbers
    if (netPaintableArea < 0) {
      netPaintableArea = 0;
    }

    // Calculate gallons (400 sq ft per gallon) and round UP to nearest whole number
    const gallonsNeeded = Math.ceil((netPaintableArea / 400) * coats);

    // 3. Update the HTML text with our calculated numbers
    document.getElementById("total-sqft").textContent = netPaintableArea;
    document.getElementById("total-gallons").textContent = gallonsNeeded;

    // 4. Reveal the results box by changing its CSS classes
    resultsContainer.classList.remove("hidden-results");
    resultsContainer.classList.add("show-results");
  });
});
