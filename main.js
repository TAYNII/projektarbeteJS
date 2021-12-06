
let getData = async (URL) => {
    let response = await fetch(URL);
    let data = await response.json();
    return data;
};

async function renderData() {
    let students = await getData("https://api.mocki.io/v2/01047e91/students");
    let schools = await getData("https://api.mocki.io/v2/01047e91/schools");
    let inputs = document.querySelectorAll("input[name='programme']");

    let tableData = students.map(function (value) {
        return (
            `<tr>
                <td>${value.firstName}</td>
                <td>${value.lastName}</td>
                <td>${value.age}</td>
                <td>${value.hobbies}</td>
                <td>${value.programme}</td>
            </tr>`
        );
    }).join('');
    let tabelBody = document.querySelector("#tableBody");
    tabelBody.innerHTML = tableData;

}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable2");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

    inputs.forEach((input) => {
        if (input.checked) {
            programme = input.value;
        }
    });
    let filteredStudents = students.filter(
        (students) => students.programme === programme);
    filteredStudents.forEach((student) => {
        console.log("student");

    });

}

renderData();