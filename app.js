const fs = require("fs");
const utils = require("./utils");

const args = process.argv.slice(2);
const testDataFile = args[0] ? args[0] : "testData.txt";
console.log("Using testdata file: " + testDataFile);

const testData = fs.readFileSync(testDataFile, "utf-8");
const commandSet = testData.split(/\r?\n/);

let i = 0;
while (commandSet[i]) {
  //Calcuate allotted water charge
  let [command, apartmentType, waterRatio] = commandSet[i].split(" ");
  let allotedWaterConsumed = 0,
    allotedWaterCharge = 0;
  if (command === "ALLOT_WATER") {
    [allotedWaterConsumed, allotedWaterCharge] = utils.calcuateAllottedCharge(
      apartmentType,
      waterRatio
    );
    i++;
  } else {
    console.log("Invalid command set");
  }

  //Get total guests
  let totalGuests = 0;
  [command, value] = commandSet[i] && commandSet[i].split(" ");
  while (
    command === "ADD_GUESTS" &&
    command !== "BILL" &&
    command !== "INVALID"
  ) {
    totalGuests += parseInt(value);
    i++;
    [command, value] = commandSet[i] ? commandSet[i].split(" ") : ["INVALID"];
  }

  //Calcuate guest usage water charge
  let guestWaterConsumed = 0,
    guestWaterCharge = 0;
  [guestWaterConsumed, guestWaterCharge] =
    utils.calcuateGuestCharge(totalGuests);

  //Total consumed and total charge
  const totalWaterConsumed = allotedWaterConsumed + guestWaterConsumed;
  const totalCharge = Math.round(allotedWaterCharge + guestWaterCharge);

  if (command === "BILL") {
    console.log(totalWaterConsumed + " " + totalCharge);
  } else {
    console.log("Invalid command set");
  }
  
  //move to next command
  i++;
}
