// ---------- UNITS ----------
function addUnit(save = true) {
    let div = document.createElement("div");
    div.className = "unit";

    div.innerHTML = `
        <div class="unit-heading">
            <h4>Unit</h4>
            <button type="button" style="background:#d9534f;" onclick="removeUnit(this)">Remove Unit</button>
        </div>
        <div class="unit-info">

           <label>
                Job & Unit #: <input type="text" class="unit-num">
           </label>
            <label>
                Build:
                <select class="build">
                    <option>Ballard</option>
                    <option>DAHU</option>
                </select><br>
            </label>
            <label>
                Test Type:
                <select class="test-type">
                    <option>Bypass</option>
                    <option>Full Water</option>
                </select><br>
            </label>

            <label>
                Start Time: <input type="time" class="start-time">
            </label>
            <label>
                End Time: <input type="time" class="end-time"><br>
            </label>
        </div>
        <div class="points"></div>
        <button type="button" onclick="addPoint(this)">Add point</button>

        <div class="full-water-options" style="display:none; margin-top:5px;">
            Carryover Passed:
            <input type="checkbox" class="carryover">
            Attempt #:
            <input type="number" class="carryover-attempt" value="1" min="1" style="width:60px;">
            <br>
            Unit Dried Out:
            <input type="checkbox" class="dried">
        </div>

        Unit Complete:
        <input type="checkbox" class="completed">

        Conditional Sign Off:
        <input type="checkbox" class="conditional-signoff">
    `;

    div.querySelector(".test-type").addEventListener("change", function () {
        const fw = div.querySelector(".full-water-options");
        fw.style.display = this.value === "Full Water" ? "block" : "none";
    });

    document.getElementById("units").appendChild(div);

    if (save) saveForm();
}

function removeUnit(btn) {
    if (confirm("Delete Unit?")) {
        btn.parentElement.remove();
        saveForm();
    }
}

// ---------- POINTS ----------
function addPoint(btn, save = true) {
    let pointDiv = document.createElement("div");
    pointDiv.className = "point";

    pointDiv.innerHTML = `
        Description: <input type="text" class="point-desc" size="40">

        Category:
        <select class="point-cat">
            <option>E</option>
            <option>PS</option>
            <option>TP</option>
            <option>P</option>
            <option>A</option>
        </select>

        Type:
        <select class="point-type">
            <option>Incorrect Termination</option>
            <option>Incorrect Installation</option>
            <option>Poor Workmanship</option>
            <option>Faulty Component</option>
            <option>Missing Component</option>
            <option>Out of Stock</option>
            <option>Adjustment</option>
        </select>

        Status:
        <select class="fixed">
            <option>Fixed</option>
            <option>Not Fixed</option>
            <option>IWO Requested</option>
        </select>

        <button onclick="removePoint(this)">Remove</button>
    `;

    btn.closest(".unit").querySelector(".points").appendChild(pointDiv);

    if (save) saveForm();
}

function removePoint(btn) {
    btn.parentElement.remove();
    saveForm();
}

// ---------- SAVE ----------
function saveForm() {
    let units = document.querySelectorAll(".unit");
    let data = [];

    units.forEach(unit => {
        let u = {
            unitNum: unit.querySelector(".unit-num").value,
            build: unit.querySelector(".build").value,
            testType: unit.querySelector(".test-type").value,
            start: unit.querySelector(".start-time").value,
            end: unit.querySelector(".end-time").value,
            completed: unit.querySelector(".completed").checked,
            conditionalSignOff: unit.querySelector(".conditional-signoff").checked,
            carryover: unit.querySelector(".carryover").checked,
            dried: unit.querySelector(".dried").checked,
            carryoverAttempt: unit.querySelector(".carryover-attempt").value,
            points: []
        };

        unit.querySelectorAll(".point").forEach(p => {
            u.points.push({
                desc: p.querySelector(".point-desc").value,
                cat: p.querySelector(".point-cat").value,
                type: p.querySelector(".point-type").value,
                fixed: p.querySelector(".fixed").value
            });
        });

        data.push(u);
    });

    localStorage.setItem("eodForm", JSON.stringify(data));
    localStorage.setItem("savedDate", new Date().toDateString());
}

// ---------- LOAD ----------
function loadForm() {
    if (localStorage.getItem("savedDate") !== new Date().toDateString()) {
        localStorage.clear();
        return;
    }

    let data = JSON.parse(localStorage.getItem("eodForm"));
    if (!data) return;

    document.getElementById("units").innerHTML = "";

    data.forEach(u => {
        addUnit(false);
        let unit = document.querySelectorAll(".unit")[document.querySelectorAll(".unit").length - 1];

        unit.querySelector(".unit-num").value = u.unitNum;
        unit.querySelector(".build").value = u.build;
        unit.querySelector(".test-type").value = u.testType;
        unit.querySelector(".start-time").value = u.start;
        unit.querySelector(".end-time").value = u.end;
        unit.querySelector(".completed").checked = u.completed;
        unit.querySelector(".conditional-signoff").checked = u.conditionalSignOff;
        unit.querySelector(".carryover").checked = u.carryover;
        unit.querySelector(".dried").checked = u.dried;
        unit.querySelector(".carryover-attempt").value = u.carryoverAttempt;

        if (u.testType === "Full Water") {
            unit.querySelector(".full-water-options").style.display = "block";
        }

        u.points.forEach(p => {
            addPoint(unit.querySelector("button"), false);
            let point = unit.querySelectorAll(".point")[unit.querySelectorAll(".point").length - 1];

            point.querySelector(".point-desc").value = p.desc;
            point.querySelector(".point-cat").value = p.cat;
            point.querySelector(".point-type").value = p.type;
            point.querySelector(".fixed").value = p.fixed;
        });
    });
}

// ---------- OUTPUT ----------
function generateEOD() {
    let output = "";

    document.querySelectorAll(".unit").forEach(unit => {

        let completed = unit.querySelector(".completed").checked;
        let conditional = unit.querySelector(".conditional-signoff").checked;
        let end = completed ? unit.querySelector(".end-time").value : "WIP";

        output += `<b><u>${unit.querySelector(".unit-num").value} ${unit.querySelector(".build").value} ${unit.querySelector(".test-type").value}</u></b> (${unit.querySelector(".start-time").value} - ${end})<br>`;

        output += "<ul>";

        let points = unit.querySelectorAll(".point");

        if (points.length === 0) {
            output += "<li>No Issues Found</li>";
        } else {
            points.forEach(p => {
                output += `<li>${p.querySelector(".point-desc").value} (${p.querySelector(".point-cat").value}, ${p.querySelector(".point-type").value}) &mdash; ${p.querySelector(".fixed").value}</li>`;
            });
        }

        if (unit.querySelector(".test-type").value === "Full Water") {
            output += `<li>${unit.querySelector(".carryover").checked ? "Carryover Passed" : "Carryover Not Passed"}</li>`;
            output += `<li>${unit.querySelector(".dried").checked ? "Unit Dried Out" : "Unit Not Dried Out"}</li>`;
        }

        if (completed) {
            output += "<li><b>Functionality Completed</b></li>";
            output += `<li><b>${conditional ? "Conditionally Signed Off" : "Unit Signed Off"}</b></li>`;
        } else {
            output += "<li>Handed to Next Shift</li>";
        }

        output += "</ul><hr>";
    });

    document.getElementById("output").innerHTML = output;
}

function copyOutput() {
    navigator.clipboard.writeText(document.getElementById("output").innerText);
}

// ---------- INIT ----------
document.addEventListener("input", saveForm);
document.addEventListener("change", saveForm);
window.addEventListener("DOMContentLoaded", loadForm);
