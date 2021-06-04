const fs = require("fs");
const path = require("path");
const parse = require("csv-parse");

const habitablePlanets = [];

//nodejs.org/api/fs.html#fs_fs_createreadstream_path_options

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`There are ${habitablePlanets.length} habitable planets`);
        resolve();
      });
  });
}

/*
const promise = new Promise((resolve, reject) => {
  resolve(42);
});
promise.then((result) => {

});
const result = await promise;
console.log(result);
*/

function getAllPlanets() {
  return habitablePlanets;
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
